import { useState, useEffect } from "react";
import { getMedicines } from "../services/medicineService";
import { getSuppliers } from "../services/supplierService";
import { createStockIn, createStockOut } from "../services/stockService";

export default function StocksPage() {
  const [activeTab, setActiveTab] = useState("in"); // "in" or "out"
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Form states - Stock In
  const [stockIn, setStockIn] = useState({
    medicineId: "",
    supplierId: "",
    batchNumber: "",
    quantity: "",
    expiryDate: "",
    dateReceived: "",
  });

  // Form states - Stock Out
  const [stockOut, setStockOut] = useState({
    medicineId: "",
    quantitySold: "",
    prescriptionNo: "",
    pharmacist: "",
    dateDispensed: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadDropdownData = async () => {
    try {
      const meds = await getMedicines();
      setMedicines(meds || []);
      
      const supps = await getSuppliers();
      setSuppliers(supps || []);
    } catch (err) {
      console.error("Failed to load medicines or suppliers", err);
    }
  };

  const handleStockInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      await createStockIn({
        ...stockIn,
        quantity: parseInt(stockIn.quantity, 10),
      });
      setMessage({ text: "Stock In saved successfully!", type: "success" });
      setStockIn({
        medicineId: "",
        supplierId: "",
        batchNumber: "",
        quantity: "",
        expiryDate: "",
        dateReceived: "",
      });
    } catch (err) {
      setMessage({ text: err.message || "Failed to save details", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleStockOutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      await createStockOut({
        ...stockOut,
        quantitySold: parseInt(stockOut.quantitySold, 10),
      });
      setMessage({ text: "Stock Out saved successfully!", type: "success" });
      setStockOut({
        medicineId: "",
        quantitySold: "",
        prescriptionNo: "",
        pharmacist: "",
        dateDispensed: "",
      });
    } catch (err) {
      setMessage({ text: err.message || "Failed to save details", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hm-page">
      <div className="hm-page-header">
        <h2>Stock Management</h2>
        <p>Record medicine receiving and dispensing events.</p>
      </div>

      <div className="hm-card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem" }}>
          <button 
            type="button" 
            className={activeTab === "in" ? "hm-btn hm-btn-primary" : "hm-btn hm-btn-secondary"}
             onClick={() => { setActiveTab("in"); setMessage({text:"", type:""}); }}
          >
            Stock In
          </button>
          <button 
            type="button" 
            className={activeTab === "out" ? "hm-btn hm-btn-primary" : "hm-btn hm-btn-secondary"}
            onClick={() => { setActiveTab("out"); setMessage({text:"", type:""}); }}
          >
            Stock Out
          </button>
        </div>

        {message.text && (
          <div className="hm-form-group" style={{ color: message.type === "error" ? "#ef4444" : "#10b981", fontWeight: "500" }}>
            {message.text}
          </div>
        )}

        {activeTab === "in" && (
          <form onSubmit={handleStockInSubmit} className="hm-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="hm-form-group">
              <label>Medicine</label>
              <select 
                className="hm-input" 
                required 
                value={stockIn.medicineId} 
                onChange={e => setStockIn({...stockIn, medicineId: e.target.value})}
              >
                <option value="">Select Medicine</option>
                {medicines.map(m => <option key={m.id} value={m.id}>{m.brandName} ({m.genericName})</option>)}
              </select>
            </div>
            
            <div className="hm-form-group">
              <label>Supplier</label>
              <select 
                className="hm-input" 
                required 
                value={stockIn.supplierId} 
                onChange={e => setStockIn({...stockIn, supplierId: e.target.value})}
              >
                <option value="">Select Supplier</option>
                <option value="0">HappyMed</option>
                {suppliers.map(s => <option key={s.supplierId} value={s.supplierId}>{s.supplierName}</option>)}
              </select>
            </div>

            <div className="hm-form-group">
              <label>Batch Number</label>
              <input 
                type="text" 
                className="hm-input" 
                required 
                value={stockIn.batchNumber} 
                onChange={e => setStockIn({...stockIn, batchNumber: e.target.value})} 
              />
            </div>
            
            <div className="hm-form-group">
              <label>Quantity</label>
              <input 
                type="number" 
                className="hm-input" 
                min="1"
                required 
                value={stockIn.quantity} 
                onChange={e => setStockIn({...stockIn, quantity: e.target.value})} 
              />
            </div>

            <div className="hm-form-group">
              <label>Expiry Date</label>
              <input 
                type="date" 
                className="hm-input" 
                required 
                value={stockIn.expiryDate} 
                onChange={e => setStockIn({...stockIn, expiryDate: e.target.value})} 
              />
            </div>

            <div className="hm-form-group">
              <label>Date Received</label>
              <input 
                type="date" 
                className="hm-input" 
                required 
                value={stockIn.dateReceived} 
                onChange={e => setStockIn({...stockIn, dateReceived: e.target.value})} 
              />
            </div>

            <div className="hm-form-group" style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
              <button disabled={loading} type="submit" className="hm-btn hm-btn-primary">
                {loading ? "Saving..." : "Save Stock In"}
              </button>
            </div>
          </form>
        )}

        {activeTab === "out" && (
           <form onSubmit={handleStockOutSubmit} className="hm-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
             <div className="hm-form-group">
              <label>Medicine</label>
              <select 
                className="hm-input" 
                required 
                value={stockOut.medicineId} 
                onChange={e => setStockOut({...stockOut, medicineId: e.target.value})}
              >
                <option value="">Select Medicine</option>
                {medicines.map(m => <option key={m.id} value={m.id}>{m.brandName} ({m.genericName})</option>)}
              </select>
            </div>
            
            <div className="hm-form-group">
              <label>Quantity Sold</label>
              <input 
                type="number" 
                className="hm-input" 
                min="1"
                required 
                value={stockOut.quantitySold} 
                onChange={e => setStockOut({...stockOut, quantitySold: e.target.value})} 
              />
            </div>

            <div className="hm-form-group">
              <label>Prescription No.</label>
              <input 
                type="text" 
                className="hm-input" 
                value={stockOut.prescriptionNo} 
                onChange={e => setStockOut({...stockOut, prescriptionNo: e.target.value})} 
              />
            </div>

            <div className="hm-form-group">
              <label>Pharmacist Name</label>
              <input 
                type="text" 
                className="hm-input" 
                required 
                value={stockOut.pharmacist} 
                onChange={e => setStockOut({...stockOut, pharmacist: e.target.value})} 
              />
            </div>

            <div className="hm-form-group">
              <label>Date Dispensed</label>
              <input 
                type="date" 
                className="hm-input" 
                required 
                value={stockOut.dateDispensed} 
                onChange={e => setStockOut({...stockOut, dateDispensed: e.target.value})} 
              />
            </div>

            <div className="hm-form-group" style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
              <button disabled={loading} type="submit" className="hm-btn hm-btn-primary">
                {loading ? "Saving..." : "Save Stock Out"}
              </button>
            </div>
           </form>
        )}
      </div>
    </div>
  );
}
