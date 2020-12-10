package com.codegym.project.repository;

import com.codegym.project.model.Rate;
import com.codegym.project.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RateRepository extends JpaRepository<Rate, Long> {
    @Query(
            value = "SELECT * FROM rates u WHERE u.delete = true",
            nativeQuery = true)
    List<Rate> findAllRateDeleted();
    @Query(
            value = "select * from rates where id =?1",
            nativeQuery = true)
    Rate findRateDeleted(long id);

    @Query(
            value = "select * from rates where status ='Chưa đọc'",
            nativeQuery = true)
    List<Rate> findByStatus();
}
