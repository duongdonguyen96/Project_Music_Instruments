package com.codegym.project.controller;

import com.codegym.project.model.Blog;
import com.codegym.project.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.sql.SQLException;

@Controller
@RequestMapping(value = "")
public class AllController {
    @Autowired
    public BlogService blogService;

    @GetMapping(value = "/login")
    public ModelAndView login(){
        ModelAndView modelAndView=new ModelAndView("login/formLogin");
        return modelAndView;
    }

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

    @GetMapping(value = "/blogadd")
    public ModelAndView showAddForm(){
        ModelAndView modelAndView = new ModelAndView("admin/BlogCreate");
        modelAndView.addObject("blog", new Blog());
        return modelAndView;
    }

    @GetMapping(value = "/blogedit/{id}")
    public ModelAndView showEditForm(@PathVariable("id") Long id) throws SQLException {
        ModelAndView modelAndView = new ModelAndView();
        Blog blog = blogService.findById(id);
        if (blog != null){
            modelAndView = new ModelAndView("admin/BlogEdit");
            modelAndView.addObject("blog", blog);
            return modelAndView;
        }
        return modelAndView;
    }

    @GetMapping(value = "/blogsDeleted")
    public ModelAndView listBlogsDelete(){
        ModelAndView modelAndView = new ModelAndView("admin/BlogIsDelete");
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
    @GetMapping(value = "/usersDelete")
    public ModelAndView listUsersDeleted() {
        ModelAndView modelAndView = new ModelAndView("/admin/UsersIsDelete");
        return modelAndView;
    }
    @GetMapping(value = "/employeesDelete")
    public ModelAndView listEmsDeleted() {
        ModelAndView modelAndView = new ModelAndView("/admin/EmployeeIsDelete");
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
    @GetMapping(value = "/home")
    public ModelAndView Home(){
        ModelAndView modelAndView=new ModelAndView("frontEnd/index");
        return modelAndView;
    }
    @GetMapping(value = "/contacts")
    public ModelAndView contact() {
        ModelAndView modelAndView = new ModelAndView("frontEnd/contact");
        return modelAndView;
    }
    @GetMapping(value = "/registers")
    public ModelAndView register() {
        ModelAndView modelAndView = new ModelAndView("frontEnd/register");
        return modelAndView;
    }
    @GetMapping(value = "/checkouts")
    public ModelAndView checkout(){
        ModelAndView modelAndView = new ModelAndView("frontEnd/checkout");
        return modelAndView;
    }
    @GetMapping(value = "/categories")
    public ModelAndView category(){
        ModelAndView modelAndView = new ModelAndView("frontEnd/category");
        return modelAndView;
    }
}
