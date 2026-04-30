import { useState, useEffect } from "react";
import { getMedicines } from "../services/medicineService";
import { getSuppliers } from "../services/supplierService";
import { createStockIn, createStockOut } from "../services/stockService";

export default function StocksPage() {
  const [activeTab, setActiveTab] = useState("in");
  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  
  const [stockIn, setStockIn] = useState({
    medicineId: "",
    supplierId: "",
    batchNumber: "",
    quantity: "",
    expiryDate: "",
    dateReceived: "",
  });

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
      console.error("Failed to load data", err);
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
      setMessage({ text: "Stock In saved successfully! Inventory updated.", type: "success" });
      setStockIn({
        medicineId: "",
        supplierId: "",
        batchNumber: "",
        quantity: "",
        expiryDate: "",
        dateReceived: "",
      });
      await loadDropdownData(); // Refresh the real-time stock
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

    // Find the current medicine to validate stock
    const selectedMed = medicines.find(m => m.id === parseInt(stockOut.medicineId, 10));
    const quantityToSell = parseInt(stockOut.quantitySold, 10);
    
    if (selectedMed && quantityToSell > selectedMed.stockQuantity) {
      setMessage({ text: `Cannot dispense ${quantityToSell}. Only ${selectedMed.stockQuantity} in stock.`, type: "error" });
      setLoading(false);
      return;
    }

    try {
      await createStockOut({
        ...stockOut,
        quantitySold: quantityToSell,
      });
      setMessage({ text: "Stock Out saved successfully! Inventory updated.", type: "success" });
      setStockOut({
        medicineId: "",
        quantitySold: "",
        prescriptionNo: "",
        pharmacist: "",
        dateDispensed: "",
      });
      await loadDropdownData(); // Refresh the real-time stock
    } catch (err) {
      setMessage({ text: err.message || "Failed to save details", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hm-page">
      <div className="hm-page-header">
        <div>
          <h2>Real-Time Inventory Control</h2>
          <p>Monitor current stock levels and record incoming/outgoing medicines.</p>
        </div>
      </div>

      <div className="inventory-dashboard-layout">
        
        {/* Left Side: Real-Time Stock Table */}
        <div className="inventory-table-container">
          <div className="inventory-table-header">
            <h3>Current Stock Levels</h3>
            <span className="inventory-stat-badge">{medicines.length} Items</span>
          </div>
          
          <div className="hm-table-scroll-wrapper">
            <table className="hm-modern-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Unit Price</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {medicines.length > 0 ? (
                  medicines.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div className="med-name">{m.itemName}</div>
                      </td>
                      <td>${m.unitPrice?.toFixed(2)}</td>
                      <td>
                        <span className="stock-number">{m.stockQuantity || 0}</span>
                      </td>
                      <td>
                        {m.stockQuantity > (m.reorderLevel || 10) ? (
                           <span className="status-pill status-healthy">In Stock</span>
                        ) : m.stockQuantity > 0 ? (
                           <span className="status-pill status-warning">Low Stock</span>
                        ) : (
                           <span className="status-pill status-danger">Out of Stock</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                      No inventory data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Operations Panel */}
        <div className="inventory-ops-container">
          <div className="ops-tabs">
            <button 
              type="button" 
              className={`ops-tab ${activeTab === "in" ? "active" : ""}`}
              onClick={() => { setActiveTab("in"); setMessage({text:"", type:""}); }}
            >
              Stock In
            </button>
            <button 
              type="button" 
              className={`ops-tab ${activeTab === "out" ? "active" : ""}`}
              onClick={() => { setActiveTab("out"); setMessage({text:"", type:""}); }}
            >
              Stock Out
            </button>
          </div>

          <div className="ops-content">
            {message.text && (
              <div className={`ops-alert ops-alert-${message.type}`}>
                {message.type === "error" ? "⚠️ " : "✅ "} {message.text}
              </div>
            )}

            {activeTab === "in" && (
              <form onSubmit={handleStockInSubmit} className="ops-form">
                <div className="hm-form-group">
                  <label>Medicine (Remaining Stock)</label>
                  <select 
                    className="hm-input" 
                    required 
                    value={stockIn.medicineId} 
                    onChange={e => setStockIn({...stockIn, medicineId: e.target.value})}
                  >
                    <option value="">Select Medicine</option>
                    {medicines.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.itemName} — Stock: {m.stockQuantity || 0}
                      </option>
                    ))}
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
                    <option value="0">HappyMed Internal</option>
                    {suppliers.map(s => <option key={s.supplierId} value={s.supplierId}>{s.supplierName}</option>)}
                  </select>
                </div>

                <div className="ops-form-row">
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
                    <label>Add Quantity</label>
                    <input 
                      type="number" 
                      className="hm-input" 
                      min="1"
                      required 
                      value={stockIn.quantity} 
                      onChange={e => setStockIn({...stockIn, quantity: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="ops-form-row">
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
                </div>

                <button disabled={loading} type="submit" className="ops-submit-btn ops-btn-in">
                  {loading ? "Saving..." : "Confirm Stock In"}
                </button>
              </form>
            )}

            {activeTab === "out" && (
               <form onSubmit={handleStockOutSubmit} className="ops-form">
                 <div className="hm-form-group">
                  <label>Medicine (Current Stock)</label>
                  <select 
                    className="hm-input" 
                    required 
                    value={stockOut.medicineId} 
                    onChange={e => setStockOut({...stockOut, medicineId: e.target.value})}
                  >
                    <option value="">Select Medicine to Dispatch</option>
                    {medicines.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.itemName} — Avail: {m.stockQuantity || 0}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="ops-form-row">
                  <div className="hm-form-group">
                    <label>Quantity to Dispense</label>
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
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="ops-form-row">
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
                </div>

                <button disabled={loading} type="submit" className="ops-submit-btn ops-btn-out">
                  {loading ? "Saving..." : "Confirm Stock Out"}
                </button>
               </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
