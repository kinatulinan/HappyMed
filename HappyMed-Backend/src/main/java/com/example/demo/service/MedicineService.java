package com.example.demo.service;



import com.example.demo.entity.Inventory;
import com.example.demo.entity.Medicine;
import com.example.demo.repository.InventoryRepository;
import com.example.demo.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final InventoryRepository inventoryRepository;

    public MedicineService(MedicineRepository medicineRepository, InventoryRepository inventoryRepository){
        this.medicineRepository = medicineRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public List<Medicine> getAllMedicines(){
        List<Medicine> medicines = medicineRepository.findAll();
        for (Medicine m : medicines) {
            Integer stock = inventoryRepository.findByMedicineId(m.getId())
                    .map(Inventory::getTotalStock)
                    .orElse(0);
            m.setStockQuantity(stock);
        }
        return medicines;
    }

    public Medicine getMedicineById(Long id){
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
                
        Integer stock = inventoryRepository.findByMedicineId(medicine.getId())
                .map(Inventory::getTotalStock)
                .orElse(0);
        medicine.setStockQuantity(stock);
        
        return medicine;
    }

    public Medicine createMedicine(Medicine medicine){
        Medicine saved = medicineRepository.save(medicine);
        if (medicine.getStockQuantity() != null && medicine.getStockQuantity() > 0) {
            Inventory inventory = new Inventory();
            inventory.setMedicineId(saved.getId());
            inventory.setTotalStock(medicine.getStockQuantity());
            inventoryRepository.save(inventory);
        }
        return saved;
    }

    public Medicine updateMedicine(Long id, Medicine updated){

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        medicine.setItemName(updated.getItemName());
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