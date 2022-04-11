package com.andy.server.service;

import com.andy.server.pojo.Reaction;
import com.andy.server.pojo.ReactionForm;
import com.andy.server.pojo.RespBean;
import com.andy.server.pojo.RespPageBean;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
public interface IReactionService extends IService<Reaction> {

    /**
     * 分页获取 reaction
     *
     * @param currentPage
     * @param size
     * @param projectId
     * @return
     */
    RespPageBean getReactionByPage(Integer currentPage, Integer size, Integer projectId, Integer userId);

    /**
     * 查询反应信息
     */
    RespBean getReactionForm(HttpSession session);

    RespBean save(HttpSession session, ReactionForm reactionForm);

    /**
     * 获取一个反应的所有版本
     *
     * @return
     */
    RespBean getAllDocuments(HttpSession session);

    /**
     * 获取指定版本的反应
     *
     * @param id
     * @param session
     * @return
     */
    RespBean getVersionDocument(String id, HttpSession session);

    /**
     * 批量删除反应
     *
     * @param list
     * @param session
     * @return
     */
    RespBean deleteReactions(List<Integer> list, HttpSession session);
}
