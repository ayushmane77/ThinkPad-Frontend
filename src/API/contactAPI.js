// const BASE_URL = "http://localhost:4000";


const BASE_URL = import.meta.env.VITE_API_URL;
export async function sendContactMessage(formData) {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send message");
  }

  return data;
}
