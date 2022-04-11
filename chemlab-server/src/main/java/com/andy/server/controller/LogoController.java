package com.andy.server.controller;


import com.andy.server.pojo.Logo;
import com.andy.server.pojo.RespBean;
import com.andy.server.service.ILogoService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author andy
 * @since 2022-03-27
 */
@RestController
@RequestMapping("/logo")
public class LogoController {

    @Autowired
    private ILogoService logoService;

    @ApiOperation("获取前 9 个 logo")
    @GetMapping("/")
    public RespBean getLogo() {
        List<Logo> logo = logoService.list(new QueryWrapper<Logo>().ne("id", 0).lt("id", 10).groupBy("id"));
        if (logo != null) {
            return RespBean.success("成功", logo);
        }
        return RespBean.error("失败");
    }


}
