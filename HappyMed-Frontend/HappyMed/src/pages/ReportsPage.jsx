import { useEffect, useState } from "react";
import { getFinancialReports, getFinancialHistory, getFinancialItemizedHistory } from "../services/reportService";

const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;

export default function ReportsPage() {
    const [reports, setReports] = useState([]);
    const [history, setHistory] = useState([]);
    const [itemizedHistory, setItemizedHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [data, histData, itemData] = await Promise.all([
                    getFinancialReports(),
                    getFinancialHistory(),
                    getFinancialItemizedHistory()
                ]);
                setReports(data || []);
                setHistory(histData || []);
                setItemizedHistory(itemData || []);
            } catch (error) {
                console.error("Failed to load reports", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="hm-page">
                <div className="hm-card hm-center" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h3 style={{ color: '#64748b' }}>Calculating financials...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="hm-page">
            <div className="hm-page-header">
                <h2>Financial Reports</h2>
                <p>Automated breakdown of your sales, revenue, and generated profit.</p>
            </div>

            <div className="hm-grid hm-grid-3">
                {reports.map((report, index) => (
                    <div className="hm-card" key={index} style={{ borderTop: `4px solid ${index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#6366f1'}` }}>
                        <div className="hm-section-header">
                            <h3 className="hm-section-title">{report.period}</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#f1f5f9', borderRadius: '8px', color: '#64748b' }}><PackageIcon /></div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Items Sold</p>
                                    <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#0f172a' }}>{report.totalSoldItems}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '8px', color: '#3b82f6' }}><DollarSignIcon /></div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Total Revenue</p>
                                    <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#0f172a' }}>₱{report.totalRevenue.toFixed(2)}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#ecfdf5', borderRadius: '8px', color: '#10b981' }}><TrendingUpIcon /></div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Net Profit</p>
                                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>₱{report.totalProfit.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="hm-section-header" style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>
                <h3 className="hm-section-title">Daily Sales History (Last 30 Days)</h3>
            </div>

            {history.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {history.map((row, idx) => (
                        <div key={idx} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            padding: '1.25rem 1.5rem', 
                            backgroundColor: '#ffffff', 
                            borderRadius: '12px', 
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.2s ease',
                            cursor: 'default'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                            e.currentTarget.style.borderColor = '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                        }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '25%' }}>
                                <div style={{ 
                                    padding: '0.6rem', 
                                    backgroundColor: '#f8fafc', 
                                    borderRadius: '8px', 
                                    color: '#64748b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '1.05rem' }}>{row.period}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Daily Report</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Items Sold</div>
                                <div style={{ fontWeight: 600, color: '#334155', fontSize: '1.25rem' }}>{row.totalSoldItems}</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Revenue</div>
                                <div style={{ fontWeight: 600, color: '#334155', fontSize: '1.25rem' }}>₱{row.totalRevenue.toFixed(2)}</div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '25%' }}>
                                <div style={{ 
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    padding: '0.5rem 1.25rem', 
                                    backgroundColor: row.totalProfit > 0 ? '#ecfdf5' : '#f1f5f9', 
                                    color: row.totalProfit > 0 ? '#10b981' : '#64748b', 
                                    borderRadius: '9999px',
                                    fontWeight: 700,
                                    fontSize: '1.25rem',
                                    border: row.totalProfit > 0 ? '1px solid #d1fae5' : '1px solid #e2e8f0'
                                }}>
                                    {row.totalProfit > 0 && <TrendingUpIcon />}
                                    <span style={{ marginLeft: '0.25rem' }}>₱{row.totalProfit.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="hm-card hm-center" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h4 style={{ color: '#64748b', margin: 0 }}>No historical single-day sales found in the past 30 days.</h4>
                </div>
            )}

            <div className="hm-section-header" style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>
                <h3 className="hm-section-title">Recent Itemized Transactions</h3>
            </div>

            {itemizedHistory.length > 0 ? (
                <div className="hm-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="hm-table">
                        <thead>
                            <tr>
                                <th>Date Dispensed</th>
                                <th>Item Sold</th>
                                <th style={{ textAlign: 'center' }}>Quantity</th>
                                <th style={{ textAlign: 'right' }}>Revenue</th>
                                <th style={{ textAlign: 'right' }}>Net Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemizedHistory.map((item, idx) => (
                                <tr key={idx}>
                                    <td style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.date}</td>
                                    <td style={{ fontWeight: 600, color: '#334155' }}>{item.itemName}</td>
                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.quantitySold}</td>
                                    <td style={{ textAlign: 'right' }}>₱{item.revenue.toFixed(2)}</td>
                                    <td style={{ textAlign: 'right', color: item.profit > 0 ? '#10b981' : '#64748b', fontWeight: 600 }}>
                                        {item.profit > 0 && <span style={{ fontSize: '0.8rem', marginRight: '4px' }}>+</span>}
                                        ₱{item.profit.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="hm-card hm-center" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h4 style={{ color: '#64748b', margin: 0 }}>No itemized transactions found.</h4>
                </div>
            )}
        </div>
    );
}
