package com.andy.server.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
@ApiModel(value = "Reaction 表单对象", description = "")
public class ReactionForm {

    private String id;

    private List<Module> modules;

    @JsonFormat(pattern = "yyyy/MM/dd", timezone = "GMT+8")
    private LocalDate date;

    private String title;

    private String[] tags;

    private Integer projectId;
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createDateTime;

    private Integer reactionId;

    private String collectionKey;

}
