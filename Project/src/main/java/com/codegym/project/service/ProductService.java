package com.codegym.project.service;

import com.codegym.project.model.Product;
import com.codegym.project.model.TypeProduct;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductService extends BaseService<Product> {
     List<Product> findAllProductDeleted();
     Product findProductDeleted(long id);
     boolean deleteProduct(long id);
     boolean undoProduct(long id);
     List<Product> findAllProductsByName(String name);
}
