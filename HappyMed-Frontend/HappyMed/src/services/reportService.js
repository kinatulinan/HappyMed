const API_URL = "http://localhost:8080/api/reports";

const authHeaders = () => {
  const stored = localStorage.getItem("happymed_auth");
  if (!stored) return {};
  try {
    const { token } = JSON.parse(stored);
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
};

export const getFinancialReports = async () => {
    const response = await fetch(`${API_URL}/financials`, {
        headers: {
            ...authHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load reports");
    }

    return response.json();
};

export const getFinancialHistory = async () => {
    const response = await fetch(`${API_URL}/financials/history`, {
        headers: {
            ...authHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load history");
    }

    return response.json();
};

export const getFinancialItemizedHistory = async () => {
    const response = await fetch(`${API_URL}/financials/itemized`, {
        headers: {
            ...authHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load itemized history");
    }

    return response.json();
};
