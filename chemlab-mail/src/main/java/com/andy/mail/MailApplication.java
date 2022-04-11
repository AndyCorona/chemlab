package com.andy.mail;

import com.andy.server.pojo.MailConstants;
import org.springframework.amqp.core.Queue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MailApplication {
    public static void main(String[] args) {
        SpringApplication.run(MailApplication.class, args);
    }

    @Bean
    public Queue queue1() {
        return new Queue(MailConstants.MAIL_SIGNUP_QUEUE_NAME);
    }

    @Bean
    public Queue queue2() {
        return new Queue(MailConstants.MAIL_RESET_QUEUE_NAME);
    }
}
