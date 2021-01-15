package com.codegym.project.service;

import com.codegym.project.model.Product;
import com.codegym.project.model.TypeProduct;
import com.codegym.project.model.Vendor;

import java.util.List;

public interface VendorService extends BaseService<Vendor> {
    List<Vendor> findAllVendorsDeleted();
    Vendor findVendorDeleted(long id);
    boolean deleteVendor(long id);
    boolean undoVendor(long id);
    List<Vendor> findAllVendorsByPhoneEmail(String phone,String email,String name);
    List<Vendor> listVendorsById();
}
