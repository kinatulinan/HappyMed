import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuditLogsPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/audit-logs", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to load audit logs");
        }
        const data = await res.json();
        setLogs(data);
      } catch (e) {
        // In production you may want to surface a message
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  return (
    <div className="hm-page">
      <div className="hm-page-header">
        <h2>Audit Logs</h2>
        <p>Track sensitive actions across the HappyMed system.</p>
      </div>

      {loading ? (
        <div className="hm-center">
          <div className="hm-spinner" />
        </div>
      ) : (
        <div className="hm-card">
          <table className="hm-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No audit entries yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.timestamp}</td>
                    <td>{log.username}</td>
                    <td>{Array.isArray(log.roles) ? log.roles.join(", ") : ""}</td>
                    <td>{log.action}</td>
                    <td>{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

