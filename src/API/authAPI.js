// const BASE_URL = "http://localhost:4000"; // backend URL



const BASE_URL = import.meta.env.VITE_API_URL;
export async function registerUser(formData) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(formData) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  console.log(response);
  
  const data = await response.json();
  console.log(data);
  


  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}
