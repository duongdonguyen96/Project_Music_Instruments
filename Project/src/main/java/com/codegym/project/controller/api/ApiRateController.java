package com.codegym.project.controller.api;

import com.codegym.project.model.Rate;
import com.codegym.project.model.TypeProduct;
import com.codegym.project.model.Vendor;
import com.codegym.project.model.message.MessageNotification;
import com.codegym.project.service.RateService;
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
public class ApiRateController {
    @Autowired
    RateService rateService;

    @GetMapping(value = "/rates/")
    public ResponseEntity<List<Rate>> listRates() {
        List<Rate> rateList = rateService.findAll();
        return new ResponseEntity<List<Rate>>(rateList, HttpStatus.OK);
    }

    @RequestMapping(value = "/rate/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Rate> findById(@PathVariable("id") Long id) {
        try{
            Rate rate = rateService.findById(id);
            rateService.save(rate);
            return new ResponseEntity<Rate>(rate, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Rate>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/rate/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable("id") Long id) {
        boolean isRate=false;
        try {
            isRate= rateService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isRate;
    }

    //    validateBackEnd

    @RequestMapping(value = "/rate/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Rate rate, BindingResult bindingResult) {
        return validate(rate,bindingResult);
    }

    public ResponseEntity<Object> validate(Rate rate , BindingResult bindingResult){
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
                rateService.save(rate);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(rate);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

//    Rate deleted

    @GetMapping(value = "/ratesDeleted/")
    public ResponseEntity<List<Rate>> listRatesDeleted() {
        List<Rate> rateList = rateService.findAllRatesDeleted();
        return new ResponseEntity<List<Rate>>(rateList, HttpStatus.OK);
    }

    @RequestMapping(value = "/rateDeleted/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean deleteRate(@PathVariable("id") Long id) {
        boolean isRates=false;
        try {
            isRates= rateService.deleteRate(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isRates;
    }

    @RequestMapping(value = "/findRateDeleted/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Rate> findRateDeleted(@PathVariable("id") Long id) {
        try{
            Rate rate = rateService.findRateDeleted(id);
            rateService.save(rate);
            return new ResponseEntity<Rate>(rate, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Rate>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value = "/ratesStatus/")
    public ResponseEntity<List<Rate>> listStatus() {
        List<Rate> rateList = rateService.findByStatus();
        return new ResponseEntity<List<Rate>>(rateList, HttpStatus.OK);
    }

}
