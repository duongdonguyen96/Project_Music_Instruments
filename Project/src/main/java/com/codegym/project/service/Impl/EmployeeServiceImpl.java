package com.codegym.project.service.Impl;
import com.codegym.project.model.Employee;
import com.codegym.project.repository.EmployeeRepository;
import com.codegym.project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee findById(long id) throws SQLException {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Employee save(Employee element) throws SQLException {
        return employeeRepository.save(element);
    }

    @Override
    public boolean delete(long id) throws SQLException {

        Employee em = this.findById(id);
        if (em == null) {
            return false;
        }
        employeeRepository.delete(em);
        return true;
    }
}