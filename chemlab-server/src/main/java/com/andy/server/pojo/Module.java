package com.andy.server.pojo;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "Module父类", description = "")
public class Module {
    private int index;
    private String ModuleName;
    private String title;
    private String content;
}
