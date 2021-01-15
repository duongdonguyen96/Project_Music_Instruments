package com.codegym.project.service;

import com.codegym.project.model.Employee;
import javassist.NotFoundException;

import java.util.List;

public interface EmployeeService extends BaseService<Employee> {
    List<Employee> findAllEmsDelete();
    Employee findEmDeleteById(long id);
    boolean deleteEm(long id);
    boolean undoEm(long id);

    void updateResetPasswordToken(String token, String email) throws NotFoundException;

    Employee getByResetPasswordToken(String token);

    void updatePassword(Employee employee, String password);
    Employee findByUserName(String name);
}
