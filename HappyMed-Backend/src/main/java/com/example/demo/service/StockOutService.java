package com.example.demo.service;

import com.example.demo.entity.StockOut;
import com.example.demo.repository.StockOutRepository;
import org.springframework.stereotype.Service;

@Service
public class StockOutService {

    private final StockOutRepository stockOutRepository;
    private final InventoryService inventoryService;

    public StockOutService(StockOutRepository stockOutRepository,
                           InventoryService inventoryService){

        this.stockOutRepository = stockOutRepository;
        this.inventoryService = inventoryService;
    }

    public StockOut dispenseMedicine(StockOut stockOut){

        StockOut saved = stockOutRepository.save(stockOut);

        inventoryService.decreaseStock(
                stockOut.getMedicineId(),
                stockOut.getQuantitySold()
        );

        return saved;
    }
}