package com.andy.server.controller;

import com.andy.server.pojo.ReactionForm;
import com.andy.server.pojo.RespBean;
import com.andy.server.pojo.User;
import com.andy.server.service.IUserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
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
@RestController
@RequestMapping("/template")
public class TemplateController {
    @Autowired
    private IUserService userService;


    @ApiOperation("获取用户的所有模板")
    @ResponseBody
    @GetMapping("/list")
    public RespBean getAllTemplates(HttpSession session) {
        User user = ((User) session.getAttribute("user"));
        return userService.getAllTemplates(user.getTemplateUrl());
    }

    @ApiOperation("保存模板")
    @ResponseBody
    @PutMapping("/")
    public RespBean saveTemplate(@RequestBody ReactionForm templates, HttpSession session) {
        System.out.println(templates);
        return userService.saveTemplate(templates, session);
    }

    @ApiOperation("更新模板")
    @ResponseBody
    @PostMapping("/")
    public RespBean updateTemplate(@RequestBody ReactionForm templates, HttpSession session) {
        System.out.println(templates);
        return userService.saveTemplate(templates, session);
    }


    @ApiOperation("删除模板")
    @ResponseBody
    @DeleteMapping("/{id}")
    public RespBean updateTemplate(@PathVariable String id, HttpSession session) {
        return userService.deleteTemplate(id, session);
    }

    @ApiOperation("查看模板")
    @ResponseBody
    @PostMapping("/{id}")
    public RespBean getTemplate(@PathVariable String id, HttpSession session) {
        return userService.getTemplate(id, session);
    }
}
