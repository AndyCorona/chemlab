package com.andy.server.service.impl;

import com.andy.server.mapper.ResetmailLogMapper;
import com.andy.server.mapper.SignupmailLogMapper;
import com.andy.server.mapper.UserMapper;
import com.andy.server.pojo.*;
import com.andy.server.service.IUserService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static com.andy.server.utils.ModifyStringUtils.resetEmail;
import static com.andy.server.utils.ModifyStringUtils.signupEmail;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author andy
 * @since 2022-03-19
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private SignupmailLogMapper signupmailLogMapper;

    @Autowired
    private ResetmailLogMapper resetmailLogMapper;

    @Autowired
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    /**
     * 判断用户名是否在缓存中
     */
    @Override
    public boolean isUserNameUsed(String username) {
        HashOperations<String, String, User> hashOperations = redisTemplate.opsForHash();
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        //判断用户名是否在 redis 缓存中
        Map<String, User> unActiveUser = hashOperations.entries("un_active_user");
        //获取所有 User
        for (User user : unActiveUser.values()) {
            if (user.getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断注册邮箱是否在缓存中
     */
    @Override
    public boolean isEmailUsed(String email) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        //该邮箱已在 redis 缓存中，为未激活或在重置状态
        return (valueOperations.get(signupEmail(email)) != null || valueOperations.get(resetEmail(email)) != null);
    }

    /**
     * 校验用户名、邮箱和密码
     *
     * @param user
     * @return
     */
    @Override
    public boolean validate(User user) {
        if (!user.getUsername().matches("^[0-9a-zA-Z]{1,20}$")) {
            return false;
        }
        if (!user.getEmail().matches("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")) {
            return false;
        }

        if (!user.getPassword().matches("^[0-9a-zA-Z@.!#$%^_=+;:]{6,20}$")) {
            return false;
        }
        return true;
    }

    /**
     * 用户信息通过校验，可以先放在 redis 中，等待用户激活
     *
     * @param user
     */
    @Override
    public void putUserOnRedis(User user) {
        HashOperations<String, String, User> hashOperations = redisTemplate.opsForHash();
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();

        hashOperations.put("un_active_user", user.getEmail(), user);
        //一天内不激活账户将删除
        valueOperations.set(signupEmail(user.getEmail()), user, 1, TimeUnit.DAYS);
    }

    /**
     * 用户注册后，给用户发送邮件
     *
     * @param user
     */
    @Override
    public void sendMail(User user) {
        String msgId = "S:" + UUID.randomUUID().toString();
        SignupmailLog signupmailLog = new SignupmailLog();
        signupmailLog.setCount(0);
        signupmailLog.setEmail(user.getEmail());
        signupmailLog.setCreateTime(LocalDateTime.now());
        signupmailLog.setUpdateTime(LocalDateTime.now());
        signupmailLog.setTryTime(LocalDateTime.now().plusMinutes(MailConstants.MAX_TIME_OUT));
        signupmailLog.setExchange(MailConstants.MAIL_EXCHANGE);
        signupmailLog.setRouteKey(MailConstants.MAIL_SIGNUP_ROUTING_KEY_NAME);
        signupmailLog.setMsgId(msgId);
        signupmailLog.setStatus(0);
        signupmailLogMapper.insert(signupmailLog);
        rabbitTemplate.convertAndSend(MailConstants.MAIL_EXCHANGE, MailConstants.MAIL_SIGNUP_ROUTING_KEY_NAME, user.getEmail(), new CorrelationData(msgId));
    }

    /**
     * 用户激活邮箱，查询 redis 中是否有该邮箱
     *
     * @return
     */
    @Override
    public boolean active(String email) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        String signupEmail = signupEmail(email);
        //redis 中存在该邮箱，则激活该邮箱
        if (valueOperations.get(signupEmail) != null) {
            //给用户密码加密
            User user = (User) valueOperations.get(signupEmail);
            if (user != null) {
//                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//                String password = encoder.encode(user.getPassword());
//                user.setPassword(password);
                //将用户信息保存至数据库中
                if (userMapper.insert(user) == 1) {
                    redisTemplate.delete(signupEmail);
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * 登录
     *
     * @param user
     * @param request
     */
    @Override
    public RespBean login(User user, HttpServletRequest request) {
        //判断用户是否在数据库中
        User user1 = userMapper.getUserDetailsByUsername(user.getUsername());
        if (user1 == null || !user1.getPassword().equals(user.getPassword())) {
            return RespBean.error("用户名或密码不正确");
        }
        //更新 session
        request.getSession().setAttribute("user", user1);
        logger.info("用户登录信息：" + request.getSession().getAttribute("user"));
        logger.info("用户正在浏览的项目：" + request.getSession().getAttribute("project"));
        logger.info("用户正在浏览的反应：" + request.getSession().getAttribute("reaction"));
        return RespBean.success("成功");
    }

    /**
     * 根据邮箱获取用户信息
     *
     * @param email
     * @return
     */
    @Override
    public User getUserByEmail(String email) {
        return userMapper.selectOne(new QueryWrapper<User>().eq("email", email));
    }

    /**
     * 根据用户名获取用户信息
     *
     * @param username
     * @return
     */
    @Override
    public User getUserByUsername(String username) {
        return userMapper.selectOne(new QueryWrapper<User>().eq("username", username));
    }

    /**
     * 给邮箱发送验证码
     *
     * @param email
     */
    @Override
    public void sendCode(String email) {
        String msgId = "R:" + UUID.randomUUID().toString();
        ResetmailLog resetmailLog = new ResetmailLog();
        resetmailLog.setCount(0);
        resetmailLog.setEmail(email);
        resetmailLog.setCreateTime(LocalDateTime.now());
        resetmailLog.setUpdateTime(LocalDateTime.now());
        resetmailLog.setTryTime(LocalDateTime.now().plusMinutes(MailConstants.MAX_TIME_OUT));
        resetmailLog.setExchange(MailConstants.MAIL_EXCHANGE);
        resetmailLog.setRouteKey(MailConstants.MAIL_RESET_ROUTING_KEY_NAME);
        resetmailLog.setMsgId(msgId);
        resetmailLog.setStatus(0);
        resetmailLogMapper.insert(resetmailLog);
        rabbitTemplate.convertAndSend(MailConstants.MAIL_EXCHANGE, MailConstants.MAIL_RESET_ROUTING_KEY_NAME, email, new CorrelationData(msgId));
    }

    /**
     * 判断重置密码邮件是否已经发送
     *
     * @param email
     * @return
     */
    @Override
    public boolean isCodeSent(String email) {
        //从 redis 中查询验证码
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(resetEmail(email)) != null;
    }

    /**
     * 核对验证码
     *
     * @param email
     * @param randomCode
     * @return
     */
    @Override
    public RespBean checkCode(String email, String randomCode) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        String code = (String) valueOperations.get(resetEmail(email));
        if (code != null) {
            if (code.equals(randomCode)) {
                //留下 1 分钟修改密码有效期
                redisTemplate.expire(resetEmail(email), 1, TimeUnit.MINUTES);
                return RespBean.success("成功");
            }
        }
        return RespBean.error("错误的验证码");
    }

    /**
     * 从 redis 中移除重置密码邮箱
     *
     * @param email
     */
    @Override
    public void removeResetFromRedis(String email) {
        redisTemplate.delete(resetEmail(email));
    }

    /**
     * 修改用户密码
     *
     * @param user
     * @return
     */
    @Override
    public RespBean updatePassword(User user, String email, String username) {
        user.setEmail(email);
        user.setUsername(username);
        if (validate(user)) {
//            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//            String password = encoder.encode(user.getPassword());
//            user.setPassword(password);
            //将用户信息保存至数据库中
            if (userMapper.update(user, new QueryWrapper<User>().eq("email", email).eq("username", username)) == 1) {
                return RespBean.success("重置密码成功");
            }
        }
        return RespBean.error("重置密码失败");

    }
}
