package com.andy.server.service.impl;

import com.andy.server.mapper.LogoMapper;
import com.andy.server.pojo.Logo;
import com.andy.server.service.ILogoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author andy
 * @since 2022-03-27
 */
@Service
public class LogoServiceImpl extends ServiceImpl<LogoMapper, Logo> implements ILogoService {

}
