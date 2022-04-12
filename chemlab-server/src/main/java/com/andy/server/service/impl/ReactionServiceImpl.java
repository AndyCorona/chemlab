package com.andy.server.service.impl;

import com.andy.server.mapper.ReactionMapper;
import com.andy.server.pojo.*;
import com.andy.server.service.IReactionService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.CollectionOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
@Service
public class ReactionServiceImpl extends ServiceImpl<ReactionMapper, Reaction> implements IReactionService {

    @Autowired
    private ReactionMapper reactionMapper;
    @Autowired
    private MongoTemplate mongoTemplate;

    private static final Logger logger = LoggerFactory.getLogger(ReactionServiceImpl.class);

    /**
     * 分页获取 reaction
     *
     * @param currentPage
     * @param size
     * @param projectId
     * @param userId
     * @return
     */
    @Override
    public RespPageBean getReactionByPage(Integer currentPage, Integer size, Integer projectId, Integer userId) {
        //开启分页
        Page<Reaction> page = new Page<>(currentPage, size);
        IPage<Reaction> reactionByPage = reactionMapper.getReactionByPage(page, projectId, userId);
        return new RespPageBean(reactionByPage.getTotal(), reactionByPage.getRecords());
    }


    /**
     * 查询反应信息
     */
    @Override
    public RespBean getReactionForm(HttpSession session) {
        Project sessionProject = ((Project) session.getAttribute("project"));
        Reaction sessionReaction = ((Reaction) session.getAttribute("reaction"));
        if (sessionProject == null || sessionReaction == null) {
            return RespBean.error("失败");
        }
        //新建反应
        if (sessionReaction.getId() == null) {
            return RespBean.success("成功");
        }
        Reaction reaction = reactionMapper.selectOne(new QueryWrapper<Reaction>().eq("projectId", sessionProject.getId()).eq("id", sessionReaction.getId()));
        if (reaction != null) {
            //从 capped 集合中获取最新的一个数据
            ReactionForm reactionForm = mongoTemplate.findOne(new Query(Criteria.where("reactionId").is(sessionReaction.getId())).with(Sort.by("createDateTime").descending()), ReactionForm.class, reaction.getReactionUrl());
            if (reactionForm != null) {
                logger.info("用户正在查看反应：" + reaction);
                setNull(reactionForm);
                return RespBean.success("成功", reactionForm);
            }
        }
        return RespBean.error("失败");
    }

    /**
     * 保存反应信息
     *
     * @param session
     * @param reactionForm
     * @return
     */
    @Override
    @Transactional(rollbackFor = IllegalArgumentException.class)
    public RespBean save(HttpSession session, ReactionForm reactionForm) {
        //校验标题和日期
        if (reactionForm.getTitle() == null || !reactionForm.getTitle().matches("^.{1,40}$") || reactionForm.getDate() == null || !reactionForm.getDate().toString().matches("^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$")) {
            return RespBean.error("保存失败");
        }
        Project project = ((Project) session.getAttribute("project"));
        Reaction sessionReaction = ((Reaction) session.getAttribute("reaction"));
        if (project == null || sessionReaction == null) {
            return RespBean.error("保存失败");
        }
        //保存新建的反应
        if (sessionReaction.getId() == null) {
            //创建 UUID 作为 capped collection 的集合名
            String collectionKey = UUID.randomUUID().toString();
            //获取保存到 mysql 中的 reaction 对象
            Reaction reactionOnSql = createReactionOnSql(reactionForm, project.getId(), collectionKey);
            //插入到 mysql 数据库
            if (reactionMapper.insert(reactionOnSql) == 1) {
                //创建容量为 10个文档，总大小为 1024*1024*10 B 的 capped 集合
                mongoTemplate.createCollection(collectionKey, CollectionOptions.empty().capped().size(10485760).maxDocuments(10));
                reactionForm.setProjectId(project.getId());
                reactionForm.setCreateDateTime(LocalDateTime.now());
                reactionForm.setReactionId(reactionOnSql.getId());
                reactionForm.setCollectionKey(collectionKey);
                ReactionForm save = mongoTemplate.save(reactionForm, collectionKey);
                setNull(save);
                //保存一份到 session 中的 reactionForm 中
                session.setAttribute("reaction", reactionOnSql);
                //如果 session 中 project 中保存的 reaction 小于 6
                if (project.getReactions().size() < 6) {
                    LinkedList<Reaction> list = new LinkedList<>(project.getReactions());
                    list.add(reactionOnSql);
                    project.setReactions(list);
                    session.setAttribute("project", project);
                }
                return RespBean.success("保存成功", save);
            }
        }//保存已有的反应
        else {
            //从session 中获取 capped 集合名
            String collectionKey = sessionReaction.getReactionUrl();
            //获取更新到 mysql 中的 reaction 对象
            Reaction reactionOnSql = createReactionOnSql(reactionForm, project.getId(), collectionKey);
            reactionOnSql.setId(sessionReaction.getId());
            //更新数据库中的数据
            if (reactionMapper.update(reactionOnSql, new UpdateWrapper<Reaction>().eq("projectId", project.getId()).eq("id", sessionReaction.getId()).eq("reactionUrl", collectionKey)) == 1) {
                reactionForm.setCollectionKey(collectionKey);
                reactionForm.setProjectId(project.getId());
                reactionForm.setCreateDateTime(LocalDateTime.now());
                reactionForm.setReactionId(sessionReaction.getId());
                ReactionForm save = mongoTemplate.save(reactionForm, collectionKey);
                setNull(save);
                //更新 session 中的 reactionForm
                session.setAttribute("reaction", reactionOnSql);
                List<Reaction> sessionReactions = project.getReactions();
                for (int i = 0; i < sessionReactions.size(); i++) {
                    if ((sessionReactions.get(i)).getId().equals(reactionOnSql.getId())) {
                        sessionReactions.set(i, reactionOnSql);
                    }
                    project.setReactions(sessionReactions);
                    session.setAttribute("project", project);
                }
                return RespBean.success("保存成功", save);
            }
        }
        return RespBean.success("保存失败");
    }

