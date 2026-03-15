package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name="reorder_monitoring")
public class ReorderMonitoring {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reorderId;

    private Long medicineId;

    private Integer currentStock;

    private Integer reorderLevel;

    private String status;

    public Long getReorderId(){ return reorderId; }

    public Long getMedicineId(){ return medicineId; }
    public void setMedicineId(Long medicineId){ this.medicineId = medicineId; }

    public Integer getCurrentStock(){ return currentStock; }
    public void setCurrentStock(Integer currentStock){ this.currentStock = currentStock; }

    public Integer getReorderLevel(){ return reorderLevel; }
    public void setReorderLevel(Integer reorderLevel){ this.reorderLevel = reorderLevel; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status = status; }
}