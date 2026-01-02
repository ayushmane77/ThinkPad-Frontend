// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { useAuth } from '../Context/AuthContext'
// import { getNoteById } from '../API/GetNotes'

// const EditNotes = () => {
//   const { token } = useAuth();
//   const [note, setNote] = useState(null);
//   const [loading, setLoading] = useState(true);

//   function handleSubmit(e){
//     e.preventDefault();
//     // Call updateNote API here

//   }

//   useEffect(() => {
//     if (!token) return;

//     const fetchNote = async () => {
//       try {
//         // Fetch note data using token
//         // Set note data to state
//         // const data = await getNoteById(token,note._id);
//         const data = await getNoteById(token, window.location.pathname.split("/").pop());
//         setNote(data.note);
//       } catch (err) {
//         console.error("Error fetching note:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNote();
//   }, [token]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//         <div>EditNotes</div>
//         <div>
//             <form action="PUT">
//                 <input type="text" placeholder='Title' defaultValue={note.title} />
//                 <textarea defaultValue={note.content} placeholder='Content'></textarea>
//                 <button type='submit'>Update Note</button>
//             </form>
//         </div>
//     </>
//   )
// }

// export default EditNotes



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getNoteById, updateNote } from "../API/GetNotes";
import { toast } from "react-toastify";

const EditNotes = () => {
  const { id } = useParams(); // ✅
  const navigate = useNavigate();
  const { token } = useAuth();

  const [noteData, setNoteData] = useState({
    title: "",
    content: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchNote = async () => {
      try {
        const data = await getNoteById(token, id);
        setNoteData({
          title: data.note.title,
          content: data.note.content
        });
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [token, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateNote(token, id, noteData);
      toast.success("Note updated successfully!");
      navigate("/notes");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-white text-2xl mb-6 font-bold">
          Edit Note
        </h2>

        <input
          type="text"
          value={noteData.title}
          onChange={(e) =>
            setNoteData({ ...noteData, title: e.target.value })
          }
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
          required
        />

        <textarea
          value={noteData.content}
          onChange={(e) =>
            setNoteData({ ...noteData, content: e.target.value })
          }
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
          rows="4"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditNotes;
