package com.andy.server;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.UUID;

/**
 * Hello world!
 */
@SpringBootApplication
@MapperScan("com.andy.server.mapper")
@EnableScheduling
public class MainApplication {
    public static void main(String[] args) {

        SpringApplication.run(MainApplication.class);

    }
}
