package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="stock_in")
public class StockIn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockInId;

    private Long medicineId;
    private Long supplierId;

    private String batchNumber;

    private Integer quantity;

    private LocalDate expiryDate;

    private LocalDate dateReceived;

    public Long getStockInId(){ return stockInId; }

    public Long getMedicineId(){ return medicineId; }
    public void setMedicineId(Long medicineId){ this.medicineId = medicineId; }

    public Long getSupplierId(){ return supplierId; }
    public void setSupplierId(Long supplierId){ this.supplierId = supplierId; }

    public String getBatchNumber(){ return batchNumber; }
    public void setBatchNumber(String batchNumber){ this.batchNumber = batchNumber; }

    public Integer getQuantity(){ return quantity; }
    public void setQuantity(Integer quantity){ this.quantity = quantity; }

    public LocalDate getExpiryDate(){ return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate){ this.expiryDate = expiryDate; }

    public LocalDate getDateReceived(){ return dateReceived; }
    public void setDateReceived(LocalDate dateReceived){ this.dateReceived = dateReceived; }
}