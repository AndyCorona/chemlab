package com.andy.server.controller;

import com.andy.server.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MongoDBController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/mongo")
    public void save() {
        User user = new User();
        user.setUsername("likezhen");
        Object save = mongoTemplate.save(new User());
        System.out.println(save);
    }
}
