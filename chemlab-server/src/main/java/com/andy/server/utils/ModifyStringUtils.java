package com.andy.server.utils;

import org.springframework.stereotype.Component;

/**
 * 对字符串进行指定的修饰
 */

@Component
public class ModifyStringUtils {

    private static final String SIGNUP_EMAIL_PREFIX = "signup_";
    private static final String RESET_EMAIL_PREFIX = "reset_";


    /**
     * 注册用户的邮箱加一个 signup_ 前缀
     */
    public static String signupEmail(String email) {
        return SIGNUP_EMAIL_PREFIX + email;
    }

    /**
     * 重置密码邮箱加一个 reset_ 前缀
     *
     * @param email
     * @return
     */
    public static String resetEmail(String email) {
        return RESET_EMAIL_PREFIX + email;
    }

}
