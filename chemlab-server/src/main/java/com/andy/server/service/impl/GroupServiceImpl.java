package com.andy.server.service.impl;

import com.andy.server.mapper.GroupMapper;
import com.andy.server.pojo.Group;
import com.andy.server.service.IGroupService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author andy
 * @since 2022-03-30
 */
@Service
public class GroupServiceImpl extends ServiceImpl<GroupMapper, Group> implements IGroupService {

}
