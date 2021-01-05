package com.codegym.project.controller.api;

import com.codegym.project.model.Product;
import com.codegym.project.model.message.MessageNotification;
import com.codegym.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ApiProductController {
    @Autowired
    ProductService productService;

    @GetMapping(value = "/products/")
    public ResponseEntity<List<Product>> listProducts() {
        List<Product> productList =productService.findAll();
        return new ResponseEntity<List<Product>>(productList, HttpStatus.OK);
    }


    @RequestMapping(value = "/product/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> findById(@PathVariable("id") Long id) {
        try{
            Product product = productService.findById(id);
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable("id") Long id) {
        boolean isProduct=false;
        try {
            isProduct= productService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isProduct;
    }

//    validateBackEnd
    @PutMapping(value = "/product/")
    @ResponseBody
    public ResponseEntity<Object> getBlogById(@Validated Product product, BindingResult bindingResult, Errors errors) {
    return validate(product,bindingResult,errors);
    }

    @RequestMapping(value = "/product/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Product product, BindingResult bindingResult, Errors errors) {
        return validate(product,bindingResult,errors);
    }

    @RequestMapping(value = "/product/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Product product, BindingResult bindingResult,Errors errors) {
        return validate(product,bindingResult,errors);
    }

    public ResponseEntity<Object> validate(Product product , BindingResult bindingResult,Errors errors){
        String name=product.getName();
        List<Product> list=productService.findAllProductsByName(name);
        if (product.getId()==null){
            for (Product item:list) {
                if (item.getName().equals(name)) errors.rejectValue("name","name.equals","Tên sản phẩm đã tồn tại");
                break;
            }
        }else {
            for (Product item:list) {
                if (item.getId()!=product.getId()){
                    if (item.getName().equals(name)) errors.rejectValue("name","name.equals","Tên sản phẩm đã tồn tại");
                }
            }
        }
        if(bindingResult.hasErrors()) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            List<String> fieldString = new ArrayList<>();
            for (FieldError e: fieldErrors) {
                fieldString.add(e.getField()+": " +e.getDefaultMessage());
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(-2);
            messageNotification.setStringListMessage(fieldString);
            return new ResponseEntity<Object>(messageNotification,HttpStatus.OK);
        }else {
            try {
                productService.save(product);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(product);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

// productDeleted

    @GetMapping(value = "/productsDeleted/")
    public ResponseEntity<List<Product>> listProductsDeleted() {
        List<Product> productListDeleted =productService.findAllProductDeleted();
        return new ResponseEntity<List<Product>>(productListDeleted, HttpStatus.OK);
    }

    @RequestMapping(value = "/productDeleted/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean deleteProductDeleted(@PathVariable("id") Long id) {
        boolean isProduct=false;
        try {
            isProduct= productService.deleteProduct(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isProduct;
    }
    @RequestMapping(value = "/productUndo/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean undoProductDeleted(@PathVariable("id") Long id) {
        boolean isProduct=false;
        try {
            isProduct= productService.undoProduct(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isProduct;
    }

    @RequestMapping(value = "/productDeleted/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> findProductDeletedById(@PathVariable("id") Long id) {
        try{
            Product product = productService.findProductDeleted(id);
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
        }
    }

}
