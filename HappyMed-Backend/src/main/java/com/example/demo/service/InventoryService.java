package com.example.demo.service;

import com.example.demo.entity.Inventory;
import com.example.demo.repository.InventoryRepository;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository){
        this.inventoryRepository = inventoryRepository;
    }

    public void increaseStock(Long medicineId, Integer qty){

        Inventory inventory = inventoryRepository
                .findByMedicineId(medicineId)
                .orElse(new Inventory());

        inventory.setMedicineId(medicineId);
        inventory.setTotalStock(inventory.getTotalStock() == null ?
                qty : inventory.getTotalStock() + qty);

        inventoryRepository.save(inventory);
    }

    public void decreaseStock(Long medicineId, Integer qty){

        Inventory inventory = inventoryRepository
                .findByMedicineId(medicineId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        inventory.setTotalStock(inventory.getTotalStock() - qty);

        inventoryRepository.save(inventory);
    }
}