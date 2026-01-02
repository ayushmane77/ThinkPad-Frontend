
import { useEffect, useState } from "react";
import { getNotes } from "../API/GetNotes";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../API/GetNotes";


const Notes = () => {
  const { token } = useAuth(); // 🔥 use context
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  async function handleDelete(noteId){
    try{
      await deleteNote(token,noteId);
      setNotes((prevNotes)=>{
        return prevNotes.filter((note)=>note._id !== noteId);
      });
    }
    catch(err){
      setError(err.message);

    }
  }
  useEffect(() => {
    if (!token) return;

    const fetchNotes = async () => {
      try {
        const data = await getNotes(token);
        setNotes(data.notes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [token]);

  if (loading) {
    return <p className="text-white p-6">Loading notes...</p>;
  }

  if (error) {
    return <p className="text-red-400 p-6">{error}</p>;
  }

  return (
    

  <div className="min-h-screen bg-black text-white px-4 py-8">
    {/* Container */}
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          My Notes
        </h1>

        <button
          onClick={() => navigate("/createnote")}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700
                     transition font-medium text-sm"
        >
          + New Note
        </button>
      </div>

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <p className="text-gray-400 text-lg">
            No notes yet
          </p>
          <p className="text-gray-500 mt-2">
            Click <span className="text-purple-400">New Note</span> to create one
          </p>
        </div>
      )}

      {/* Notes Grid */}
      {notes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <div
              key={note._id}
              onClick={() => navigate(`/note/${note._id}`)}
              className="group cursor-pointer bg-gray-900 border border-gray-800
                         rounded-2xl p-5 h-[200px] flex flex-col
                         hover:border-purple-500 hover:shadow-lg
                         transition-all duration-300"
            >
              {/* Title */}
              <h2 className="text-lg font-semibold mb-2 truncate">
                {note.title}
              </h2>

              {/* Content preview */}
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 flex-grow">
                {note.content}
              </p>

              {/* Footer hint */}
              <span className="text-xs text-gray-500 mt-4 opacity-0
                               group-hover:opacity-100 transition">
                Click to view →
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>

  );
};

export default Notes;
