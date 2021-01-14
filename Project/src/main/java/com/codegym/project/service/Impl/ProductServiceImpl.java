package com.codegym.project.service.Impl;

import com.codegym.project.model.Product;
import com.codegym.project.repository.ProductRepository;
import com.codegym.project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
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
        if(product.getId()!=null){
            product.setDateUpdate(LocalDateTime.now());
            return productRepository.save(product);
        }
        return productRepository.save(product);
    }

    @Override
    public boolean delete(long id) {
        Product product=this.findById(id);
        if (product==null){
            return false;
        }
        product.setDateDelete(LocalDateTime.now());
        product.setDelete(true);
        productRepository.save(product);
        return true;
    }

//product deleted

    @Override
    public List<Product> findAllProductDeleted() {
        return productRepository.findAllProductDeleted();
    }

    @Override
    public Product findProductDeleted(long id) {
        Product product=null;
        product=productRepository.findProductDeleted(id);
        return product;
    }

    @Override
    public boolean deleteProduct(long id) {
        Product product=this.findProductDeleted(id);
        if (product!=null){
            productRepository.delete(product);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoProduct(long id) {
        Product product=this.findProductDeleted(id);
        if (product!=null){
            product.setDelete(false);
            productRepository.save(product);
            return true;
        }
        return false;
    }
//validate
    @Override
    public List<Product> findAllProductsByName(String name) {
        return productRepository.findAllProductsByName(name);
    }

    //Home
    @Override
    public List<Product> findAllByTypeProductId(Long id) {
        return productRepository.findAllByTypeProductId(id);
    }

    @Override
    public List<Product> findAllByVendorId(Long id) {
        return productRepository.findAllByVendorId(id);
    }

    @Override
    public List<Product> listFourNewProducts() {
        return productRepository.listFourNewProducts();
    }

    @Override
    public Page<Product> findAllByTypeProductIdAndNameContaining(Long id,Pageable pageable,String name) {
        return productRepository.findAllByTypeProductIdAndNameContaining(id,pageable,name);
    }

    @Override
    public Page<Product> findAllByVendorIdAndNameContaining(Long id, Pageable pageable, String name) {
        return productRepository.findAllByVendorIdAndNameContaining(id,pageable,name);
    }
}
