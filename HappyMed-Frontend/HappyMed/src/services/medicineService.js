const API_URL = "http://localhost:8080/api/medicines";

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

export const getMedicines = async () => {
  const response = await fetch(API_URL, {
    headers: {
      ...authHeaders(),
    },
  });

  if (!response.ok) {
    // Surface a clear error instead of trying to parse empty/HTML body as JSON
    const text = await response.text();
    throw new Error(
      `Failed to load medicines (${response.status}): ${
        text || "No response body"
      }`
    );
  }

  return response.json();
};

export const createMedicine = async (medicine) => {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(medicine),
  });
};

export const updateMedicine = async (id, medicine) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(medicine),
  });
};

export const deleteMedicine = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });
};

