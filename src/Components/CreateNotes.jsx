

import React, { useState } from "react";
import { createNote } from "../API/GetNotes";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateNotes = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [noteData, setNoteData] = useState({
    title: "",
    content: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createNote(token, noteData);

      toast.success("Note created successfully!");
      navigate("/notes");

    } catch (error) {
      toast.error(error.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-white text-2xl mb-6 font-bold">
          Create New Note
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
          value={noteData.title}
          onChange={(e) =>
            setNoteData({ ...noteData, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Content"
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
          rows="4"
          value={noteData.content}
          onChange={(e) =>
            setNoteData({ ...noteData, content: e.target.value })
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded"
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};

export default CreateNotes;
