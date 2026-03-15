package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name="inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryId;

    private Long medicineId;

    private Integer totalStock;

    private String lastUpdated;

    public Long getInventoryId(){ return inventoryId; }

    public Long getMedicineId(){ return medicineId; }
    public void setMedicineId(Long medicineId){ this.medicineId = medicineId; }

    public Integer getTotalStock(){ return totalStock; }
    public void setTotalStock(Integer totalStock){ this.totalStock = totalStock; }

    public String getLastUpdated(){ return lastUpdated; }
    public void setLastUpdated(String lastUpdated){ this.lastUpdated = lastUpdated; }
}