package com.codegym.project.repository;

import com.codegym.project.model.Product;
import com.codegym.project.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    @Query(
            value = "SELECT * FROM vendors u WHERE u.delete = true",
            nativeQuery = true)
    List<Vendor> findAllVendorsDeleted();
    @Query(
            value = "select * from vendors where id =?1",
            nativeQuery = true)
    Vendor findVendorDeleted(long id);
    @Query(
            value = "select * from vendors where phone=?1 or email=?2 or name=?3",
            nativeQuery = true)
    List<Vendor> findAllVendorsByPhoneEmail( String phone,String email,String name);

}
