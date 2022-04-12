package com.andy.server.exception;

import com.andy.server.pojo.RespBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 全局异常处理
 */

@ControllerAdvice
public class GlobalException {

    private static final Logger logger = LoggerFactory.getLogger(GlobalException.class);

    @ExceptionHandler(Exception.class)
    public String Exception(Exception e) {
        if (e instanceof Exception) {
            e.printStackTrace();
            return "error";
        }
        return "error";
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseBody
    public RespBean IllegalArgumentException(Exception e) {
        e.printStackTrace();
        //保存到 mongodb 数据库时发生异常抛出此异常，此时 mysql 数据库已经回滚
        return RespBean.error("保存失败");
    }
}
