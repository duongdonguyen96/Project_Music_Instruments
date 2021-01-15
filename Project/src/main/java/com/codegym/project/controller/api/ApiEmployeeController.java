package com.codegym.project.controller.api;

import com.codegym.project.model.Employee;
import com.codegym.project.model.message.MessageNotification;
import com.codegym.project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ApiEmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping(value = "/employees/")
    public ResponseEntity<List<Employee>> ListEmployees() {
        List<Employee> employeeList = employeeService.findAll();
        return new ResponseEntity<List<Employee>>(employeeList, HttpStatus.OK);
    }


    @RequestMapping(value = "/employees/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Employee> findEmById(@PathVariable("id") Long id) {
        try {
            Employee employee = employeeService.findById(id);
            return new ResponseEntity<Employee>(employee, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/employees/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable("id") Long id) {
        boolean isEm = false;
        try {
            isEm = employeeService.delete(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isEm;
    }

    //    validateBackEnd
    @PutMapping(value = "/employees/")
    @ResponseBody
    public ResponseEntity<Object> getBlogById(@Validated Employee employees, BindingResult bindingResult) {
        return validate(employees, bindingResult);
    }

    @RequestMapping(value = "/employees/", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Object> create(@Valid @RequestBody Employee employees, BindingResult bindingResult) {
        employees.setDateAdd(LocalDateTime.now());
        return validate(employees, bindingResult);
    }

    @RequestMapping(value = "/employees/", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
    public ResponseEntity<Object> edit(@Valid @RequestBody Employee employees, BindingResult bindingResult) {
        employees.setDateUpdate(LocalDateTime.now());

        return validate(employees, bindingResult);
    }

    public ResponseEntity<Object> validate(Employee employees, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            List<String> fieldString = new ArrayList<>();
            for (FieldError e : fieldErrors) {
                fieldString.add(e.getField() + ": " + e.getDefaultMessage());
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(-2);
            messageNotification.setStringListMessage(fieldString);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        } else {
            try {
                employeeService.save(employees);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            MessageNotification messageNotification = new MessageNotification();
            messageNotification.setCode(2);
            messageNotification.setObject(employees);
            return new ResponseEntity<Object>(messageNotification, HttpStatus.OK);
        }
    }

    //   Employee deleted
    @GetMapping(value = "/employeesDeleted/")
    public ResponseEntity<List<Employee>> listEmsDeleted() {
        List<Employee> emsDelete = employeeService.findAllEmsDelete();
        return new ResponseEntity<List<Employee>>(emsDelete, HttpStatus.OK);
    }

    @RequestMapping(value = "/employeesDeleted/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean deleteEmployee(@PathVariable("id") Long id) {
        boolean emDelete = false;
        try {
            emDelete = employeeService.deleteEm(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return emDelete;
    }

    @RequestMapping(value = "/employeeUndo/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean undoVendor(@PathVariable("id") Long id) {
        boolean isVendors = false;
        try {
            isVendors = employeeService.undoEm(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isVendors;
    }
    @RequestMapping(value = "/employeesName/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Employee> findEmById(Principal principal) {
        String name=principal.getName();
        try {
            Employee employee = employeeService.findByUserName(name);
            return new ResponseEntity<Employee>(employee, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
        }
    }
}