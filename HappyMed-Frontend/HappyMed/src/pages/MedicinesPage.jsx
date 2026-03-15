import { useEffect, useState } from "react";
import { getMedicines } from "../services/medicineService";

import MedicineForm from "../components/MedicineForm";
import MedicineTable from "../components/MedicineTable";

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [editingMedicine, setEditingMedicine] = useState(null);

  const load = async () => {
    try {
      const data = await getMedicines();
      setMedicines(data || []);
    } catch (err) {
      console.error("Failed to load medicines", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="hm-page">
      <div className="hm-page-header">
        <h2>Medicines Management</h2>
        <p>Add new medicines or manage your current inventory.</p>
      </div>

      <MedicineForm 
        reload={load} 
        editingMedicine={editingMedicine} 
        setEditingMedicine={setEditingMedicine} 
      />

      <MedicineTable 
        medicines={medicines} 
        reload={load} 
        setEditingMedicine={setEditingMedicine}
      />
    </div>
  );
}
