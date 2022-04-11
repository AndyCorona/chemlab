package com.andy.server.controller;


import com.andy.server.pojo.*;
import com.andy.server.service.*;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author andy
 * @since 2022-03-19
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;
    @Autowired
    private ILogoService logoService;
    @Autowired
    private ISchemeService schemeService;
    @Autowired
    private IProjectCoverService projectCoverService;
    @Autowired
    private IProjectService projectService;


    @ApiOperation("返回用户主页")
    @GetMapping("/")
    public String getUserPage() {
        return "user";
    }


    @ApiOperation("获取项目页面")
    @GetMapping("/project")
    public String getProjectPage() {
        return "project";
    }

    @ApiOperation("获取反应页面")
    @GetMapping("/project/reaction")
    public String getReactionPage() {
        return "reaction";
    }


    @ApiOperation("修改用户头像 logo")
    @ResponseBody
    @PostMapping("/logo/{logoId}")
    public RespBean updateLogo(@PathVariable Integer logoId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userService.update(new UpdateWrapper<User>().eq("id", userId).set("logo", logoId))) {
            Logo logo = logoService.getById(logoId);
            user.setLogo(logoId);
            user.setLogoUrl(logo.getUrl());
            session.setAttribute("user", user);
            return RespBean.success("成功");
        }
        return RespBean.error("失败");
    }

    @ApiOperation("修改用户背景")
    @ResponseBody
    @PostMapping("/scheme/{schemeId}")
    public RespBean updateScheme(@PathVariable Integer schemeId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userService.update(new UpdateWrapper<User>().eq("id", userId).set("scheme", schemeId))) {
            Scheme scheme = schemeService.getById(schemeId);
            user.setScheme(schemeId);
            user.setSchemeUrl(scheme.getUrl());
            session.setAttribute("user", user);
            return RespBean.success("成功");
        }
        return RespBean.error("失败");
    }


    @ApiOperation("修改用户指定项目的图片")
    @ResponseBody
    @PostMapping("/project-cover/{projectId}/{coverId}")
    public RespBean updateCover(@PathVariable Integer projectId, @PathVariable Integer coverId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        //根据 用户id 和项目 id 更新对应封面
        if (projectService.update(new UpdateWrapper<Project>().eq("userId", userId).eq("id", projectId).set("coverId", coverId))) {
            ProjectCover projectCover = projectCoverService.getById(coverId);
            for (Project project : user.getProjects()) {
                if (project.getId().equals(projectId)) {
                    project.setCoverId(projectCover.getId());
                    project.setProjectCoverUrl(projectCover.getUrl());
                }
            }
            session.setAttribute("user", user);
            return RespBean.success("成功");
        }
        return RespBean.error("失败");
    }

    @ApiOperation("修改指定项目名称")
    @ResponseBody
    @PostMapping("/project-name/{projectName}")
    public RespBean updateProjectName(@PathVariable String projectName, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Project viewProject = ((Project) session.getAttribute("project"));
        Integer projectId = viewProject.getId();
        Integer userId = user.getId();
        //根据 用户id 和项目 id 更新名字
        if (projectService.update(new UpdateWrapper<Project>().eq("userId", userId).eq("id", projectId).set("projectName", projectName))) {
            //如果更改 session 项目名称， session 也要更新
            for (Project sessionProject : user.getProjects()) {
                if (sessionProject.getId().equals(projectId)) {
                    sessionProject.setProjectName(projectName);
                }
            }
            viewProject.setProjectName(projectName);
            session.setAttribute("project", viewProject);
            session.setAttribute("user", user);
            return RespBean.success("成功");
        }
        return RespBean.error("失败");
    }

    @ApiOperation("修改用户描述")
    @ResponseBody
    @PostMapping("/desc/{desc}")
    public RespBean updateDesc(@PathVariable String desc, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer userId = user.getId();
        if (userService.update(new UpdateWrapper<User>().eq("id", userId).set("userDesc", desc))) {
            user.setUserDesc(desc);
            session.setAttribute("user", user);
            return RespBean.success("成功");
        }
        return RespBean.error("失败");
    }

    @ApiOperation("退出登录")
    @PostMapping("/logout")
    @ResponseBody
    public RespBean logout(HttpSession session) {
        //清空所有 session
        if (session.getAttribute("user") != null) {
            session.removeAttribute("user");
        }
        if (session.getAttribute("project") != null) {
            session.removeAttribute("project");
        }
        if (session.getAttribute("reaction") != null) {
            session.removeAttribute("reaction");
        }
        return RespBean.success("成功");
    }

    @ApiOperation("注销账号")
    @DeleteMapping("/cancel")
    @ResponseBody
    public RespBean cancel(HttpSession session) {
        User user = ((User) session.getAttribute("user"));
        if (userService.removeById(user.getId())) {
            return RespBean.success("成功");
        } else {
            return RespBean.error("失败");
        }
    }
}
