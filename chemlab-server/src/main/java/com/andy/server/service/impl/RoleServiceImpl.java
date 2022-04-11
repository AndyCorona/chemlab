package com.andy.server.service.impl;

import com.andy.server.mapper.RoleMapper;
import com.andy.server.pojo.Role;
import com.andy.server.service.IRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

}
