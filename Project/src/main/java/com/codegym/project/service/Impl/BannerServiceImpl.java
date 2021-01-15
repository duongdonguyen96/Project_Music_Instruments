package com.codegym.project.service.Impl;

import com.codegym.project.model.Banner;
import com.codegym.project.repository.BannerRepository;
import com.codegym.project.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class BannerServiceImpl implements BannerService {
    @Autowired
    public BannerRepository bannerRepository;
    @Override
    public List<Banner> findAll() {
        return bannerRepository.findAll();
    }

    @Override
    public Banner findById(long id) throws SQLException {
        return bannerRepository.findById(id).orElse(null);
    }

    @Override
    public Banner save(Banner element) throws SQLException {

        return bannerRepository.save(element);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Banner banner = this.findById(id);
        if(banner == null){
            return false;
        }

        banner.setDateDelete(LocalDateTime.now());
        banner.setDelete(true);
        bannerRepository.save(banner);
        return true;
    }


    @Override
    public List<Banner> findAllBannerDeleted() {
        return bannerRepository.findAllBannerDeleted();
    }

    @Override
    public Banner findBannerDeleted(long id) {
        Banner banner = null;
        banner = bannerRepository.findBannerDeleted(id);
        return banner;
    }

    @Override
    public boolean deleteBanner(long id) {
        Banner banner = this.findBannerDeleted(id);
        if (banner != null){
            bannerRepository.delete(banner);
            return true;
        }
        return false;
    }

    @Override
    public boolean undoBanner(long id) {
        Banner banner = this.findBannerDeleted(id);
        if (banner != null){
            banner.setDelete(false);
            bannerRepository.save(banner);
            return true;
        }
        return false;
    }

}
