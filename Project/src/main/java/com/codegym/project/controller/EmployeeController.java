package com.codegym.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/employees")
public class EmployeeController {
    @GetMapping(value = "")
    public ModelAndView listEmployees() {
        ModelAndView modelAndView = new ModelAndView("admin/Employee");
        return modelAndView;
    }
}
