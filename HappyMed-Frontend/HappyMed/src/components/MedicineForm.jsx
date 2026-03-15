import { useEffect, useState } from "react";
import { createMedicine, updateMedicine } from "../services/medicineService";

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

export default function MedicineForm({ reload, editingMedicine, setEditingMedicine }) {
  const [genericName, setGenericName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [strength, setStrength] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingMedicine) {
      setGenericName(editingMedicine.genericName || "");
      setBrandName(editingMedicine.brandName || "");
      setCategory(editingMedicine.category || "");
      setDosageForm(editingMedicine.dosageForm || "");
      setStrength(editingMedicine.strength || "");
      setManufacturer(editingMedicine.manufacturer || "");
      setExpiryDate(editingMedicine.expiryDate || "");
      setUnitPrice(editingMedicine.unitPrice != null ? String(editingMedicine.unitPrice) : "");
      setSellingPrice(editingMedicine.sellingPrice != null ? String(editingMedicine.sellingPrice) : "");
      setReorderLevel(editingMedicine.reorderLevel != null ? String(editingMedicine.reorderLevel) : "");
    } else {
      resetForm();
    }
  }, [editingMedicine]);

  const resetForm = () => {
    setGenericName("");
    setBrandName("");
    setCategory("");
    setDosageForm("");
    setStrength("");
    setManufacturer("");
    setExpiryDate("");
    setUnitPrice("");
    setSellingPrice("");
    setReorderLevel("");
  };

  const cancelEdit = () => {
    resetForm();
    if (setEditingMedicine) setEditingMedicine(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        genericName,
        brandName,
        category,
        dosageForm,
        strength,
        manufacturer,
        expiryDate: expiryDate || null,
        unitPrice: unitPrice === "" ? null : Number(unitPrice),
        sellingPrice: sellingPrice === "" ? null : Number(sellingPrice),
        reorderLevel: reorderLevel === "" ? null : Number(reorderLevel),
      };

      if (editingMedicine) {
        await updateMedicine(editingMedicine.id, payload);
      } else {
        await createMedicine(payload);
      }

      cancelEdit();
      reload();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hm-card">
      <div className="hm-section-header" style={{ marginBottom: '1.5rem' }}>
        <span className="hm-section-title">
          {editingMedicine ? "Update Medicine" : "Add New Medicine"}
        </span>
      </div>
      
      <form onSubmit={submit}>
        <div className="hm-grid hm-grid-4">
          <div className="hm-form-group">
            <label>Generic Name</label>
            <input
              className="hm-input"
              placeholder="e.g. Paracetamol"
              value={genericName}
              onChange={(e) => setGenericName(e.target.value)}
              required
            />
          </div>

          <div className="hm-form-group">
            <label>Brand Name</label>
            <input
              className="hm-input"
              placeholder="e.g. Biogesic"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>

          <div className="hm-form-group">
            <label>Category</label>
            <input
              className="hm-input"
              placeholder="e.g. Analgesic"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="hm-form-group">
            <label>Dosage Form</label>
            <input
               className="hm-input"
              placeholder="e.g. Tablet"
              value={dosageForm}
              onChange={(e) => setDosageForm(e.target.value)}
            />
          </div>

          <div className="hm-form-group">
            <label>Strength</label>
            <input
              className="hm-input"
              placeholder="e.g. 500mg"
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
            />
          </div>

          <div className="hm-form-group">
            <label>Manufacturer</label>
            <input
              className="hm-input"
              placeholder="e.g. Unilab"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </div>
          
          <div className="hm-form-group">
            <label>Expiry Date</label>
            <input
              className="hm-input"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="hm-form-group">
            <label>Unit Price (₱)</label>
            <input
              className="hm-input"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>

          <div className="hm-form-group">
            <label>Selling Price (₱)</label>
            <input
              className="hm-input"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />
          </div>

          <div className="hm-form-group">
            <label>Reorder Level</label>
            <input
              className="hm-input"
              type="number"
              placeholder="e.g. 20"
              value={reorderLevel}
              onChange={(e) => setReorderLevel(e.target.value)}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', gap: '0.75rem' }}>
          {editingMedicine && (
            <button type="button" className="hm-btn hm-btn-outline" onClick={cancelEdit} disabled={isSubmitting}>
              <XIcon /> Cancel
            </button>
          )}
          <button type="submit" className="hm-btn" disabled={isSubmitting}>
             {editingMedicine ? (
               <><SaveIcon /> {isSubmitting ? "Saving..." : "Update Medicine"}</>
             ) : (
               <><PlusIcon /> {isSubmitting ? "Adding..." : "Add Medicine"}</>
             )}
          </button>
        </div>
      </form>
    </div>
  );
}
