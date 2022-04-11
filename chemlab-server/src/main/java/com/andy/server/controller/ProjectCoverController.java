package com.andy.server.controller;


import com.andy.server.pojo.ProjectCover;
import com.andy.server.pojo.RespBean;
import com.andy.server.service.IProjectCoverService;
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
 * @since 2022-03-29
 */
@RestController
@RequestMapping("/project-cover")
public class ProjectCoverController {


    @Autowired
    private IProjectCoverService projectCoverService;

    @ApiOperation("获取前3个项目封面")
    @GetMapping("/")
    public RespBean getProjectCover() {
//        List<ProjectCover> projectCovers = projectCoverService.list(new QueryWrapper<ProjectCover>().groupBy("id").lt("id", 4));
        List<ProjectCover> projectCovers = projectCoverService.list(new QueryWrapper<ProjectCover>().groupBy("id").gt("id", 3));

        if (projectCovers != null) {
            return RespBean.success("成功", projectCovers);
        }
        return RespBean.error("失败");
    }

}
