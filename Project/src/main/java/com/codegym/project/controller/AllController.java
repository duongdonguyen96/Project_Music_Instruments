package com.codegym.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "")
public class AllController {
    @GetMapping(value = "/banners")
    public ModelAndView listBanners(){
        ModelAndView modelAndView=new ModelAndView("admin/Banner");
        return modelAndView;
    }

@GetMapping(value = "/bannersDeleted")
    public ModelAndView listBannersDelete(){
        ModelAndView modelAndView = new ModelAndView("/admin/BannerIsDelete");
        return modelAndView;
    }

    @GetMapping(value = "/blogs")
    public ModelAndView listBlogs(){
        ModelAndView modelAndView=new ModelAndView("admin/Blog");
        return modelAndView;
    }

    @GetMapping(value = "/employees")
    public ModelAndView listEmployees() {
        ModelAndView modelAndView = new ModelAndView("admin/Employee");
        return modelAndView;
    }

    @GetMapping(value = "/orders")
    public ModelAndView listOrders(){
        ModelAndView modelAndView=new ModelAndView("admin/Order");
        return modelAndView;
    }

    @GetMapping(value = "/products")
    public ModelAndView listProducts(){
        ModelAndView modelAndView=new ModelAndView("/admin/Product");
        return modelAndView;
    }

    @GetMapping(value = "/productDeleted")
    public ModelAndView listProductsDeleted(){
        ModelAndView modelAndView= new ModelAndView("/admin/ProductIsDeleted");
        return modelAndView;
    }

    @GetMapping(value = "/rates")
    public ModelAndView listRates(){
        ModelAndView modelAndView=new ModelAndView("admin/Rate");
        return modelAndView;
    }

    @GetMapping(value = "/ratesDeleted")
    public ModelAndView listRatesDeleted(){
        ModelAndView modelAndView=new ModelAndView("admin/RateIsDelete");
        return modelAndView;
    }

    @GetMapping(value = "/typeProducts")
    public ModelAndView listTypes(){
        ModelAndView modelAndView=new ModelAndView("admin/ProductLine");
        return modelAndView;
    }
    @GetMapping(value = "/typeProductsDeleted")
    public ModelAndView listTypesDeleted(){
        ModelAndView modelAndView=new ModelAndView("admin/ProductLineIsDelete");
        return modelAndView;
    }

    @GetMapping(value = "/users")
    public ModelAndView listUsers(){
        ModelAndView modelAndView=new ModelAndView("admin/User");
        return modelAndView;
    }

    @GetMapping(value = "/vendors")
    public ModelAndView listVendors(){
        ModelAndView modelAndView=new ModelAndView("admin/Vendor");
        return modelAndView;
    }

    @GetMapping(value = "/vendorsDeleted")
    public ModelAndView listVendorsDeleted(){
        ModelAndView modelAndView=new ModelAndView("admin/VendorIsDelete");
        return modelAndView;
    }
}
