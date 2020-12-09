package com.codegym.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/orders")
public class OrderController {
    @GetMapping(value = "")
    public ModelAndView listOrders(){
        ModelAndView modelAndView=new ModelAndView("admin/Order");
        return modelAndView;
    }
}
