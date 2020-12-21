package com.codegym.project.service.Impl;

import com.codegym.project.model.Employee;
import com.codegym.project.repository.EmployeeRepository;
import com.codegym.project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
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
    public Employee save(Employee employees) throws SQLException {
        return employeeRepository.save(employees);
    }


    @Override
    public boolean delete(long id) throws SQLException {
        Employee em = this.findById(id);
        if (em == null) {
            return false;
        }
        em.setDelete(true);
        em.setDateDelete(LocalDateTime.now());
        employeeRepository.save(em);
        return true;
    }

    //    Employee deleted
    @Override
    public List<Employee> findAllEmsDelete() {
        return employeeRepository.findAllEmployeeDeleted();
    }

    @Override
    public Employee findEmDeleteById(long id) {
        Employee em = null;
        em = employeeRepository.findEmployeeById(id);
        return em;
    }

    @Override
    public boolean deleteEm(long id) {
        Employee em = this.findEmDeleteById(id);
        if (em != null) {
            employeeRepository.delete(em);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoEm(long id) {
        Employee em = this.findEmDeleteById(id);
        if (em != null) {
            em.setDelete(false);
            employeeRepository.save(em);
            return true;
        }
        return false;
    }

}