package com.codegym.project.service;

import com.codegym.project.model.Employee;
import com.codegym.project.service.BaseService;

import java.util.List;

public interface EmployeeService extends BaseService<Employee> {
    List<Employee> findAllEmsDelete();
    Employee findEmDeleteById(long id);
    boolean deleteEm(long id);
    boolean undoEm(long id);
}
