package com.codegym.project.controller;

import com.codegym.project.model.*;
import com.codegym.project.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.HttpRequestHandlerAdapter;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.sql.SQLException;
import java.util.List;

@Controller
@RequestMapping(value = "")
public class AllController {
    @Autowired
    public BlogService blogService;
    @Autowired
    public TypeProductService typeProductService;
    @Autowired
    public ProductService productService;
    @Autowired
    public VendorService vendorService;
    @Autowired
    public EmployeeService employeeService;

//Security
    @GetMapping(value = "/login")
    public ModelAndView login(){
        ModelAndView modelAndView=new ModelAndView("login/formLogin");
        return modelAndView;
    }

    @GetMapping(value = "/default")
    public String defaultAfterLogin(HttpServletRequest request) {
        if (request.isUserInRole("ADMIN")||request.isUserInRole("EMPLOYEE")) {
            return "redirect:/products";
        } else {
            return "redirect:/";
        }
    }

//Admin

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
    @GetMapping(value = "/ordersDeleted")
    public ModelAndView listOrdersDeleted(){
        ModelAndView modelAndView=new ModelAndView("admin/OrderIsDelete");
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

    @GetMapping(value = "/charts")
    public ModelAndView charts(){
        ModelAndView modelAndView=new ModelAndView("admin/Chart");
        return modelAndView;
    }


//    Home page
    @GetMapping(value = "/")
    public ModelAndView Home(){
        ModelAndView modelAndView=new ModelAndView("frontEnd/index");
        return modelAndView;
    }

// Home page -rates
    @GetMapping(value = "/contacts")
    public ModelAndView contact() {
        ModelAndView modelAndView = new ModelAndView("frontEnd/contact");
        return modelAndView;
    }
    // Home page -create users
    @GetMapping(value = "/registers")
    public ModelAndView register() {
        ModelAndView modelAndView = new ModelAndView("frontEnd/register");
        return modelAndView;
    }

// Home page -products
    @GetMapping(value = "/checkouts")
    public ModelAndView checkout(){
        ModelAndView modelAndView = new ModelAndView("frontEnd/checkout");
        return modelAndView;
    }

    @GetMapping(value = "/categories/{id}")
    public ModelAndView category(@PathVariable Long id) throws SQLException {
        ModelAndView modelAndView=new ModelAndView("frontEnd/category");
        TypeProduct typeProduct=typeProductService.findById(id);
        Vendor vendor=new Vendor();
        modelAndView.addObject("typeProduct",typeProduct);
        modelAndView.addObject("vendor",vendor);
        return modelAndView;
    }

    @GetMapping(value = "/vendors/{id}")
    public ModelAndView vendors(@PathVariable Long id) throws SQLException {
        ModelAndView modelAndView=new ModelAndView("frontEnd/category");
        Vendor vendor=vendorService.findById(id);
        TypeProduct typeProduct=new TypeProduct();
        modelAndView.addObject("vendor",vendor);
        modelAndView.addObject("typeProduct",typeProduct);
        return modelAndView;
    }

    @GetMapping(value = "/details/{id}")
    public ModelAndView detail(@PathVariable Long id) throws SQLException {
        Product product=productService.findById(id);
        ModelAndView modelAndView = new ModelAndView("frontEnd/details");
        modelAndView.addObject("product",product);
        modelAndView.addObject("str","<a href='' onclick='orders.addToCart("+product.getId()+")'>buy</a>");
        return modelAndView;
    }

//Home page-blogs
    @GetMapping(value = "/news")
    public ModelAndView blogs() {
        ModelAndView modelAndView = new ModelAndView("frontEnd/blog");
        return modelAndView;
    }

    @GetMapping(value = "/news/{id}")
    public ModelAndView views(@PathVariable Long id) throws SQLException {
        Blog blog=blogService.findById(id);
        ModelAndView modelAndView = new ModelAndView("frontEnd/views");
        modelAndView.addObject("blog",blog);
        return modelAndView;
    }


}
