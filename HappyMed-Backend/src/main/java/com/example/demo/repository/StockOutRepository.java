package com.example.demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.StockOut;
@Repository
public interface StockOutRepository extends JpaRepository<StockOut, Long> {

    
}