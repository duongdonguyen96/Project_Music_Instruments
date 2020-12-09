package com.codegym.project.service.Impl;

import com.codegym.project.model.Product;
import com.codegym.project.repository.ProductRepository;
import com.codegym.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(long id) {
        return  productRepository.findById(id).orElse(null);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public boolean delete(long id) {
        Product product=this.findById(id);
        if (product==null){
            return false;
        }
        product.setDateDelete(new Date());
        product.setDelete(true);
        productRepository.save(product);
        return true;
    }

//product deleted
//
//    @Override
//    public List<Product> findAllProductDeleted() {
//        return productRepository.findAllProductDeleted();
//    }
//
//    @Override
//    public Product findProductDeleted(long id) {
//        Product product=null;
//        product=productRepository.findProductDeleted(id);
//        return product;
//    }
//
//    @Override
//    public boolean deleteProduct(long id) {
//        Product product=this.findProductDeleted(id);
//        if (product!=null){
//            productRepository.delete(product);
//            return true;
//        }
//        return false;
//    }
//
//    @Override
//    public boolean undoProduct(long id) {
//        Product product=this.findProductDeleted(id);
//        if (product!=null){
//            product.setDelete(false);
//            product.setDateUpdate(new Date());
//            productRepository.save(product);
//            return true;
//        }
//        return false;
//    }

}
