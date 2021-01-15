package com.codegym.project.controller.api;

import com.codegym.project.model.Order;
import com.codegym.project.model.OrderDetail;
import com.codegym.project.model.Product;
import com.codegym.project.model.User;
import com.codegym.project.service.OrderDetailService;
import com.codegym.project.service.OrderService;
import com.codegym.project.service.ProductService;
import com.codegym.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ApiAddToCardController {

    @Autowired
    ProductService productService;
    @Autowired
    OrderDetailService orderDetailService;
    @Autowired
    OrderService orderService;
    @Autowired
    UserService userService;

    @GetMapping(value = "/addCart/{id}")
    public ResponseEntity<Order> add(@PathVariable Long id, HttpServletRequest request,Principal principal) throws SQLException {
        long sl=1;
        Product product=productService.findById(id);
        HttpSession session=request.getSession();
        if (product!=null){
            if (session.getAttribute("order")==null){
                Order order=new Order();

                List<OrderDetail> orderDetailList=new ArrayList<OrderDetail>();

                OrderDetail orderDetail=new OrderDetail();
                orderDetail.setPrice(product.getPrice());
                orderDetail.setQuantity(sl);
                orderDetail.setProduct(product);

                orderDetail=orderDetailService.save(orderDetail);

                orderDetailList.add(orderDetail);
                order.setOrderDetailList(orderDetailList);
                session.setAttribute("order",order);
            }else {
                Order order=(Order) session.getAttribute("order");
                List<OrderDetail> orderDetailList=order.getOrderDetailList();
                boolean check=false;
                for (OrderDetail orderDetail:orderDetailList){
                    if (orderDetail.getProduct().getId()==product.getId()){
                        orderDetail.setQuantity(orderDetail.getQuantity()+sl);
                        orderDetailService.save(orderDetail);
                        check=true;
                    }
                }
                if (check==false){
                    OrderDetail orderDetail=new OrderDetail();

                    orderDetail.setPrice(product.getPrice());
                    orderDetail.setQuantity(sl);
                    orderDetail.setProduct(product);

                    orderDetail=orderDetailService.save(orderDetail);

                    orderDetailList.add(orderDetail);
                }
                session.setAttribute("order",order);
            }
        }
        Order order=(Order) session.getAttribute("order");
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }

    @GetMapping(value = "/showCart/")
    public ResponseEntity<Order> show(HttpServletRequest request) throws SQLException {
        HttpSession session=request.getSession();
        Order order=(Order) session.getAttribute("order");
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }

    @GetMapping(value = "/deleteProduct/{id}")
    public ResponseEntity<Order> delete(@PathVariable Long id, HttpServletRequest request) throws SQLException {
        HttpSession session=request.getSession();
        Order order=(Order) session.getAttribute("order");
        List<OrderDetail> orderDetailList=order.getOrderDetailList();
        for (OrderDetail item:orderDetailList){
            if (item.getProduct().getId()==id){
                orderDetailList.remove(item);
                orderDetailService.delete(item.getId());
                break;
            }
        }
        order.setOrderDetailList(orderDetailList);
        session.setAttribute("order",order);
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }

    @GetMapping(value = "/deleteALlProduct/")
    public ResponseEntity<Order> deleteAll( HttpServletRequest request) throws SQLException {
        HttpSession session=request.getSession();
        Order order=(Order) session.getAttribute("order");
        List<OrderDetail> orderDetailList=order.getOrderDetailList();
        orderDetailList=new ArrayList<>();
        order.setOrderDetailList(orderDetailList);
        session.setAttribute("order",order);
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }

    @GetMapping(value = "/checkoutCart/")
    public ResponseEntity<Order> checkout(HttpServletRequest request, Principal principal) throws SQLException {
        HttpSession session=request.getSession();
        String userName=principal.getName();
        User user=userService.findByUserName(userName);
        Order order=(Order) session.getAttribute("order");
        if (order==null){
            order=new Order();
            List<OrderDetail> orderDetailList=new ArrayList<>();
            order.setOrderDetailList(orderDetailList);
            session.setAttribute("order",order);
            return new ResponseEntity<Order>(order, HttpStatus.OK);
        }else {
            List<OrderDetail> orderDetailList=order.getOrderDetailList();
            if (orderDetailList.size()==0){
                return new ResponseEntity<Order>(order, HttpStatus.OK);
            }else {
                order.setUser(user);
                orderService.save(order);
                order=new Order();
                orderDetailList=new ArrayList<>();
                order.setOrderDetailList(orderDetailList);
                session.setAttribute("order",order);
            }
        }
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }


}
