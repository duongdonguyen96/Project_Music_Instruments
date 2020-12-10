package com.codegym.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
@Controller
@RequestMapping(value = "/users")
public class UserController {
    @GetMapping(value = "")
    public ModelAndView listUsers(){
        ModelAndView modelAndView=new ModelAndView("admin/User");
        return modelAndView;
    }
}
