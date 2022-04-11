package com.andy.server.service.impl;

import com.andy.server.mapper.ProjectMapper;
import com.andy.server.mapper.ReactionMapper;
import com.andy.server.pojo.Project;
import com.andy.server.pojo.Reaction;
import com.andy.server.pojo.RespBean;
import com.andy.server.pojo.RespPageBean;
import com.andy.server.service.IProjectService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
@Service
public class ProjectServiceImpl extends ServiceImpl<ProjectMapper, Project> implements IProjectService {

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private ReactionMapper reactionMapper;

    private static final Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);

    /**
     * 获取所有项目（分页）
     *
     * @param currentPage
     * @param size
     * @param userId
     * @return
     */
    @Override
    public RespPageBean getProjectByPage(Integer currentPage, Integer size, Integer userId) {
        //开启分页
        Page<Project> page = new Page<>(currentPage, size);
        IPage<Project> projectByPage = projectMapper.getProjectByPage(page, userId);
        return new RespPageBean(projectByPage.getTotal(), projectByPage.getRecords());
    }

    /**
     * 通过项目 id 和用户 id 获取项目信息
     *
     * @param projectId
     * @param userId
     * @return
     */
    @Override
    public Project getProjectAndReaction(Integer projectId, Integer userId) {
        return projectMapper.getProjectAndReaction(projectId, userId);
    }

    /**
     * 根据项目 id 和反应 id 查询一个反应
     *
     * @param reactionId
     * @param session
     * @return
     */
    @Override
    public RespBean getReaction(Integer reactionId, HttpSession session) {
        Project sessionProject = ((Project) session.getAttribute("project"));
        if (sessionProject != null) {
            //用户新建反应
            if (reactionId == -1) {
                session.setAttribute("reaction", new Reaction());
                logger.info("用户正在新建反应：");
                return RespBean.success("成功");
            }
            //用户查看反应
            Reaction reaction = reactionMapper.selectOne(new QueryWrapper<Reaction>().eq("projectId", sessionProject.getId()).eq("id", reactionId));
            if (reaction != null) {
                session.setAttribute("reaction", reaction);
                logger.info("用户正在查看反应：" + reaction);
                return RespBean.success("成功");
            }
        }
        return RespBean.error("失败");
    }
}
