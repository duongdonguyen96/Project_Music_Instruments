package com.codegym.project.controller.api;

import com.codegym.project.model.TypeProduct;
import com.codegym.project.model.message.MessageNotification;
import com.codegym.project.service.TypeProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ApiTypeProductController {
    @Autowired
    TypeProductService typeProductService;

    @GetMapping(value = "/typeProducts/")
    public ResponseEntity<List<TypeProduct>> listProducts() {
        List<TypeProduct> typeProductList = typeProductService.findAll();
        return new ResponseEntity<List<TypeProduct>>(typeProductList, HttpStatus.OK);
    }


    @RequestMapping(value = "/typeProduct/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TypeProduct> findById(@PathVariable("id") Long id) {
        try{
            TypeProduct typeProduct = typeProductService.findById(id);
            return new ResponseEntity<TypeProduct>(typeProduct, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<TypeProduct>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/typeProduct/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable("id") Long id) {
        boolean isTypeProduct=false;
        try {
            isTypeProduct= typeProductService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isTypeProduct;
    }

    //    validateBackEnd
    @PutMapping(value = "/typeProduct/")
    @ResponseBody
    public ResponseEntity<Object> getBlogById(@Validated TypeProduct typeProduct, BindingResult bindingResult) {
        return validate(typeProduct,bindingResult);
    }

    @RequestMapping(value = "/typeProduct/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody TypeProduct typeProduct, BindingResult bindingResult) {
        return validate(typeProduct,bindingResult);
    }

    @RequestMapping(value = "/typeProduct/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody TypeProduct typeProduct, BindingResult bindingResult) {
        return validate(typeProduct,bindingResult);
    }

    public ResponseEntity<Object> validate(TypeProduct typeProduct , BindingResult bindingResult){
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
                typeProductService.save(typeProduct);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(typeProduct);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

// type deleted
    @GetMapping(value = "/typeProductsDeleted/")
    public ResponseEntity<List<TypeProduct>> listProductsDeleted() {
        List<TypeProduct> typeProductListDeleted = typeProductService.findAllTypeProductsDeleted();
        return new ResponseEntity<List<TypeProduct>>(typeProductListDeleted, HttpStatus.OK);
    }

    @RequestMapping(value = "/typeProductDeleted/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean deleteProduct(@PathVariable("id") Long id) {
        boolean isVendors=false;
        try {
            isVendors= typeProductService.deleteTypeProduct(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isVendors;
    }

    @RequestMapping(value = "/typeProductUndo/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean undoVendor(@PathVariable("id") Long id) {
        boolean isVendors=false;
        try {
            isVendors= typeProductService.undoTypeProduct(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isVendors;
    }
}
