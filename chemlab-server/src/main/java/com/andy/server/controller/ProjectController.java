package com.andy.server.controller;

import com.andy.server.pojo.*;
import com.andy.server.service.IProjectCoverService;
import com.andy.server.service.IProjectService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.LinkedList;
import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
@Controller
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private IProjectService projectService;
    @Autowired
    private IProjectCoverService projectCoverService;

    @Autowired
    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @ApiOperation("分页获取项目")
    @GetMapping("/")
    @ResponseBody
    public RespPageBean getProjectByPage(@RequestParam(defaultValue = "2") Integer currentPage,
                                         @RequestParam(defaultValue = "6") Integer size, HttpSession session) {
        User user = (User) session.getAttribute("user");
        return projectService.getProjectByPage(currentPage, size, user.getId());
    }

    @ApiOperation("查看某一个项目")
    @ResponseBody
    @PostMapping("/{projectId}")
    public RespBean selectOneProject(@PathVariable Integer projectId, HttpSession session) {
        //从会话域获取用户 id
        User user = (User) session.getAttribute("user");
        //去数据库根据用户 id 和项目 id 找到指定项目信息
        Project project = projectService.getProjectAndReaction(projectId, user.getId());
        if (project != null) {
            session.setAttribute("project", project);
            logger.info("用户正在查看项目：" + session.getAttribute("project"));
            return RespBean.success("成功");
        }
        return RespBean.error("失败");
    }

    @ApiOperation("创建一个新项目")
    @ResponseBody
    @PutMapping("/")
    public RespBean createProject(HttpSession session) {
        Project project = new Project();
        User user = (User) session.getAttribute("user");
        project.setUserId(user.getId());
        if (projectService.save(project)) {
            //刚创建的项目默认名字
            project.setProjectName("Untitled");
            //刚创建的项目的默认图片
            project.setCoverId(1);
            //获取项目默认的图片
            project.setProjectCoverUrl(projectCoverService.getById(1).getUrl());
            project.setReactions(new LinkedList<Reaction>());
            session.setAttribute("project", project);
            //如果 user 中缓存的 projects 个数小于 6
            if (user.getProjects().toArray().length < 6) {
                user.getProjects().add(project);

            }
            return RespBean.success("成功");
        }
        return RespBean.error("失败");
    }

    @ApiOperation("删除指定项目")
    @ResponseBody
    @DeleteMapping("/{projectId}")
    public RespBean deleteProject(@PathVariable Integer projectId, HttpSession session) {

        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();

        if (projectService.remove(new QueryWrapper<Project>().eq("userId", userId).eq("id", projectId))) {
            user.setProjects(null);
            //重新查询前6 个项目，放到 session 中
            List<Project> data = (List<Project>) projectService.getProjectByPage(1, 6, userId).getData();
            user.setProjects(data);
            session.setAttribute("user", user);
            return RespBean.success("成功");
        }
        return RespBean.error("失败");
    }

    @ApiOperation("查询指定反应")
    @ResponseBody
    @PostMapping("/reaction/{reactionId}")
    public RespBean getReaction(@PathVariable Integer reactionId, HttpSession session) {
        return projectService.getReaction(reactionId, session);
    }
}
