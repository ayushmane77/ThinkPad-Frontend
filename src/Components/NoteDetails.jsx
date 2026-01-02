import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getNoteById, deleteNote } from "../API/GetNotes";
import { toast } from "react-toastify";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchNote = async () => {
      try {
        const data = await getNoteById(token, id);
        setNote(data.note);
      } catch (err) {
        toast.error(err.message);
        navigate("/notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [token, id, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this note?");
    if (!confirmDelete) return;

    try {
      await deleteNote(token, id);
      toast.success("Note deleted");
      navigate("/notes");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  if (!note) return null;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-gray-900 border border-gray-700 rounded-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{note.title}</h1>

          <button
            onClick={() => navigate("/notes")}
            className="text-gray-400 hover:text-white"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-300 whitespace-pre-line leading-relaxed mb-8">
          {note.content}
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/edit-note/${note._id}`)}
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
