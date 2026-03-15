package com.example.demo.service;

import com.example.demo.entity.Supplier;
import com.example.demo.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository repository;

    public SupplierService(SupplierRepository repository){
        this.repository = repository;
    }

    public List<Supplier> getAllSuppliers(){
        return repository.findAll();
    }

    public Supplier createSupplier(Supplier supplier){
        return repository.save(supplier);
    }

    public Supplier updateSupplier(Long id, Supplier updated){

        Supplier supplier = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        supplier.setSupplierName(updated.getSupplierName());
        supplier.setContactPerson(updated.getContactPerson());
        supplier.setPhone(updated.getPhone());
        supplier.setAddress(updated.getAddress());

        return repository.save(supplier);
    }

    public void deleteSupplier(Long id){
        repository.deleteById(id);
    }
}