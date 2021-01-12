package com.codegym.project.service.Impl;

import com.codegym.project.model.Product;
import com.codegym.project.model.TypeProduct;
import com.codegym.project.model.Vendor;
import com.codegym.project.repository.ProductRepository;
import com.codegym.project.repository.VendorRepository;
import com.codegym.project.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

@Service
public class VendorServiceImpl implements VendorService {
    @Autowired
    VendorRepository vendorRepository;
    @Autowired
    ProductRepository productRepository;
    @Override
    public List<Vendor> findAll() {
        return vendorRepository.findAll();
    }

    @Override
    public Vendor findById(long id) throws SQLException {
        return vendorRepository.findById(id).orElse(null);
    }

    @Override
    public Vendor save(Vendor vendor) throws SQLException {
        if (vendor.getId()!=null){
            vendor.setDateUpdate(LocalDateTime.now());
            vendorRepository.save(vendor);
        }
        return vendorRepository.save(vendor);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Vendor vendor=this.findById(id);
        if (vendor==null){
            return false;
        }
        vendor.setDelete(true);
        vendor.setDateDelete(LocalDateTime.now());
        vendorRepository.save(vendor);
        List<Product> productList=productRepository.findAll();
        for (Product product:productList) {
            if (product.getVendor().isDelete()){
                product.setDelete(true);
                product.setDateDelete(LocalDateTime.now());
                productRepository.save(product);
            }
        }
        return true;
    }


// vendor deleted

    @Override
    public List<Vendor> findAllVendorsDeleted() {
        return vendorRepository.findAllVendorsDeleted();
    }

    @Override
    public Vendor findVendorDeleted(long id) {
        Vendor vendor=null;
        vendor=vendorRepository.findVendorDeleted(id);
        return vendor;
    }


    @Override
    public boolean deleteVendor(long id) {
        Vendor vendor=this.findVendorDeleted(id);
        if (vendor!=null){
            vendorRepository.delete(vendor);
//            chu y lien quan thang product
            return true;
        }
        return false;
    }

    @Override
    public boolean undoVendor(long id) {
        Vendor vendor=this.findVendorDeleted(id);
        if (vendor!=null){
            vendor.setDelete(false);
            vendorRepository.save(vendor);
//            chu y lien quan thang product
            return true;
        }
        return false;
    }

//validate
    @Override
    public List<Vendor> findAllVendorsByPhoneEmail(String phone, String email,String name) {
        return vendorRepository.findAllVendorsByPhoneEmail(phone,email,name);
    }

    @Override
    public List<Vendor> listVendorsById() {
        List<Long> listId=productRepository.listIdVendor();
        List<Vendor> list = vendorRepository.findAllById(listId);
        return list;
    }


}
