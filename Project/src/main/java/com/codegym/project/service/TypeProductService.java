package com.codegym.project.service;

import com.codegym.project.model.Product;
import com.codegym.project.model.TypeProduct;
import com.codegym.project.model.Vendor;

import java.sql.SQLException;
import java.util.List;

public interface TypeProductService extends BaseService<TypeProduct> {
    List<TypeProduct> findAllTypeProductsDeleted();
    TypeProduct findTypeProductDeleted(long id);
    boolean deleteTypeProduct(long id) throws SQLException;
    boolean undoTypeProduct(long id);
    List<TypeProduct> findAllTypeProductsByName(String name);
    List<TypeProduct> listTypeProductsById();
}
