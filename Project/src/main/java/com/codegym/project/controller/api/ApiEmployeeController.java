package com.codegym.project.controller.api;
import com.codegym.project.model.Employee;
import com.codegym.project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiEmployeeController {
    @Autowired
    EmployeeService employeeService;

    @RequestMapping(value = "/employees/", method = RequestMethod.GET)
    public ResponseEntity<List<Employee>> listAllCategory() {
        List<Employee> employees = employeeService.findAll();
        if (employees == null) {
            return new ResponseEntity<List<Employee>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
    }

    @RequestMapping(value = "/employees/{id}", method = RequestMethod.DELETE)
    public boolean delete(@PathVariable("id") long id) {
        boolean isUser = false;
        try {
            isUser = employeeService.delete(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return isUser;
    }

    @RequestMapping(value = "employees/", method = RequestMethod.POST)

    public ResponseEntity<Employee> create(@RequestBody Employee user) throws SQLException {
        Employee employee = employeeService.save(user);
        return new ResponseEntity<Employee>(employee, HttpStatus.OK);
    }

    @RequestMapping(value = "/employees/{id}", method = RequestMethod.GET)
    public ResponseEntity<Employee> getCategory(@PathVariable("id") long id) throws SQLException {
        Employee employee = (Employee) employeeService.findById(id);
        return new ResponseEntity<Employee>(employee, HttpStatus.OK);
    }

    @RequestMapping(value = "/employees/", method = RequestMethod.PUT)
    public ResponseEntity<Employee> update(@RequestBody Employee employee) throws SQLException {
        employeeService.save(employee);
        return new ResponseEntity<Employee>(employee, HttpStatus.OK);
    }
}