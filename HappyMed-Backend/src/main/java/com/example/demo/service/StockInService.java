package com.example.demo.service;

import com.example.demo.entity.StockIn;
import com.example.demo.repository.StockInRepository;
import org.springframework.stereotype.Service;

@Service
public class StockInService {

    private final StockInRepository stockInRepository;
    private final InventoryService inventoryService;

    public StockInService(StockInRepository stockInRepository,
                          InventoryService inventoryService){

        this.stockInRepository = stockInRepository;
        this.inventoryService = inventoryService;
    }

    public StockIn receiveStock(StockIn stockIn){

        StockIn saved = stockInRepository.save(stockIn);

        inventoryService.increaseStock(
                stockIn.getMedicineId(),
                stockIn.getQuantity()
        );

        return saved;
    }
}