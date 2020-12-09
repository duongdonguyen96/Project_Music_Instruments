package com.codegym.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/banners")
public class BannerController {
    @GetMapping(value = "")
    public ModelAndView listBanners(){
        ModelAndView modelAndView=new ModelAndView("admin/banner/Banner");
        return modelAndView;
    }

}
