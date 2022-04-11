package com.andy.mail;

import com.andy.server.pojo.MailConstants;
import com.rabbitmq.client.Channel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * 消息接受者
 */
@Component
public class MailReceiver {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailReceiver.class);


    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private MailProperties mailProperties;
    @Autowired
    private TemplateEngine templateEngine;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @RabbitListener(queues = MailConstants.MAIL_SIGNUP_QUEUE_NAME)
    public void signup(Message<String> message, Channel channel) {
//        //从消息里拿到 注册用户的 email
        String email = message.getPayload();
        MessageHeaders headers = message.getHeaders();
//        //拿到消息序号
        Long tag = (Long) headers.get(AmqpHeaders.DELIVERY_TAG);
//        //拿到发送消息时存储的 UUID
        String msgId = (String) headers.get("spring_returned_message_correlation");
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();

        try {
            if (hashOperations.entries("signup_mail_log").containsKey(msgId)) {
                LOGGER.error("消息已被消费过======>{}", msgId);
                //手动确认消息
                channel.basicAck(tag, false);
                return;
            }

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
            //发件人
            mimeMessageHelper.setFrom(mailProperties.getUsername());
            //收件人
            mimeMessageHelper.setTo(email);
            //主题
            mimeMessageHelper.setSubject("注册激活邮件");
            //日期
            mimeMessageHelper.setSentDate(new Date());
            //邮件内容
            Context context = new Context();
            context.setVariable("email", email);
            String mail = templateEngine.process("activeMail", context);
            mimeMessageHelper.setText(mail, true);
            //发送邮件
            javaMailSender.send(mimeMessage);
            LOGGER.info("邮件发送成功======>{}");
            //将消息 id 存入 redis
            hashOperations.put("signup_mail_log", msgId, "OK");
            //手动确认消息
            channel.basicAck(tag, false);
        } catch (Exception e) {
            try {
                channel.basicNack(tag, false, true);
            } catch (IOException ioException) {
                LOGGER.error("邮件发送失败======>{}", e.getMessage());
            }
            LOGGER.error("邮件发送失败======>{}", e.getMessage());
        }
    }

    @RabbitListener(queues = MailConstants.MAIL_RESET_QUEUE_NAME)
    public void reset(Message<String> message, Channel channel) {
        //从消息里拿到重置密码的用户的 email
        String email = message.getPayload();
        //获取随机码
        String randomCode = getRandomCode();
        MessageHeaders headers = message.getHeaders();
        //拿到消息序号
        Long tag = (Long) headers.get(AmqpHeaders.DELIVERY_TAG);
        //拿到发送消息时存储的 UUID
        String msgId = (String) headers.get("spring_returned_message_correlation");
        HashOperations<String, String, Object> hashOperations = redisTemplate.opsForHash();
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();

        try {
            if (hashOperations.entries("reset_mail_log").containsKey(msgId)) {
                LOGGER.error("消息已被消费过======>{}", msgId);
                //手动确认消息
                channel.basicAck(tag, false);
                return;
            }

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
            //发件人
            mimeMessageHelper.setFrom(mailProperties.getUsername());
            //收件人
            mimeMessageHelper.setTo(email);
            //主题
            mimeMessageHelper.setSubject("重置密码邮件");
            //日期
            mimeMessageHelper.setSentDate(new Date());
            //邮件内容
            Context context = new Context();
            context.setVariable("randomCode", randomCode);
            String mail = templateEngine.process("resetMail", context);
            mimeMessageHelper.setText(mail, true);
            //发送邮件
            javaMailSender.send(mimeMessage);
            LOGGER.info("邮件发送成功======>{}");
            //将消息 id 存入 redis
            hashOperations.put("reset_mail_log", msgId, "OK");
            //手动确认消息
            channel.basicAck(tag, false);
            //将随机码放到 redis 中
            hashOperations.put("random_code", "reset_" + email, randomCode);
            //随机码 5 分钟有效期
            valueOperations.set("reset_" + email, randomCode, 5, TimeUnit.MINUTES);
        } catch (Exception e) {
            try {
                channel.basicNack(tag, false, true);
            } catch (IOException ioException) {
                LOGGER.error("邮件发送失败======>{}", e.getMessage());
            }
            LOGGER.error("邮件发送失败======>{}", e.getMessage());
        }
    }

    /**
     * 根据 UUID 获取 5 位随机码
     *
     * @return
     */
    private String getRandomCode() {
        String[] split = UUID.randomUUID().toString().split("-");
        String randomCode = "";
        for (String s : split) {
            randomCode += s.substring(1, 2);
        }
        return randomCode;
    }
}
