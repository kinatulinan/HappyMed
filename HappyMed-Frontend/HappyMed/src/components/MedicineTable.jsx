import { deleteMedicine } from "../services/medicineService";
import { useState } from "react";

const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;

export default function MedicineTable({ medicines, reload, setEditingMedicine }) {
  const [deletingId, setDeletingId] = useState(null);

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;
    
    setDeletingId(id);
    try {
      await deleteMedicine(id);
      reload();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="hm-card">
      <div className="hm-section-header">
        <span className="hm-section-title">Medicine Inventory</span>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table className="hm-table">
          <thead>
            <tr>
              <th>Generic / Brand Name</th>
              <th>Category</th>
              <th>Form / Strength</th>
              <th>Manufacturer</th>
              <th>Expiry</th>
              <th>Unit / Selling Price</th>
              <th>Reorder Lvl</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((m) => (
              <tr key={m.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{m.genericName}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.brandName || '-'}</div>
                </td>
                <td>
                  <span className="hm-pill hm-pill-delivered" style={{ background: '#f1f5f9', color: '#475569' }}>
                    {m.category || 'N/A'}
                  </span>
                </td>
                <td>
                  <div>{m.dosageForm || '-'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{m.strength || '-'}</div>
                </td>
                <td style={{ color: '#64748b' }}>{m.manufacturer || '-'}</td>
                <td style={{ color: '#ef4444', fontSize: '0.9rem' }}>{m.expiryDate || 'N/A'}</td>
                <td>
                  <div>₱{m.unitPrice?.toFixed(2) || '0.00'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 500 }}>
                    ₱{m.sellingPrice?.toFixed(2) || '0.00'}
                  </div>
                </td>
                <td style={{ color: '#64748b', textAlign: 'center' }}>
                  {m.reorderLevel !== null ? m.reorderLevel : '-'}
                </td>
                <td style={{ textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', borderBottom: 'none' }}>
                  <button 
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      if (setEditingMedicine) setEditingMedicine(m);
                    }} 
                    className="hm-btn hm-btn-outline"
                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                    title="Edit Medicine"
                  >
                    <EditIcon /> Edit
                  </button>
                  <button 
                    onClick={() => remove(m.id)} 
                    className="hm-btn hm-btn-danger"
                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                    disabled={deletingId === m.id}
                    title="Delete Medicine"
                  >
                    <TrashIcon /> {deletingId === m.id ? '...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
            
            {medicines.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: '#64748b', padding: '2rem 1rem' }}>
                  No medicines currently in inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
