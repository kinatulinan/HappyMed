import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import MedicinesPage from "./pages/MedicinesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuditLogsPage from "./pages/AuditLogsPage";
import DashboardPage from "./pages/DashboardPage";
import StocksPage from "./pages/StocksPage";
import ReportsPage from "./pages/ReportsPage";

function UnauthorizedPage() {
  return (
    <div className="hm-page">
      <div className="hm-card hm-center-card">
        <h2>Access restricted</h2>
        <p>
          Your account does not have permission to view this area. Contact an
          administrator if you believe this is a mistake.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="medicines" element={<MedicinesPage />} />
            <Route path="stock" element={<StocksPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route
              path="audit-logs"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <AuditLogsPage />
                </ProtectedRoute>
              }
            />
            <Route path="unauthorized" element={<UnauthorizedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
