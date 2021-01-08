package com.codegym.project.service.Impl;

import com.codegym.project.model.Rate;
import com.codegym.project.repository.RateRepository;
import com.codegym.project.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
@Service
public class RateServiceImpl implements RateService {
    @Autowired
    RateRepository rateRepository;
    @Override
    public List<Rate> findAll() {
        return rateRepository.findAll();
    }

    @Override
    public Rate findById(long id) throws SQLException {
        return rateRepository.findById(id).orElse(null);
    }

    @Override
    public Rate save(Rate rate) throws SQLException {
        if (rate.getId()!=null){
            rate.setStatus("Đã đọc");
            return rateRepository.save(rate);
        }
        return rateRepository.save(rate);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Rate rate=this.findById(id);
        if (rate==null){
            return false;
        }
        rate.setDelete(true);
        rate.setDateDelete(LocalDateTime.now());
        rateRepository.save(rate);
        return true;
    }

//Rate deleted
    @Override
    public List<Rate> findAllRatesDeleted() {
        return rateRepository.findAllRateDeleted();
    }

    @Override
    public Rate findRateDeleted(long id) {
        Rate rate=null;
        rate=rateRepository.findRateDeleted(id);
        return rate;
    }

    @Override
    public boolean deleteRate(long id) {
        Rate rate=this.findRateDeleted(id);
        if (rate!=null){
            rateRepository.delete(rate);
            return true;
        }
        return false;
    }

    @Override
    public List<Rate> findByStatus() {
        return rateRepository.findByStatus();
    }
}
