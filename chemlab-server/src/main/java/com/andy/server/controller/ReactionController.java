package com.andy.server.controller;


import com.andy.server.pojo.*;
import com.andy.server.service.IReactionService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author andy
 * @since 2022-03-24
 */
@RestController
@RequestMapping("/reaction")
public class ReactionController {
    @Autowired
    private IReactionService reactionService;

    @ApiOperation("分页获取反应")
    @GetMapping("/")
    @ResponseBody
    public RespPageBean getReactionByPage(@RequestParam(defaultValue = "2") Integer currentPage,
                                          @RequestParam(defaultValue = "6") Integer size, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Project project = (Project) session.getAttribute("project");
        return reactionService.getReactionByPage(currentPage, size, project.getId(), user.getId());
    }
    //更新反应
//    @ResponseBody
//    @PostMapping("/")
//    public RespBean update(@RequestBody ReactionForm reactionForm, HttpSession session) {
//        Integer projectId = ((Project) session.getAttribute("project")).getId();
//        reactionService.saveReaction(projectId, reactionForm);
//        return RespBean.success("成功");
//    }

    @ApiOperation("保存反应")
    @ResponseBody
    @PutMapping("/")
    public RespBean add(@RequestBody ReactionForm reactionForm, HttpSession session) {
        return reactionService.save(session, reactionForm);
    }

    @ApiOperation("查询反应")
    @ResponseBody
    @PostMapping("/")
    public RespBean getReactionForm(HttpSession session) {
        return reactionService.getReactionForm(session);
    }

    @ApiOperation("获取一个反应的所有版本")
    @ResponseBody
    @GetMapping("/list")
    public RespBean getAllDocuments(HttpSession session) {
        return reactionService.getAllDocuments(session);
    }

    @ApiOperation("获取一个反应的指定版本")
    @ResponseBody
    @PostMapping("/{id}")
    public RespBean getVersionDocument(@PathVariable String id, HttpSession session) {
        return reactionService.getVersionDocument(id, session);
    }


    @ApiOperation("批量删除反应")
    @ResponseBody
    @DeleteMapping("/{list}")
    public RespBean deleteReactions(@PathVariable List<Integer> list, HttpSession session) {
        System.out.println(list);
        return reactionService.deleteReactions(list, session);
    }
}
