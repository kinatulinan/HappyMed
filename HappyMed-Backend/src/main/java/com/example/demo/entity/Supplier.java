package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name="suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long supplierId;

    private String supplierName;
    private String contactPerson;
    private String phone;
    private String address;

    public Long getSupplierId(){ return supplierId; }

    public String getSupplierName(){ return supplierName; }
    public void setSupplierName(String supplierName){ this.supplierName = supplierName; }

    public String getContactPerson(){ return contactPerson; }
    public void setContactPerson(String contactPerson){ this.contactPerson = contactPerson; }

    public String getPhone(){ return phone; }
    public void setPhone(String phone){ this.phone = phone; }

    public String getAddress(){ return address; }
    public void setAddress(String address){ this.address = address; }
}
