package com.andy.server.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 *
 * </p>
 *
 * @author andy
 * @since 2022-03-19
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("t_signupmail_log")
@ApiModel(value = "SignupmailLog对象", description = "")
public class SignupmailLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "消息 id")
    private String msgId;
    @ApiModelProperty(value = "注册的邮箱")
    private String email;
    @ApiModelProperty(value = "状态（0:消息投递中 1:投递成功 2:投递失败）")
    private Integer status;
    @ApiModelProperty(value = "路由键")
    private String routeKey;
    @ApiModelProperty(value = "交换机")
    private String exchange;
    @ApiModelProperty(value = "重试次数")
    private Integer count;
    @ApiModelProperty(value = "重试时间")
    private LocalDateTime tryTime;
    @ApiModelProperty(value = "创建时间")
    private LocalDateTime createTime;
    @ApiModelProperty(value = "更新时间")
    private LocalDateTime updateTime;


}
