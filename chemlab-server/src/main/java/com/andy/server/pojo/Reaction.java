package com.andy.server.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * <p>
 *
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName("t_reaction")
@ApiModel(value = "Reaction对象", description = "")
@AllArgsConstructor
@NoArgsConstructor
public class Reaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    @ApiModelProperty(value = "反应名称")
    private String reactionName;
    @JsonFormat(pattern = "yy/MM/dd",timezone = "GMT+8")
    @ApiModelProperty(value = "反应创建日期")
    private LocalDate reactionDate;
    @ApiModelProperty(value = "反应 tag1")
    private String tag1;
    @ApiModelProperty(value = "反应 tag2")
    private String tag2;
    @ApiModelProperty(value = "反应 tag3")
    private String tag3;
    @ApiModelProperty(value = "反应所属的项目 id")
    private Integer projectId;
    @ApiModelProperty(value = "当前反应保存在 mongodb 中的集合名称")
    private String reactionUrl;
}
