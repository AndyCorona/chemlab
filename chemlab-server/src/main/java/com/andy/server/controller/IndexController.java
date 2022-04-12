package com.andy.server.controller;

import com.andy.server.pojo.RespBean;
import com.andy.server.pojo.User;
import com.andy.server.service.IUserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class IndexController {

    @Autowired
    private IUserService userService;

    @ApiOperation("查询用户名是否已被使用，该接口可能被刷")
    @ResponseBody
    @GetMapping("/index/username/{username}")
    public RespBean isUsernameUsed(@PathVariable String username) {
        //用户名已在缓存中或在数据库中存在
        if (userService.isUserNameUsed(username) || userService.getUserByUsername(username) != null) {
            return RespBean.error("用户名已存在");
        }
        return RespBean.success("成功");
    }

    @ApiOperation("查询邮箱是否已被使用，该接口可能被刷")
    @ResponseBody
    @GetMapping("/index/email/{email}")
    public RespBean isEmailUsed(@PathVariable String email) {
        //邮箱已在缓存中或在数据库中存在
        if (userService.isEmailUsed(email) || userService.getUserByEmail(email) != null) {
            return RespBean.error("邮箱已注册");
        }
        return RespBean.success("成功");
    }

    @ApiOperation("注册用户，该接口可能被刷")
    @PostMapping("/index/signup")
    public String signup(User user, RedirectAttributes Attribute) {
        //用户校验，绕过前端校验直接回到首页
        if (!userService.validate(user)) {
            return "redirect:/";
        }

        //判断用户是否在缓存中，判断用户是否在数据库中
        if (userService.isUserNameUsed(user.getUsername()) || userService.isEmailUsed(user.getEmail()) || userService.getUserByEmail(user.getEmail()) != null
                || userService.getUserByUsername(user.getUsername()) != null) {
            Attribute.addAttribute("used", true);
        } else {
            Attribute.addAttribute("used", false);
            //通过校验则将用户信息放在 redis 中
            userService.putUserOnRedis(user);
            //发送邮件
            userService.sendMail(user);
        }
        return "redirect:/index/active";
    }

    @ApiOperation("返回注册结果的页面")
    @GetMapping("/index/active")
    public String signupResult(@RequestParam("used") boolean isUsed, Model model) {
        if (isUsed) {
            model.addAttribute("used", "true");
        } else {
            model.addAttribute("used", "false");
        }
        return "active";
    }

    @ApiOperation("返回激活结果的页面")
    @GetMapping("/index/confirm")
    public String active(@RequestParam("email") String email, Model model) {
        if (userService.active(email)) {
            model.addAttribute("active", "true");
        } else {
            model.addAttribute("active", "false");
        }
        return "active";
    }

    @ApiOperation("用户登录")
    @ResponseBody
    @PostMapping("/index/login")
    public RespBean login(User user, HttpServletRequest request) {
        return userService.login(user, request);
    }

    @ApiOperation("发送验证码")
    @ResponseBody
    @PostMapping("/index/getRandomCode")
    /**
     * 该接口可能被刷，
     */
    public RespBean getRandomCode(String email, HttpSession session) {
        //如果该邮箱不存在或该邮箱已经发送过验证码
        if ("".equals(email) || userService.isCodeSent(email) || userService.getUserByEmail(email) == null) {
            return RespBean.error("邮件发送失败");
        }
        //给邮箱发送验证码
        userService.sendCode(email);
        session.setAttribute("email", email);
        return RespBean.success("邮件发送成功");
    }

    @ApiOperation("核对随机码")
    @ResponseBody
    @PostMapping("/index/checkRandomCode")
    public RespBean checkRandomCode(String email, String randomCode, HttpSession session) {
        //如果没有发送过验证码或该邮箱没有发送过验证码
        if (session.getAttribute("email") == null || !userService.isCodeSent(email)) {
            return RespBean.error("无效的验证码");
        }
        //去缓存里核对验证码
        return userService.checkCode(email, randomCode);
    }

    @ApiOperation("返回重置密码页面")
    @GetMapping("/index/reset")
    public String reset(HttpServletRequest request) {
        String email = (String) request.getSession().getAttribute("email");
        //如果 redis 缓存中没有对应的重置密码邮箱的
        if (email == null || !userService.isCodeSent(email)) {
            return "redirect:/";
        }
        //从 redis 中移除该邮箱，测试时关闭
        userService.removeResetFromRedis(email);
        //从数据库查找用户名
        String username = userService.getUserByEmail(email).getUsername();
        request.getSession().setAttribute("username", username);
        return "reset";
    }


    @ApiOperation("返回重置密码结果")
    @ResponseBody
    @PostMapping("/index/reset")
    public RespBean reset(User user, HttpSession session) {
        String email = (String) session.getAttribute("email");
        String username = (String) session.getAttribute("username");
        //如果会话域里没有用户名和邮箱
        if (email == null || username == null) {
            return RespBean.error("密码重置失败");
        }
        session.removeAttribute("email");
        session.removeAttribute("username");
        return userService.updatePassword(user, email, username);
    }

}

