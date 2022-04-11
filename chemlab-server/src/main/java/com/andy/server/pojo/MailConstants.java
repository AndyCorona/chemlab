package com.andy.server.pojo;

/**
 * 消息状态
 */
public class MailConstants {
    //消息投递中
    public static final Integer DELIVERING = 0;
    //消息投递成功
    public static final Integer SUCCESS = 1;
    //消息投递失败
    public static final Integer FAILURE = 2;
    //最大重试次数
    public static final Integer MAX_RETRY_COUNT = 3;
    //消息超时时间
    public static final Integer MAX_TIME_OUT = 1;
    //用户发送注册邮件的消息队列
    public static final String MAIL_SIGNUP_QUEUE_NAME = "mail.signup";
    //用户重置密码发送随机码的消息队列
    public static final String MAIL_RESET_QUEUE_NAME = "mail.reset";
    //交换机
    public static final String MAIL_EXCHANGE = "mail.exchange";
    //注册路由键
    public static final String MAIL_SIGNUP_ROUTING_KEY_NAME = "mail.signup.routing.key";
    //重置密码路由键
    public static final String MAIL_RESET_ROUTING_KEY_NAME = "mail.reset.routing.key";
}
