package com.andy.server.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 公共返回对象
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RespBean {

    private long code;
    private String message;
    private Object object;

    /**
     * 成功返回，不带结果
     *
     * @param message
     * @return
     */
    public static RespBean success(String message) {
        return new RespBean(200, message, null);
    }

    /**
     * 成功返回，带结果
     *
     * @param message
     * @return
     */
    public static RespBean success(String message, Object o) {
        return new RespBean(200, message, o);
    }

    /**
     * 返回失败，不带结果
     *
     * @param msg
     * @return
     */
    public static RespBean error(String msg) {
        return new RespBean(500, msg, null);
    }

    /**
     * 返回失败，带结果
     *
     * @param msg
     * @param o
     * @return
     */
    public static RespBean error(String msg, Object o) {
        return new RespBean(500, msg, o);
    }

}
