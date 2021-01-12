package com.codegym.project.controller.api;

import com.codegym.project.model.Blog;
import com.codegym.project.model.message.MessageNotification;
import com.codegym.project.service.BlogService;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ApiBlogController {
    @Autowired
    public BlogService blogService;

    @GetMapping(value = "/blogs/")
    public ResponseEntity<List<Blog>> listBlogs(){
        List<Blog> blogList = blogService.findAll();
        return new ResponseEntity<List<Blog>>(blogList, HttpStatus.OK);
    }

    @RequestMapping(value = "/blog/{id}", method = RequestMethod.GET)
    public ResponseEntity<Blog> listBlogs(@PathVariable("id") Long id){
        try {
            Blog blog = blogService.findById(id);
            return new ResponseEntity<Blog>(blog, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Blog>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/blog/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable("id") Long id){
        boolean isDelete = false;
        try {
            isDelete = blogService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isDelete;
    }

    @PutMapping(value = "/blog/")
    @ResponseBody
    public ResponseEntity<Object> getBlogById(@Validated Blog blog, BindingResult bindingResult) {
        return validate(blog,bindingResult);
    }

    @RequestMapping(value = "/blog/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Blog blog, BindingResult bindingResult) {
        return validate(blog,bindingResult);
    }

    @RequestMapping(value = "/blog/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Blog blog, BindingResult bindingResult) throws SQLException {
        return validate(blog,bindingResult);
    }

    public ResponseEntity<Object> validate(Blog blog , BindingResult bindingResult){
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
                blogService.save(blog);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(blog);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

//    Api blog deleted
    @GetMapping(value = "/blogsDeleted")
    public ResponseEntity<List<Blog>> listBlogDeleted(){
        List<Blog> blogs = blogService.findAllBlogDeleted();
        return new ResponseEntity<List<Blog>>(blogs, HttpStatus.OK);
    }

    @RequestMapping(value = "/blogDeleted/{id}", method = RequestMethod.DELETE)
    public boolean deleteBlog(@PathVariable("id") Long id){
        boolean isBlog = false;
        try {
            isBlog = blogService.deleteBlog(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isBlog;
    }

    @RequestMapping(value = "/blogUndo/{id}", method = RequestMethod.PUT)
    public boolean UndoBlog(@PathVariable("id") Long id){
        boolean isBlog = false;
        try {
            isBlog = blogService.undoBlog(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isBlog;
    }

//    Home
    @GetMapping(value = "/newFourBlogs/")
    public ResponseEntity<List<Blog>> listNewFourBlogs(){
        long sl=4;
        List<Blog> blogList = blogService.listFourNewBlogs(sl);
        return new ResponseEntity<List<Blog>>(blogList, HttpStatus.OK);
    }

    @GetMapping(value = "/newEightBlogs/")
    public ResponseEntity<List<Blog>> listNewEightBlogs(){
        long sl=8;
        List<Blog> blogList = blogService.listFourNewBlogs(sl);
        return new ResponseEntity<List<Blog>>(blogList, HttpStatus.OK);
    }

}
