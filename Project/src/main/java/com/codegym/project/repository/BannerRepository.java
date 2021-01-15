package com.codegym.project.repository;

import com.codegym.project.model.Banner;
import com.codegym.project.model.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    @Query(
            value = "SELECT * FROM banners u WHERE u.delete = true",
            nativeQuery = true)
    List<Banner> findAllBannerDeleted();

    @Query(
            value = "select * from banners  where id =?1",
            nativeQuery = true)
    Banner findBannerDeleted(long id);
}
