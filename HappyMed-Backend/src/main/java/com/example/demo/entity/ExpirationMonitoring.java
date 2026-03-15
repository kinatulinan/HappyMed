package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="expiration_monitoring")
public class ExpirationMonitoring {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expirationId;

    private Long medicineId;

    private String batchNumber;

    private LocalDate expirationDate;

    private Integer quantityRemaining;

    private String status;

    public Long getExpirationId(){ return expirationId; }

    public Long getMedicineId(){ return medicineId; }
    public void setMedicineId(Long medicineId){ this.medicineId = medicineId; }

    public String getBatchNumber(){ return batchNumber; }
    public void setBatchNumber(String batchNumber){ this.batchNumber = batchNumber; }

    public LocalDate getExpirationDate(){ return expirationDate; }
    public void setExpirationDate(LocalDate expirationDate){ this.expirationDate = expirationDate; }

    public Integer getQuantityRemaining(){ return quantityRemaining; }
    public void setQuantityRemaining(Integer quantityRemaining){ this.quantityRemaining = quantityRemaining; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status = status; }
}