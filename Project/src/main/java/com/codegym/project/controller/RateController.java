package com.codegym.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
@Controller
@RequestMapping(value = "/rates")
public class RateController {
    @GetMapping(value = "")
    public ModelAndView listRates(){
        ModelAndView modelAndView=new ModelAndView("admin/Rate");
        return modelAndView;
    }
}
