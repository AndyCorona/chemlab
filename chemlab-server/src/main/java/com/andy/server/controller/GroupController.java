package com.andy.server.controller;


import com.andy.server.pojo.Group;
import com.andy.server.pojo.RespBean;
import com.andy.server.pojo.User;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author andy
 * @since 2022-03-30
 */
@RestController
@RequestMapping("/group")
public class GroupController {


    @ApiOperation("创建一个组")
    @PutMapping("/")
    public RespBean createGroup(Group group, HttpSession session) {
        User user = (User) session.getAttribute("user");
        return RespBean.success("成功");
    }
}
