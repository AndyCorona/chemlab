package com.andy.server.mapper;

import com.andy.server.pojo.Reaction;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
public interface ReactionMapper extends BaseMapper<Reaction> {
    IPage<Reaction> getReactionByPage(Page<Reaction> page, @Param("projectId") Integer projectId, @Param("userId") Integer userId);
}
