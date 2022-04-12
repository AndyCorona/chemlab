package com.andy.server.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

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
@TableName("t_user")
@ApiModel(value = "User对象", description = "")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "用户id")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "用户名")
    private String username;

    @ApiModelProperty(value = "用户密码")
    private String password;

    @ApiModelProperty(value = "用户邮箱")
    private String email;
    @ApiModelProperty(value = "用户头像")
    private Integer logo;
    @ApiModelProperty(value = "用户背景")
    private Integer scheme;
    @ApiModelProperty(value = "用户描述")
    private String userDesc;

    @ApiModelProperty(value = "用户的项目列表")
    @TableField(exist = false)
    private List<Project> projects;

    @ApiModelProperty(value = "用户头像 url")
    @TableField(exist = false)
    private String logoUrl;

    @ApiModelProperty(value = "用户背景 url")
    @TableField(exist = false)
    private String schemeUrl;

    @ApiModelProperty(value = "用户模板的 mongodb 集合名称")
    private String templateUrl;

//    @ApiModelProperty(value = "用户的群组列表")
//    @TableField(exist = false)
//    private List<Group> groups;
//
//    @ApiModelProperty(value = "用户正在浏览的群组")
//    @TableField(exist = false)
//    private Group group;

}
