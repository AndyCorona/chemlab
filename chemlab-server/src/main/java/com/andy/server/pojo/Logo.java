package com.andy.server.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author andy
 * @since 2022-03-27
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("t_logo")
@ApiModel(value="Logo对象", description="")
public class Logo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    @ApiModelProperty(value = "logo 图片 url")
    private String url;
    @ApiModelProperty(value = "logo 中文备注")
    private String nameZh;


}