    /**
     * 获取一个反应的所有版本
     *
     * @return
     */
    @Override
    public RespBean getAllDocuments(HttpSession session) {
        Reaction reaction = (Reaction) session.getAttribute("reaction");
        if (reaction == null) {
            return RespBean.success("失败");
        }
        if (reaction.getId() == null) {
            return RespBean.success("成功", new List[0]);
        } else {
            List<ReactionForm> all = mongoTemplate.findAll(ReactionForm.class, reaction.getReactionUrl());
            List<Map<String, String>> list = new ArrayList<>(10);
            for (ReactionForm reactionForm : all) {
                Map<String, String> map = new HashMap<>();
                map.put("id", reactionForm.getId());
                map.put("dateTime", reactionForm.getCreateDateTime().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")));
                list.add(map);
            }
            return RespBean.success("成功", list);
        }
    }

    /**
     * 获取指定版本的反应
     *
     * @param id
     * @param session
     * @return
     */
    @Override
    public RespBean getVersionDocument(String id, HttpSession session) {
        Project sessionProject = (Project) session.getAttribute("project");
        Reaction sessionReaction = (Reaction) session.getAttribute("reaction");
        if (sessionReaction == null || sessionProject == null || id == null) {
            return RespBean.error("失败");
        }
        ReactionForm reactionForm = mongoTemplate.findOne(new Query(Criteria.where("_id").is(id)), ReactionForm.class, sessionReaction.getReactionUrl());
        if (reactionForm == null) {
            return RespBean.error("失败");
        }
        sessionReaction.setReactionName(reactionForm.getTitle());
        session.setAttribute("reaction", sessionReaction);
        setNull(reactionForm);
        return RespBean.success("成功", reactionForm);
    }

    /**
     * 批量删除反应
     *
     * @param list
     * @param session
     * @return
     */
    @Override
    public RespBean deleteReactions(List<Integer> list, HttpSession session) {
        Project sessionProject = (Project) session.getAttribute("project");
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser != null && sessionProject != null && list.size() > 0) {
            //用传入的 id 数组，去数据库查询对应的 collection 集合
            List<Reaction> deleteReactions = reactionMapper.selectList(new QueryWrapper<Reaction>().in("id", list).eq("projectId", sessionProject.getId()));
            for (Reaction deleteReaction : deleteReactions) {
                //删除 mongodb 中对应的集合
                mongoTemplate.dropCollection(deleteReaction.getReactionUrl());
            }
            //删除数据库里的数据
            reactionMapper.delete(new UpdateWrapper<Reaction>().in("id", list).eq("projectId", sessionProject.getId()));
            //重新查询前 6 个 reaction 放在 session 中
            RespPageBean reactionByPage = getReactionByPage(1, 6, sessionProject.getId(), sessionUser.getId());
            sessionProject.setReactions(((List<Reaction>) reactionByPage.getData()));
            session.setAttribute("reaction", null);
            return RespBean.success("成功", deleteReactions);
        }
        return RespBean.error("失败");
    }

    /**
     * 根据用户传入的 reactionForm，创建 reaction
     *
     * @param reactionForm
     * @param projectId
     * @param collectionKey
     * @return
     */
    private Reaction createReactionOnSql(ReactionForm reactionForm, Integer projectId, String collectionKey) {
        //保存到 mysql 数据库
        Reaction reactionOnSql = new Reaction(null, reactionForm.getTitle(), reactionForm.getDate(), null, null, null, projectId, collectionKey);
        switch (reactionForm.getTags().length) {
            case 1:
                reactionOnSql.setTag1(reactionForm.getTags()[0]);
                break;
            case 2:
                reactionOnSql.setTag1(reactionForm.getTags()[0]);
                reactionOnSql.setTag2(reactionForm.getTags()[1]);
                break;
            case 3:
                reactionOnSql.setTag1(reactionForm.getTags()[0]);
                reactionOnSql.setTag2(reactionForm.getTags()[1]);
                reactionOnSql.setTag3(reactionForm.getTags()[2]);
                break;
        }
        return reactionOnSql;
    }

    /**
     * 返回文档对象时，敏感信息置空
     */
    private void setNull(ReactionForm reactionForm) {
        reactionForm.setReactionId(null);
        reactionForm.setCollectionKey(null);
        reactionForm.setProjectId(null);
    }
}
