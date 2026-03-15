package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="stock_out")
public class StockOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockOutId;

    private Long medicineId;

    private Integer quantitySold;

    private String prescriptionNo;

    private String pharmacist;

    private LocalDate dateDispensed;

    public Long getStockOutId(){ return stockOutId; }

    public Long getMedicineId(){ return medicineId; }
    public void setMedicineId(Long medicineId){ this.medicineId = medicineId; }

    public Integer getQuantitySold(){ return quantitySold; }
    public void setQuantitySold(Integer quantitySold){ this.quantitySold = quantitySold; }

    public String getPrescriptionNo(){ return prescriptionNo; }
    public void setPrescriptionNo(String prescriptionNo){ this.prescriptionNo = prescriptionNo; }

    public String getPharmacist(){ return pharmacist; }
    public void setPharmacist(String pharmacist){ this.pharmacist = pharmacist; }

    public LocalDate getDateDispensed(){ return dateDispensed; }
    public void setDateDispensed(LocalDate dateDispensed){ this.dateDispensed = dateDispensed; }
}