import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getNoteById, deleteNote, deleteFile } from "../API/GetNotes";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

const AttachmentItem = ({ file, noteId, token, onDeleted }) => {
  const isImage = file.mimetype.startsWith("image/");
  const fileUrl = `${BASE_URL.replace(/\/+$/, "")}/uploads/${file.filename}`;
  const sizeKB = (file.size / 1024).toFixed(1);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Remove "${file.originalname}"?`)) return;
    try {
      setDeleting(true);
      await deleteFile(token, noteId, file.filename);
      onDeleted(file.filename);
      toast.success("File removed");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-3">
      {isImage ? (
        <a href={fileUrl} target="_blank" rel="noreferrer">
          <img
            src={fileUrl}
            alt={file.originalname}
            className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
          />
        </a>
      ) : (
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-red-900 hover:bg-red-800 rounded text-xs text-white font-bold transition-colors"
        >
          PDF
        </a>
      )}

      <div className="flex-1 min-w-0">
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-white text-sm hover:text-purple-400 transition-colors truncate block"
        >
          {file.originalname}
        </a>
        <p className="text-gray-400 text-xs">{sizeKB} KB</p>
      </div>

      <a
        href={fileUrl}
        download={file.originalname}
        className="text-gray-400 hover:text-white text-xs px-2 py-1 border border-gray-600 rounded transition-colors"
      >
        ↓
      </a>

      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-gray-400 hover:text-red-400 text-xs px-2 py-1 border border-gray-600 rounded transition-colors"
      >
        {deleting ? "…" : "×"}
      </button>
    </div>
  );
};

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

  const handleFileDeleted = (filename) => {
    setNote(prev => ({
      ...prev,
      files: prev.files.filter(f => f.filename !== filename)
    }));
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

        {/* Attachments */}
        {note.files && note.files.length > 0 && (
          <div className="mb-8">
            <h3 className="text-gray-400 text-sm font-medium mb-3">
              Attachments ({note.files.length})
            </h3>
            <div className="flex flex-col gap-2">
              {note.files.map(file => (
                <AttachmentItem
                  key={file.filename}
                  file={file}
                  noteId={note._id}
                  token={token}
                  onDeleted={handleFileDeleted}
                />
              ))}
            </div>
          </div>
        )}

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
