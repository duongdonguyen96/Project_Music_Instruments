package com.codegym.project.repository;

import com.codegym.project.model.Order;
import com.codegym.project.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(
            value = "SELECT * FROM orders u WHERE u.delete = true",
            nativeQuery = true)
    List<Order> findByDeleted();
    @Query(
            value = "select* from orders where delete=true and id=?1",
            nativeQuery = true)
    Order findOrderDeletedById(Long id);

}
