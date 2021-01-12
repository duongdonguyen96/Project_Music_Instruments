package com.codegym.project.repository;

import com.codegym.project.model.Product;
import com.codegym.project.model.TypeProduct;
import com.codegym.project.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface TypeProductRepository extends JpaRepository<TypeProduct, Long> {
    @Query(
            value = "SELECT * FROM type_product u WHERE u.delete = true",
            nativeQuery = true)
    List<TypeProduct> findAllTypeProductsDeleted();
    @Query(
            value = "select * from type_product where id =?1",
            nativeQuery = true)
    TypeProduct findTypeProductsDeleted(long id);

    @Query(
            value = "select * from type_product where name =?1",
            nativeQuery = true)
    List<TypeProduct> findAllTypeProductsByName( String name);
}
