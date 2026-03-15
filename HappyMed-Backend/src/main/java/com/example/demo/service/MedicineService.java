package com.example.demo.service;



import com.example.demo.entity.Medicine;
import com.example.demo.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository){
        this.medicineRepository = medicineRepository;
    }

    public List<Medicine> getAllMedicines(){
        return medicineRepository.findAll();
    }

    public Medicine getMedicineById(Long id){
        return medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
    }

    public Medicine createMedicine(Medicine medicine){
        return medicineRepository.save(medicine);
    }

    public Medicine updateMedicine(Long id, Medicine updated){

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        medicine.setGenericName(updated.getGenericName());
        medicine.setBrandName(updated.getBrandName());
        medicine.setCategory(updated.getCategory());
        medicine.setDosageForm(updated.getDosageForm());
        medicine.setStrength(updated.getStrength());
        medicine.setManufacturer(updated.getManufacturer());
        medicine.setExpiryDate(updated.getExpiryDate());
        medicine.setUnitPrice(updated.getUnitPrice());
        medicine.setSellingPrice(updated.getSellingPrice());
        medicine.setReorderLevel(updated.getReorderLevel());

        return medicineRepository.save(medicine);
    }

    public void deleteMedicine(Long id){
        medicineRepository.deleteById(id);
    }
}