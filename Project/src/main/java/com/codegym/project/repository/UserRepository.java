package com.codegym.project.repository;

import com.codegym.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(
            value = "SELECT * FROM users u WHERE u.delete = true",
            nativeQuery = true)
    List<User> findAllUserDeleted();
    @Query(
            value = "select * from users where id =?1",
            nativeQuery = true)
    User findUserById(long id);
    User findByUserName(String name);
}
