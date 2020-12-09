package com.codegym.project.service.Impl;

import com.codegym.project.model.Banner;
import com.codegym.project.repository.BannerRepository;
import com.codegym.project.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Date;
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
        banner.setDelete(true);
        banner.setDateDelete(new Date());
        bannerRepository.save(banner);
        return true;
    }
}
