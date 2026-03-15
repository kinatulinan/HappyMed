import { useEffect, useState } from "react";
import { getMedicines } from "../services/medicineService";

const UsersIcon = () => <svg className="hm-stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const CartIcon = () => <svg className="hm-stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
const WalletIcon = () => <svg className="hm-stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const BoxIcon = () => <svg className="hm-stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="hm-select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>;
const SortIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 16-3 3-3-3"/><path d="m9 8 3-3 3 3"/></svg>;

// Simple SVG sparkline
const Sparkline = () => (
  <svg className="hm-sparkline" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C3 10 5.5 6 9 8C13.5 10.5 15.5 3 21 6C27 9 29.5 2 38 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function DashboardPage() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicines();
        setMedicines(data || []);
      } catch (err) {
        console.error("Failed to load medicines", err);
      }
    };
    fetchMedicines();
  }, []);

  // Map real medicines to the tables, fallback to empty arrays if no data
  const expiringData = medicines.slice(0, 5).map((med) => ({
    name: med.name,
    date: med.expiryDate || "N/A",
    qty: med.stockQuantity || 0,
    returnVal: Math.floor(Math.random() * 5) + 1, // Mock return value
  }));

  const recentOrdersData = medicines.slice(0, 5).map((med) => ({
    name: med.name,
    batch: med.batchNumber || `B-${Math.floor(Math.random() * 900000)}`,
    qty: med.stockQuantity || 0,
    status: med.stockQuantity > 20 ? "Delivered" : "Pending",
    price: `$${med.price?.toFixed(2) || "0.00"}`,
    statusClass: med.stockQuantity > 20 ? "hm-pill-delivered" : "hm-pill-pending",
  }));

  return (
    <>
      {/* 4 Stat Cards */}
      <div className="hm-grid hm-grid-4">
        <div className="hm-card hm-stat-card">
          <div className="hm-stat-icon-wrapper hm-stat-purple">
            <UsersIcon />
          </div>
          <div className="hm-stat-content">
            <span className="hm-stat-label">Total Customer</span>
            <span className="hm-stat-value">120</span>
            <a href="#" className="hm-stat-link">Show Details</a>
          </div>
        </div>
        
        <div className="hm-card hm-stat-card">
          <div className="hm-stat-icon-wrapper hm-stat-green">
            <CartIcon />
          </div>
          <div className="hm-stat-content">
            <span className="hm-stat-label">Total Sales</span>
            <span className="hm-stat-value">234</span>
            <a href="#" className="hm-stat-link">Show Details</a>
          </div>
        </div>

        <div className="hm-card hm-stat-card">
          <div className="hm-stat-icon-wrapper hm-stat-yellow">
            <WalletIcon />
          </div>
          <div className="hm-stat-content">
            <span className="hm-stat-label">Total Profit</span>
            <span className="hm-stat-value">$456</span>
            <a href="#" className="hm-stat-link">Show Details</a>
          </div>
        </div>

        <div className="hm-card hm-stat-card">
          <div className="hm-stat-icon-wrapper hm-stat-red">
            <BoxIcon />
          </div>
          <div className="hm-stat-content">
            <span className="hm-stat-label">Out of Stock</span>
            <span className="hm-stat-value">
              {medicines.filter((m) => m.stockQuantity <= 0).length || 56}
            </span>
            <a href="#" className="hm-stat-link">Show Details</a>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="hm-grid hm-grid-2">
        {/* Expiring List */}
        <div className="hm-card">
          <div className="hm-section-header">
            <span className="hm-section-title">Expiring List</span>
            <a href="/medicines" className="hm-see-all">See All <ChevronRightIcon /></a>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="hm-table">
              <thead>
                <tr>
                  <th>Medicine name <SortIcon /></th>
                  <th>Expire Date <SortIcon /></th>
                  <th>Quantity <SortIcon /></th>
                  <th>Chart <SortIcon /></th>
                  <th>Return <SortIcon /></th>
                </tr>
              </thead>
              <tbody>
                {expiringData.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td style={{ color: '#64748b' }}>{item.date}</td>
                    <td>{item.qty}</td>
                    <td><Sparkline /></td>
                    <td style={{ color: '#64748b' }}>
                       <div style={{ display: 'inline-block', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '2px 6px', fontSize: '11px', background: '#f8fafc' }}>{item.returnVal}</div>
                    </td>
                  </tr>
                ))}
                {expiringData.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: '#64748b' }}>No medicines found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="hm-card">
          <div className="hm-section-header">
            <span className="hm-section-title">Recent Order's</span>
            <a href="/medicines" className="hm-see-all">See All <ChevronRightIcon /></a>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="hm-table">
              <thead>
                <tr>
                  <th>Medicine name <SortIcon /></th>
                  <th>Batch No <SortIcon /></th>
                  <th>Quantity <SortIcon /></th>
                  <th>Status <SortIcon /></th>
                  <th>Price <SortIcon /></th>
                </tr>
              </thead>
              <tbody>
                {recentOrdersData.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td style={{ color: '#64748b' }}>{item.batch}</td>
                    <td>{item.qty}</td>
                    <td><span className={`hm-pill ${item.statusClass}`}>{item.status}</span></td>
                    <td style={{ color: '#64748b' }}>{item.price}</td>
                  </tr>
                ))}
                {recentOrdersData.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: '#64748b' }}>No recent orders.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="hm-grid hm-grid-2">
        {/* Monthly Progress */}
        <div className="hm-card">
          <div className="hm-section-header">
            <span className="hm-section-title">Monthly Progress</span>
            <div className="hm-select-container">
              <select defaultValue="Monthly">
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
              </select>
              <ChevronDownIcon />
            </div>
          </div>
          
          <div className="hm-chart-container">
             <div className="hm-bar-chart">
               <div className="hm-y-axis">
                 <span>120</span>
                 <span>90</span>
                 <span>60</span>
                 <span>30</span>
                 <span>0</span>
               </div>
               <div className="hm-bars-wrapper">
                 {[40, 20, 60, 45, 80, 20, 30, 95, 25, 60, 45, 85, 40].map((val, i) => (
                   <div key={i} className="hm-bar-group">
                      {i === 7 && <div className="hm-tooltip">September<br/><span style={{ color: '#22c55e', fontWeight: 'bold' }}>20k</span></div>}
                      <div className={`hm-bar-fill ${i === 7 ? 'hm-bar-fill-dark' : ''}`} style={{ height: `${val}%` }}></div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* Today's Report */}
        <div className="hm-card">
          <div className="hm-section-header">
            <span className="hm-section-title">Today's Report</span>
          </div>
          
          <div className="hm-chart-container hm-donut-container">
             <div className="hm-donut-svg-wrapper">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  {/* Gray tracks */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle cx="50" cy="50" r="28" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle cx="50" cy="50" r="16" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  
                  {/* Colored progress rings (mock) */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="251" strokeDashoffset="50" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="28" fill="none" stroke="#eab308" strokeWidth="8" strokeDasharray="175" strokeDashoffset="70" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="16" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="100" strokeDashoffset="30" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="8" strokeDasharray="251" strokeDashoffset="180" strokeLinecap="round" transform="rotate(90 50 50)" />
                </svg>
             </div>
             
             <div className="hm-donut-legend">
                <div className="hm-donut-total">
                  <div className="hm-donut-total-label">Total Earning</div>
                  <div className="hm-donut-total-value">
                     $5098.00 
                     <span className="hm-donut-total-change">35% <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" display="inline-block"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></span>
                  </div>
                </div>
                
                <div className="hm-legend-item">
                  <div className="hm-legend-dot" style={{ background: '#ef4444' }}></div>
                  Total Purchase
                </div>
                <div className="hm-legend-item">
                  <div className="hm-legend-dot" style={{ background: '#eab308' }}></div>
                  Cash Received
                </div>
                <div className="hm-legend-item">
                  <div className="hm-legend-dot" style={{ background: '#3b82f6' }}></div>
                  Bank Receive
                </div>
                <div className="hm-legend-item">
                  <div className="hm-legend-dot" style={{ background: '#22c55e' }}></div>
                  Total Service
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}

