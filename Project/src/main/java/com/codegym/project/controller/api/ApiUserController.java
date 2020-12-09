package com.codegym.project.controller.api;
import com.codegym.project.model.User;
import com.codegym.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiUserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "/users/", method = RequestMethod.GET)
    public ResponseEntity<List<User>> listAllCategory() {
        List<User> users = userService.findAll();
        if (users == null) {
            return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable("id") long id) {
        boolean isUser = false;
        try {
            isUser = userService.delete(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isUser;
    }

    @RequestMapping(value = "users/", method = RequestMethod.POST)

    public ResponseEntity<User> create(@RequestBody User user) throws SQLException {
        User createUser = userService.save(user);
        return new ResponseEntity<User>(createUser, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getCategory(@PathVariable("id") long id) throws SQLException {
        User editCategory = (User) userService.findById(id);
        return new ResponseEntity<User>(editCategory, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/", method = RequestMethod.PUT)
    public ResponseEntity<User> update(@RequestBody User blog) throws SQLException {
        userService.save(blog);
        return new ResponseEntity<User>(blog, HttpStatus.OK);
    }
}