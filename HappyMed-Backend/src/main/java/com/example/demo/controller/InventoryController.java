package com.example.demo.controller;

import com.example.demo.entity.Inventory;
import com.example.demo.repository.InventoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin
public class InventoryController {

    private final InventoryRepository repository;

    public InventoryController(InventoryRepository repository){
        this.repository = repository;
    }

    @GetMapping
    public List<Inventory> getAll(){
        return repository.findAll();
    }
}