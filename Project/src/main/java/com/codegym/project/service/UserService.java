package com.codegym.project.service;

import com.codegym.project.model.User;

import java.util.List;

public interface UserService extends BaseService<User> {
    List<User> findAllUsersDelete();
    User findUserDeleteById(long id);
    boolean deleteUser(long id);
    boolean undoUser(long id);
    User findByUserName(String name);
}
