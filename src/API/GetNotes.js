


const BASE_URL = import.meta.env.VITE_API_URL;
// export async function getNotes(token) {
//   const response = await fetch(`${BASE_URL}/allnotes`, {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json"
//     }
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Failed to fetch notes");
//   }

//   return data;
// }

// ---------------------------------------------------------------

export async function getNotes(token) {
  const response = await fetch(`${BASE_URL}/allnotes`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/"; // force redirect
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
















// export async function getNote(token,note_id){
//   const response = await fetch(`${BASE_URL}/`)
// }
export async function getNoteById(token,id){
  const response = await fetch(`${BASE_URL}/note/${id}`,{
    method:'GET',
    headers:{
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch note");
  }

  return data;
}

export async function updateNote(token, id, noteData) {
  const response = await fetch(`${BASE_URL}/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(noteData) // ✅ FIX
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update note");
  }

  return data;
}


export async function createNote(token, noteData){
  const response = await fetch(`${BASE_URL}/createnote`,{
    method:"POST",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(noteData)
  });
  const data = await response.json();
  if(!response.ok){
    throw new Error(data.message || "Failed to create notes");
  }
  return data;
}

// export async function updateNote(token,id,notesData){
//   const respones = await fetch(`${BASE_URL}/updatenote/${id}`,{
//     method: 'PUT',
//     headers:{
//       "Authorization":`Bearer ${token}`,
//       "Content-Type": "application/json"
//     },
//     body:JSON.stringify({
//       notesData
//     })
//   });
//   const data = await respones.json();
//   if(!respones.ok){
//     throw new Error(data.message || "Failed to update notes");
//   }
//   return data;
// }

export async function deleteNote(token,id){
  const response = await fetch(`${BASE_URL}/deletenote/${id}`,{
    method: 'DELETE',
    headers:{
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }

  });
  const data = await response.json();
  if(!response.ok){
    throw new Error(data.message || "Failed to delete note");
  }
  return data;
}