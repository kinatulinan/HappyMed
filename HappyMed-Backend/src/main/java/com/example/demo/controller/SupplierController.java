package com.example.demo.controller;

import com.example.demo.entity.Supplier;
import com.example.demo.service.SupplierService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService){
        this.supplierService = supplierService;
    }

    @GetMapping
    public List<Supplier> getAll(){
        return supplierService.getAllSuppliers();
    }

    @PostMapping
    public Supplier create(@RequestBody Supplier supplier){
        return supplierService.createSupplier(supplier);
    }

    @PutMapping("/{id}")
    public Supplier update(@PathVariable Long id,
                           @RequestBody Supplier supplier){
        return supplierService.updateSupplier(id, supplier);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        supplierService.deleteSupplier(id);
    }
}