package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.example.demo.repository.MedicineRepository;
import com.example.demo.entity.MedicineEntity;
@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    public List<MedicineEntity> getAllMedicines() {
        return medicineRepository.findAll();
    }

    public MedicineEntity saveMedicine(MedicineEntity medicine) {
        return medicineRepository.save(medicine);
    }
}