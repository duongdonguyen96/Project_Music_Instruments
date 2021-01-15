package com.codegym.project.service.Impl;

import com.codegym.project.model.OrderDetail;
import com.codegym.project.model.Product;
import com.codegym.project.repository.OrderDetailRepository;
import com.codegym.project.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Override
    public List<OrderDetail> findAll() {
        return orderDetailRepository.findAll() ;
    }

    @Override
    public OrderDetail findById(long id) throws SQLException {
        return orderDetailRepository.findById(id).orElse(null);
    }

    @Override
    public OrderDetail save(OrderDetail orderDetail) throws SQLException {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        OrderDetail orderDetail=this.findById(id);
        if (orderDetail==null){
            return false;
        }
        orderDetail.setDelete(true);
        orderDetailRepository.save(orderDetail);
        return true;
    }
}
