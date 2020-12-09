package com.codegym.project.service.Impl;

import com.codegym.project.model.Product;
import com.codegym.project.model.TypeProduct;
import com.codegym.project.repository.ProductRepository;
import com.codegym.project.repository.TypeProductRepository;
import com.codegym.project.service.TypeProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Service
public class TypeProductServiceImpl implements TypeProductService {
    @Autowired
    TypeProductRepository typeProductRepository;
    @Autowired
    ProductRepository productRepository;
    @Override
    public List<TypeProduct> findAll() {
        return typeProductRepository.findAll();
    }

    @Override
    public TypeProduct findById(long id) throws SQLException {
        return typeProductRepository.findById(id).orElse(null);
    }

    @Override
    public TypeProduct save(TypeProduct typeProduct) throws SQLException {
        return typeProductRepository.save(typeProduct);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        TypeProduct typeProduct=this.findById(id);
        if (typeProduct==null){
            return false;
        }
        typeProduct.setDelete(true);
        typeProduct.setDateDelete(new Date());
        typeProductRepository.save(typeProduct);
        List<Product> productList=productRepository.findAll();
        for (Product product:productList) {
            if (product.getTypeProduct().isDelete()){
                product.setDelete(true);
                product.setDateDelete(new Date());
                productRepository.save(product);
            }
        }
        return true;
    }

//    type deleted
    @Override
    public List<TypeProduct> findAllTypeProductsDeleted() {
        return typeProductRepository.findAllTypeProductsDeleted();
    }

    @Override
    public TypeProduct findTypeProductDeleted(long id) {
        TypeProduct typeProduct=null;
        typeProduct=typeProductRepository.findTypeProductsDeleted(id);
        return typeProduct;
    }

    @Override
    public boolean deleteTypeProduct(long id) {
        TypeProduct typeProduct=this.findTypeProductDeleted(id);
        if (typeProduct!=null){
            typeProductRepository.delete(typeProduct);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoTypeProduct(long id) {
        TypeProduct typeProduct=this.findTypeProductDeleted(id);
        if (typeProduct!=null){
            typeProduct.setDelete(false);
            typeProduct.setDateUpdate(new Date());
            typeProductRepository.save(typeProduct);
            return true;
        }
        return false;
    }
}
