package com.andy.server.service;

import com.andy.server.pojo.Project;
import com.andy.server.pojo.RespBean;
import com.andy.server.pojo.RespPageBean;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
public interface IProjectService extends IService<Project> {

    /**
     * 获取所有项目（分页）
     *
     * @param currentPage
     * @param size
     * @param userId
     * @return
     */
    RespPageBean getProjectByPage(Integer currentPage, Integer size, Integer userId);

    /**
     * 根据项目 id 和用户 id 获取一个项目的西信息
     * @param projectId
     * @param userId
     * @return
     */
    Project getProjectAndReaction(Integer projectId, Integer userId);

    /**
     * 根据项目 id 和反应 id 查询一个反应
     * @param reactionId
     * @param session
     * @return
     */
    RespBean getReaction(Integer reactionId, HttpSession session);
}
