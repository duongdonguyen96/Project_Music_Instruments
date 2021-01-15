package com.codegym.project.service.Impl;

import com.codegym.project.model.Order;
import com.codegym.project.repository.OrderRepository;
import com.codegym.project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order findById(long id) throws SQLException {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Order save(Order order) throws SQLException {
        return orderRepository.save(order);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Order order=this.findById(id);
        if (order==null){
            return false;
        }
        order.setDelete(true);
        orderRepository.save(order);
        return true;

    }

    @Override
    public List<Order> findByDeleted() {
        return orderRepository.findByDeleted();
    }

    @Override
    public Order findOrderDeletedById(Long id) {
        return orderRepository.findOrderDeletedById(id);
    }

    @Override
    public Order undo(Long id) {
        Order order=this.findOrderDeletedById(id);
        order.setDelete(false);
        return orderRepository.save(order);
    }
}
