package com.andy.server.pojo;

import io.swagger.annotations.ApiModel;
import lombok.*;

/**
 * 文件上传对象类
 */

@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "文件上传对象类", description = "")
public class FastDFSFile {
    private String name;
    private byte[] content;
    private String ext;
    private String md5;
    private String author;
    private String height;

    public FastDFSFile(String name, byte[] content, String ext) {
        this.name = name;
        this.content = content;
        this.ext = ext;
    }
}
