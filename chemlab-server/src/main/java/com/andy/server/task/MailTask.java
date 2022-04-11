package com.andy.server.task;

import com.andy.server.pojo.MailConstants;
import com.andy.server.pojo.SignupmailLog;
import com.andy.server.pojo.User;
import com.andy.server.service.ISignupmailLogService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static com.andy.server.utils.ModifyStringUtils.resetEmail;
import static com.andy.server.utils.ModifyStringUtils.signupEmail;

/**
 * 邮件发送定时任务
 */
@Component
public class MailTask {

    @Autowired
    private ISignupmailLogService mailLogService;
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 10s 执行一次
     */
    @Scheduled(cron = "0/10 * * * * ?")
    public void mailTask() {
        //获取所有未投递的消息
        List<SignupmailLog> list = mailLogService.list(new QueryWrapper<SignupmailLog>().eq("status", 0).lt("tryTime", LocalDateTime.now()));
        //重发所有未投递消息
        list.forEach(mailLog -> {
            //如果重试次数超过 3 次，不再重试，投递状态直接更新为投递失败
            if (mailLog.getCount() >= 3) {
                mailLogService.update(new UpdateWrapper<SignupmailLog>().set("status", 2).eq("msgId", mailLog.getMsgId()));
            }
            mailLogService.update(new UpdateWrapper<SignupmailLog>().set("count", mailLog.getCount() + 1).set("updateTime", LocalDateTime.now()).set("tryTime", LocalDateTime.now().plusMinutes(MailConstants.MAX_TIME_OUT)).eq("msgId", mailLog.getMsgId()));
            String email = mailLog.getEmail();
            //发送消息
            rabbitTemplate.convertAndSend(MailConstants.MAIL_EXCHANGE, MailConstants.MAIL_SIGNUP_ROUTING_KEY_NAME, email, new CorrelationData(mailLog.getMsgId()));
        });
    }

    /**
     * 每 1 分钟执行一次，清除过期的未激活用户
     */
    @Scheduled(cron = "0 0/1 * * * ?")
    public void delExpireUnActiveUser() {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        HashOperations<String, String, User> hashOperations = redisTemplate.opsForHash();
        Map<String, User> unActiveUser = hashOperations.entries("un_active_user");
        for (String email : unActiveUser.keySet()) {
            //如果未激活的账户还未过期
            if (valueOperations.get(signupEmail(email)) != null) {
                continue;
            }
            //未激活的账户已经过期了
            hashOperations.delete("un_active_user", email);
        }
    }

    /**
     * 每 1 分钟执行一次，清除过期的随机码
     */
    @Scheduled(cron = "0 0/1 * * * ?")
    public void delExpireRandomCode() {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        Map<String, Object> emails = hashOperations.entries("random_code");
        for (String email : emails.keySet()) {
            //如果未激活的账户还未过期
            if (valueOperations.get(resetEmail(email)) != null) {
                continue;
            }
            //未激活的账户已经过期了
            hashOperations.delete("random_code", email);
        }
    }
}
