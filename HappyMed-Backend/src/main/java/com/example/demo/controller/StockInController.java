package com.example.demo.controller;

import com.example.demo.entity.StockIn;
import com.example.demo.service.StockInService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stockin")
@CrossOrigin
public class StockInController {

    private final StockInService service;

    public StockInController(StockInService service){
        this.service = service;
    }

    @PostMapping
    public StockIn receive(@RequestBody StockIn stockIn){
        return service.receiveStock(stockIn);
    }
}