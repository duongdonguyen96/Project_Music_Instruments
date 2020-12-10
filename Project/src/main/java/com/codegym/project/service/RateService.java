package com.codegym.project.service;

import com.codegym.project.model.Rate;
import com.codegym.project.model.Vendor;

import java.util.List;

public interface RateService extends BaseService<Rate> {
    List<Rate> findAllRatesDeleted();
    Rate findRateDeleted(long id);
    boolean deleteRate(long id);
    List<Rate> findByStatus();
}
