const API_URL_IN = "http://localhost:8080/api/stockin";
const API_URL_OUT = "http://localhost:8080/api/stockout";

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

export const createStockIn = async (stockIn) => {
  const response = await fetch(API_URL_IN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(stockIn),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to save stock in: ${text}`);
  }

  return response.json();
};

export const createStockOut = async (stockOut) => {
  const response = await fetch(API_URL_OUT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(stockOut),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to save stock out: ${text}`);
  }

  return response.json();
};
