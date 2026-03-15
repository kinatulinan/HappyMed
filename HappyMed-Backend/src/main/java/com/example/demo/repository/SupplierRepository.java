package com.example.demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Supplier;
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    
}