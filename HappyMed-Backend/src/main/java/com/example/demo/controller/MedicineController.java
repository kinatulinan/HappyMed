package com.example.demo.controller;

import com.example.demo.debug.DebugLogger;
import com.example.demo.entity.Medicine;
import com.example.demo.service.MedicineService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService){
        this.medicineService = medicineService;
    }

    @GetMapping
    public List<Medicine> getAll(){
        // #region agent log
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String principal = auth != null ? String.valueOf(auth.getPrincipal()) : "null";
        String name = auth != null ? auth.getName() : "null";
        DebugLogger.log(
                "H3",
                "pre-fix",
                "MedicineController.getAll",
                "getAll invoked",
                "authName=" + name + ",principalClass=" + principal
        );
        // #endregion
        return medicineService.getAllMedicines();
    }

    @GetMapping("/{id}")
    public Medicine getById(@PathVariable Long id){
        return medicineService.getMedicineById(id);
    }

    @PostMapping
    public Medicine create(@RequestBody Medicine medicine){
        return medicineService.createMedicine(medicine);
    }

    @PutMapping("/{id}")
    public Medicine update(@PathVariable Long id,
                           @RequestBody Medicine medicine){
        return medicineService.updateMedicine(id, medicine);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        medicineService.deleteMedicine(id);
    }
}