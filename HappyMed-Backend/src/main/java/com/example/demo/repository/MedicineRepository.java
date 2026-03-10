package com.example.demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.MedicineEntity;

@Repository
public interface MedicineRepository extends JpaRepository<MedicineEntity, Long> {

}