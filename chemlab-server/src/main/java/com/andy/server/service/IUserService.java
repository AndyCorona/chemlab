package com.andy.server.service;

import com.andy.server.pojo.ReactionForm;
import com.andy.server.pojo.RespBean;
import com.andy.server.pojo.User;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author andy
 * @since 2022-03-19
 */
public interface IUserService extends IService<User> {

    /**
     * 判断用户名是否在缓存中
     */
    boolean isUserNameUsed(String username);

    /**
     * 判断邮箱是否在缓存中
     */
    boolean isEmailUsed(String email);

    /**
     * 校验用户名、邮箱和密码
     *
     * @param user
     * @return
     */
    boolean validate(User user);

    /**
     * 用户信息通过校验，可以先放在 redis 中，等待用户激活
     *
     * @param user
     */
    void putUserOnRedis(User user);

    /**
     * 用户注册后，给用户发送邮件
     *
     * @param user
     */
    void sendMail(User user);

    /**
     * 用户激活邮箱，查询 redis 中是否有该邮箱
     *
     * @return
     */
    boolean active(String email);

    /**
     * 登录之后返回 token
     *
     * @param user
     * @param request
     */
    RespBean login(User user, HttpServletRequest request);

    /**
     * 根据邮箱获取用户信息
     *
     * @param email
     * @return
     */
    User getUserByEmail(String email);

    /**
     * 根据用户名获取用户信息
     *
     * @param username
     * @return
     */
    User getUserByUsername(String username);

    /**
     * 给邮箱发送验证码
     *
     * @param email
     */
    void sendCode(String email);

    /**
     * 判断重置密码邮件是否已经发送
     *
     * @param email
     * @return
     */
    boolean isCodeSent(String email);

    /**
     * 核对验证码
     *
     * @param email
     * @param randomCode
     * @return
     */
    RespBean checkCode(String email, String randomCode);

    /**
     * 从 redis 中移除重置密码邮箱
     *
     * @param email
     */
    void removeResetFromRedis(String email);

    /**
     * 修改用户密码
     *
     * @param email
     */
    RespBean updatePassword(User user, String email, String username);

    /**
     * 获取一个用户的所有模板
     *
     * @return
     */
    RespBean getAllTemplates(String templateUrl);

    /**
     * 保存用户的模板
     *
     * @param session
     * @return
     */
    RespBean saveTemplate(ReactionForm template, HttpSession session);

    /**
     * 删除用户模板
     * @param id
     * @param session
     * @return
     */
    RespBean deleteTemplate(String id, HttpSession session);

    /**
     * 查看用户模板
     * @param id
     * @param session
     * @return
     */
    RespBean getTemplate(String id, HttpSession session);
}
