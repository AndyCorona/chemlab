package com.andy.server.mapper;

import com.andy.server.pojo.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author andy
 * @since 2022-03-19
 */
public interface UserMapper extends BaseMapper<User> {
    User getUserDetailsByUsername(String username);

}
