package com.codegym.project.repository;

import com.codegym.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProductRepository extends JpaRepository<Product, Long> {
//    @Query(
//            value = "SELECT products.id,products.amount,products.color,products.date_delete,products.date_add,products.date_update,products.delete,products.description,products.image,products.name,products.price,products.size,products.weight,products.vendor_id,products.type_product_id\n" +
//                    "FROM products\n" +
//                    "Left JOIN vendors ON vendors.delete=false\n" +
//                    "Left JOIN type_product ON type_product.delete=false\n" +
//                    "Where products.delete=true",
//            nativeQuery = true)
//    List<Product> findAllProductDeleted();
//    @Query(
//            value = "select * from products where id =?1",
//            nativeQuery = true)
//    Product findProductDeleted(long id);
}
