package com.codegym.project.service;

import java.sql.SQLException;
import java.util.List;

public interface BaseService<T> {
    List<T> findAll();
    T findById(long id) throws SQLException;
    T save(T element) throws SQLException;
    boolean delete(long id) throws SQLException;
}
