package com.codegym.project.repository;

import com.codegym.project.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(
            value ="select products.id,products.amount,products.color,products.date_add,products.date_delete,products.date_update,products.delete,products.description,products.image,products.name,products.price,products.size,products.weight,products.type_product_id,products.vendor_id \n" +
                    "FROM products, vendors,type_product\n" +
                    "WHERE products.delete=true\n" +
                    "and vendors.delete=false\n" +
                    "and type_product.delete=false\n" +
                    "and products.type_product_id=type_product.id\n" +
                    "and products.vendor_id=vendors.id",
            nativeQuery = true)
    List<Product> findAllProductDeleted();

    @Query(
            value = "select * from products where id =?1",
            nativeQuery = true)
    Product findProductDeleted(long id);
    @Query(
            value = "select * from products where name =?1",
            nativeQuery = true)
    List<Product> findAllProductsByName(String name);

//Hỗ trợ cho type_product
    @Query(
            value = "select DISTINCT type_product_id from products where delete=false",
            nativeQuery = true)
    List<Long> listIdTypeProduct();

//Hỗ trợ cho vendors
    @Query(
            value = "select DISTINCT vendor_id from products where delete=false",
            nativeQuery = true)
    List<Long> listIdVendor();

//
    List<Product> findAllByTypeProductId(Long id);
    List<Product> findAllByVendorId(Long id);

    @Query(
            value = "select * from products where delete=false ORDER by date_add desc limit 4",
            nativeQuery = true)
    List<Product> listFourNewProducts();

    Page<Product> findAllByTypeProductIdAndNameContaining(Long id,Pageable pageable,String name);

    Page<Product> findAllByVendorIdAndNameContaining(Long id,Pageable pageable,String name);
}


