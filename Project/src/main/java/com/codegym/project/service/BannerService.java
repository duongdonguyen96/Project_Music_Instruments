package com.codegym.project.service;

import com.codegym.project.model.Banner;

import java.util.List;

public interface BannerService extends BaseService<Banner> {
    List<Banner> findAllBannerDeleted();

    Banner findBannerDeleted(long id);

    boolean deleteBanner(long id);

    boolean undoBanner(long id);
}
