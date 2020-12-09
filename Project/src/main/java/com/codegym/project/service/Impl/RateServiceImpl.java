package com.codegym.project.service.Impl;

import com.codegym.project.model.Rate;
import com.codegym.project.repository.RateRepository;
import com.codegym.project.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
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
        return rateRepository.save(rate);
    }

    @Override
    public boolean delete(long id) throws SQLException {
        Rate rate=this.findById(id);
        if (rate==null){
            return false;
        }
        rate.setDelete(true);
        rate.setDateDelete(new Date());
        rateRepository.save(rate);
        return true;
    }
}
