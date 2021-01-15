package com.codegym.project.service;

import com.codegym.project.model.Order;

import java.util.List;

public interface OrderService extends BaseService<Order> {
    List<Order> findByDeleted();
    Order findOrderDeletedById(Long id);
    Order undo(Long id);
}
