package com.codegym.project.service.Impl;

import com.codegym.project.model.User;
import com.codegym.project.repository.UserRepository;
import com.codegym.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(long id) throws SQLException {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User save(User element) throws SQLException {
        return userRepository.save(element);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        User user = this.findById(id);
        if (user == null) {
            return false;
        }
        userRepository.delete(user);
        return true;
    }
}
