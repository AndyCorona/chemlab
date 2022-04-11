package com.andy.server.config;

import com.andy.server.pojo.MailConstants;
import com.andy.server.pojo.ResetmailLog;
import com.andy.server.pojo.SignupmailLog;
import com.andy.server.service.IResetmailLogService;
import com.andy.server.service.ISignupmailLogService;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * RabbitMQ 配置类
 */
@Configuration
public class RabbitMqConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMqConfig.class);

    @Autowired
    private CachingConnectionFactory connectionFactory;
    @Autowired
    private ISignupmailLogService signupmailLogService;
    @Autowired
    private IResetmailLogService resetmailLogService;

    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        /**
         * 消息确认回调，确认消息是否达到 broker
         * data 消息唯一标识
         * ack 确认结果
         * cause 失败原因
         */
        rabbitTemplate.setConfirmCallback((data, ack, cause) -> {
            String msgId = data.getId();
            if (ack) {
                LOGGER.info("{}============>消息发送成功", msgId);
                //通过 msgId 的首字符判断是注册邮件还是重置密码邮件发送成功
                if (msgId.startsWith("S:")) {
                    signupmailLogService.update(new UpdateWrapper<SignupmailLog>().set("status", 1).eq("msgId", msgId));
                } else if (msgId.startsWith("R:")) {
                    resetmailLogService.update(new UpdateWrapper<ResetmailLog>().set("status", 1).eq("msgId", msgId));
                }
            } else {
                LOGGER.error("{}============>消息发送失败", msgId);
            }
        });

        /**
         * 消息失败回调
         * msg 消息主题
         * repCode 响应码
         * repText 相应描述
         * exchange 交换机
         * routingKey 路由键
         */
        rabbitTemplate.setReturnCallback((msg, repCode, repText, exchange, routingKey) -> {
            LOGGER.error("{}============>消息发送失败", msg.getBody());
        });

        return rabbitTemplate;
    }

    /**
     * 用户发送注册邮件的消息队列
     *
     * @return
     */
    @Bean
    public Queue queue1() {
        return new Queue(MailConstants.MAIL_SIGNUP_QUEUE_NAME);
    }

    /**
     * 发送随机码的消息队列
     *
     * @return
     */
    @Bean
    public Queue queue2() {
        return new Queue(MailConstants.MAIL_RESET_QUEUE_NAME);
    }

    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange((MailConstants.MAIL_EXCHANGE));
    }

    @Bean
    public Binding binding1() {
        return BindingBuilder.bind(queue1()).to(directExchange()).with(MailConstants.MAIL_SIGNUP_ROUTING_KEY_NAME);
    }

    @Bean
    public Binding binding2() {
        return BindingBuilder.bind(queue2()).to(directExchange()).with(MailConstants.MAIL_RESET_ROUTING_KEY_NAME);
    }
}
