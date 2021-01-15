package com.codegym.project.controller.api;

import com.codegym.project.model.Banner;
import com.codegym.project.model.Blog;
import com.codegym.project.model.Vendor;
import com.codegym.project.model.message.MessageNotification;
import com.codegym.project.service.BannerService;
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
public class ApiBannerController {
    @Autowired
    public BannerService bannerService;

    @GetMapping(value = "/banners/")
    public ResponseEntity<List<Banner>> listBanners(){
        List<Banner> banners = bannerService.findAll();
        return new ResponseEntity<List<Banner>>(banners, HttpStatus.OK);
    }

    @RequestMapping(value = "/banner/{id}", method = RequestMethod.GET)
    public ResponseEntity<Banner> listBanners(@PathVariable("id") Long id){
        try {
            Banner banner = bannerService.findById(id);
            return new ResponseEntity<Banner>(banner, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Banner>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/banner/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable("id") Long id){
        boolean isBanner = false;
        try {
            isBanner = bannerService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isBanner;
    }

    @PutMapping(value = "/banner/")
    @ResponseBody
    public ResponseEntity<Object> getBannerById(@Validated Banner banner, BindingResult bindingResult) {
        return validate(banner,bindingResult);
    }

    @RequestMapping(value = "/banner/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Banner banner, BindingResult bindingResult) {
        return validate(banner,bindingResult);
    }

    @RequestMapping(value = "/banner/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Banner banner, BindingResult bindingResult) {
        banner.setDateUpdate(LocalDateTime.now());
        return validate(banner,bindingResult);
    }

    public ResponseEntity<Object> validate(Banner banner , BindingResult bindingResult){
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
                bannerService.save(banner);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(banner);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

    //    BannerDeleted
    @GetMapping(value = "/bannersDeleted/")
    public ResponseEntity<List<Banner>> listBannersDeleted(){
        List<Banner> bannersListDeleted = bannerService.findAllBannerDeleted();
        return new ResponseEntity<List<Banner>>(bannersListDeleted, HttpStatus.OK);
    }

    @RequestMapping(value = "/bannerDeleted/{id}", method = RequestMethod.DELETE)
    public boolean deleteBanner(@PathVariable("id") Long id){
        boolean isBanner = false;
        try {
            isBanner = bannerService.deleteBanner(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isBanner;
    }
    @RequestMapping(value = "/bannerUndo/{id}", method = RequestMethod.PUT)
    public boolean undoBanner(@PathVariable("id") Long id){
        boolean isBanner = false;
        try {
            isBanner = bannerService.undoBanner(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isBanner;
    }

    @GetMapping(value = "/bannerDeleted/{id}")
    public ResponseEntity<Banner> findBannerDeletedById(@PathVariable Long id){
        try{
            Banner banner = bannerService.findBannerDeleted(id);
            return new ResponseEntity<Banner>(banner, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Banner>(HttpStatus.NO_CONTENT);
        }
    }
}
