package com.andy.server.controller;


import com.andy.server.pojo.RespBean;
import com.andy.server.pojo.Scheme;
import com.andy.server.service.ISchemeService;
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
@RequestMapping("/scheme")
public class SchemeController {

    @Autowired
    private ISchemeService schemeService;

    @ApiOperation("获取前 3 个背景图片")
    @GetMapping("/")
    public RespBean getScheme() {
        List<Scheme> scheme = schemeService.list(new QueryWrapper<Scheme>().ne("id", 0).lt("id", 4).groupBy("id"));
        if (scheme != null) {
            return RespBean.success("成功", scheme);
        }
        return RespBean.error("失败");
    }

}
