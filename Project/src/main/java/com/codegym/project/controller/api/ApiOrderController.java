package com.codegym.project.controller.api;

import com.codegym.project.model.Order;
import com.codegym.project.model.Product;
import com.codegym.project.service.OrderService;
import com.codegym.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ApiOrderController {
    @Autowired
    OrderService orderService;

    @GetMapping(value = "/orders/")
    public ResponseEntity<List<Order>> listOrders() {
        List<Order> orderList =orderService.findAll();
        return new ResponseEntity<List<Order>>(orderList, HttpStatus.OK);
    }

    @RequestMapping(value = "/orders/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order> findById(@PathVariable("id") Long id) {
        try{
            Order order = orderService.findById(id);
            return new ResponseEntity<Order>(order, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Order>(HttpStatus.NO_CONTENT);
        }
    }

    @RequestMapping(value = "/ship/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Order> ships(@PathVariable("id") Long id) throws SQLException {
        Order order = orderService.findById(id);
        if (order.getStatus().equals("pending")){
            order.setStatus("processed");
        }else if (order.getStatus().equals("processed")){
                order.setStatus("shipped");
        }else if (order.getStatus().equals("shipped")){
            order.setStatus("success");
        }
        order=orderService.save(order);
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }

    @RequestMapping(value = "/orders/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean delete(@PathVariable("id") Long id) {
        boolean isOrder=false;
        try {
            isOrder= orderService.delete(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return isOrder;
    }

    @GetMapping(value = "/ordersDelete/")
    public ResponseEntity<List<Order>> listOrderDelete() {
        List<Order> orderList =orderService.findByDeleted();
        return new ResponseEntity<List<Order>>(orderList, HttpStatus.OK);
    }

    @GetMapping(value = "/ordersDelete/{id}")
    public ResponseEntity<Order> orderDeletedById(@PathVariable Long id) throws SQLException {
        Order order=orderService.findOrderDeletedById(id);
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }

    @GetMapping(value = "/undo/{id}")
    public ResponseEntity<Order> undo(@PathVariable Long id) throws SQLException {
        Order order=orderService.undo(id);
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }

}
