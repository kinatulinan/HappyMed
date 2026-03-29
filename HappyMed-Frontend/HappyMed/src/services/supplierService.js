const API_URL = "http://localhost:8080/api/suppliers";

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

export const getSuppliers = async () => {
  const response = await fetch(API_URL, {
    headers: {
      ...authHeaders(),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to load suppliers (${response.status}): ${
        text || "No response body"
      }`
    );
  }

  return response.json();
};

export const createSupplier = async (supplier) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(supplier),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to create supplier: ${text}`);
  }
  
  return response.json();
};
