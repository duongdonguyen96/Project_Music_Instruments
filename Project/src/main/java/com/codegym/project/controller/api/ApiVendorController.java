package com.codegym.project.controller.api;

import com.codegym.project.model.Vendor;
import com.codegym.project.model.message.MessageNotification;
import com.codegym.project.service.VendorService;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ApiVendorController {
    @Autowired
    VendorService vendorService;

    @GetMapping(value = "/vendors/")
    public ResponseEntity<List<Vendor>> listProducts() {
        List<Vendor> vendorList = vendorService.findAll();
        return new ResponseEntity<List<Vendor>>(vendorList, HttpStatus.OK);
    }

    @RequestMapping(value = "/vendor/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Vendor> findById(@PathVariable("id") Long id) {
        try{
            Vendor vendor = vendorService.findById(id);
            return new ResponseEntity<Vendor>(vendor, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Vendor>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/vendor/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable("id") Long id) {
        boolean isVendor=false;
        try {
            isVendor= vendorService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isVendor;
    }

    //    validateBackEnd
    @PutMapping(value = "/vendor/")
    @ResponseBody
    public ResponseEntity<Object> getBlogById(@Validated Vendor vendor, BindingResult bindingResult) {
        return validate(vendor,bindingResult);
    }

    @RequestMapping(value = "/vendor/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Vendor vendor, BindingResult bindingResult) {
        return validate(vendor,bindingResult);
    }

    @RequestMapping(value = "/vendor/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Vendor vendor, BindingResult bindingResult) {
        return validate(vendor,bindingResult);
    }

    public ResponseEntity<Object> validate(Vendor vendor , BindingResult bindingResult){
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
                vendorService.save(vendor);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(vendor);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

//vendor deleted

    @GetMapping(value = "/vendorsDeleted/")
    public ResponseEntity<List<Vendor>> listProductsDeleted() {
        List<Vendor> vendorList = vendorService.findAllVendorsDeleted();
        return new ResponseEntity<List<Vendor>>(vendorList, HttpStatus.OK);
    }

    @RequestMapping(value = "/vendorDeleted/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean deleteProduct(@PathVariable("id") Long id) {
        boolean isVendors=false;
        try {
            isVendors= vendorService.deleteVendor(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isVendors;
    }

    @RequestMapping(value = "/vendorUndo/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean undoVendor(@PathVariable("id") Long id) {
        boolean isVendors=false;
        try {
            isVendors= vendorService.undoVendor(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isVendors;
    }

}
