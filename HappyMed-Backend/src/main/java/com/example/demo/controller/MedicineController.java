package com.example.demo.controller;

import com.example.demo.entity.MedicineEntity;
import com.example.demo.service.MedicineService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public List<MedicineEntity> getMedicines() {
        return medicineService.getAllMedicines();
    }

    @PostMapping
    public MedicineEntity addMedicine(@RequestBody MedicineEntity medicine) {
        return medicineService.saveMedicine(medicine);
    }
}