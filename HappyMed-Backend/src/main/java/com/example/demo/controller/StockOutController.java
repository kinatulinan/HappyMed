package com.example.demo.controller;

import com.example.demo.entity.StockOut;
import com.example.demo.service.StockOutService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stockout")
@CrossOrigin
public class StockOutController {

    private final StockOutService service;

    public StockOutController(StockOutService service){
        this.service = service;
    }

    @PostMapping
    public StockOut dispense(@RequestBody StockOut stockOut){
        return service.dispenseMedicine(stockOut);
    }
}