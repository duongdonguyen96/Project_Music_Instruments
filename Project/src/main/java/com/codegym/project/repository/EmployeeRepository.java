package com.codegym.project.repository;

import com.codegym.project.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query(value = "SELECT * FROM employees u WHERE u.delete = true", nativeQuery = true)
    List<Employee> findAllEmployeeDeleted();

    @Query(value = "select * from employees where id =?1", nativeQuery = true)
    Employee findEmployeeById(long id);

    @Query(value="SELECT * FROM employees  WHERE email = ?1", nativeQuery = true)
     Employee findByEmail(String email);

     Employee findByResetPasswordToken(String token);


    boolean findEmployeeByUserName(String userName);
    Employee findByUserName(String name);
}

