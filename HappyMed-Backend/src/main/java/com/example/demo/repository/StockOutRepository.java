package com.example.demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.StockOut;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface StockOutRepository extends JpaRepository<StockOut, Long> {

    List<StockOut> findByDateDispensedBetween(LocalDate startDate, LocalDate endDate);
}