package com.codegym.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
@Controller
@RequestMapping(value = "/blogs")
public class BlogController {
    @GetMapping(value = "")
    public ModelAndView listBlogs(){
        ModelAndView modelAndView=new ModelAndView("admin/Blog");
        return modelAndView;
    }
}
