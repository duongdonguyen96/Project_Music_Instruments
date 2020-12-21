package com.codegym.project.controller.api;
import com.codegym.project.model.User;
import com.codegym.project.model.message.MessageNotification;
import com.codegym.project.service.UserService;
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
public class ApiUserController {
    @Autowired
    UserService userService;

    @GetMapping(value = "/users/")
    public ResponseEntity<List<User>> ListEmployees() {
        List<User> employeeList = userService.findAll();
        return new ResponseEntity<List<User>>(employeeList, HttpStatus.OK);
    }


    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> findEmById(@PathVariable("id") Long id) {
        try{
            User employee = userService.findById(id);
            return new ResponseEntity<User>(employee, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable("id") Long id) {
        boolean isEm=false;
        try {
            isEm= userService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isEm;
    }

    //    validateBackEnd
    @PutMapping(value = "/users/")
    @ResponseBody
    public ResponseEntity<Object> getBlogById(@Validated User typeProduct, BindingResult bindingResult) {
        return validate(typeProduct,bindingResult);
    }

    @RequestMapping(value = "/users/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody User typeProduct, BindingResult bindingResult) {
        return validate(typeProduct,bindingResult);
    }

    @RequestMapping(value = "/users/",produces = MediaType.APPLICATION_JSON_VALUE,method =RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody User typeProduct, BindingResult bindingResult) {
        typeProduct.setDateUpdate(LocalDateTime.now());
        return validate(typeProduct,bindingResult);
    }

    public ResponseEntity<Object> validate(User typeProduct , BindingResult bindingResult){
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
                userService.save(typeProduct);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(typeProduct);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

    //   Employee deleted
    @GetMapping(value = "/usersDeleted/")
    public ResponseEntity<List<User>> listEmsDeleted() {
        List<User> emsDelete = userService.findAllUsersDelete();
        return new ResponseEntity<List<User>>(emsDelete, HttpStatus.OK);
    }

    @RequestMapping(value = "/usersDelete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean deleteEmployee(@PathVariable("id") Long id) {
        boolean emDelete=false;
        try {
            emDelete= userService.deleteUser(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return emDelete;
    }

    @RequestMapping(value = "/usersUndo/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean undoVendor(@PathVariable("id") Long id) {
        boolean isVendors=false;
        try {
            isVendors= userService.undoUser(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isVendors;
    }
}