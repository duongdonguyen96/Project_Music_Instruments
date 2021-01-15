package com.codegym.project.service.Impl;

import com.codegym.project.model.User;
import com.codegym.project.repository.UserRepository;
import com.codegym.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
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
    public User save(User user) throws SQLException {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        User em = this.findById(id);
        if (em == null) {
            return false;
        }
        em.setDelete(true);
        em.setDateDelete(LocalDateTime.now());
        userRepository.save(em);
        return true;
    }

    //    user deleted
    public List<User> findAllUsersDelete() {
        return userRepository.findAllUserDeleted();
    }



    @Override
    public User findUserDeleteById(long id) {
        User em = null;
        em = userRepository.findUserById(id);
        return em;
    }



    @Override
    public boolean deleteUser(long id) {
        User em = this.findUserDeleteById(id);
        if (em != null) {
            userRepository.delete(em);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoUser(long id) {
        User em = this.findUserDeleteById(id);
        if (em != null) {
            em.setDelete(false);
            userRepository.save(em);
            return true;
        }
        return false;
    }

    @Override
    public User findByUserName(String name) {
        return userRepository.findByUserName(name);
    }
}