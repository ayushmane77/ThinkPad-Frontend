import React, { useState, useRef } from "react";
import { createNote } from "../API/GetNotes";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ACCEPTED_TYPES = "image/jpeg,image/png,image/gif,image/webp,application/pdf";
const MAX_FILES = 5;
const MAX_SIZE_MB = 5;

const FilePreview = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/");
  const url = URL.createObjectURL(file);
  const sizeKB = (file.size / 1024).toFixed(1);

  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded p-2">
      {isImage ? (
        <img src={url} alt={file.name} className="w-10 h-10 object-cover rounded" />
      ) : (
        <div className="w-10 h-10 flex items-center justify-center bg-red-900 rounded text-xs text-white font-bold">
          PDF
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm truncate">{file.name}</p>
        <p className="text-gray-400 text-xs">{sizeKB} KB</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-400 hover:text-red-400 text-lg leading-none px-1"
        aria-label="Remove file"
      >
        ×
      </button>
    </div>
  );
};

const CreateNotes = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const fileInputRef = useRef(null);

  const [noteData, setNoteData] = useState({ title: "", content: "" });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);

    const oversized = selected.filter(f => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (oversized.length) {
      toast.error(`Each file must be under ${MAX_SIZE_MB}MB`);
      e.target.value = "";
      return;
    }

    const combined = [...files, ...selected];
    if (combined.length > MAX_FILES) {
      toast.error(`You can attach up to ${MAX_FILES} files`);
      e.target.value = "";
      return;
    }

    setFiles(combined);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createNote(token, noteData, files);
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
        <h2 className="text-white text-2xl mb-6 font-bold">Create New Note</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Content"
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
          rows="4"
          value={noteData.content}
          onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
          required
        />

        {/* File attachments */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">
              Attachments{" "}
              <span className="text-gray-500">(optional · images &amp; PDF · max 5MB each)</span>
            </span>
            <span className="text-gray-500 text-xs">{files.length}/{MAX_FILES}</span>
          </div>

          {files.length > 0 && (
            <div className="flex flex-col gap-2 mb-3">
              {files.map((file, i) => (
                <FilePreview key={i} file={file} onRemove={() => removeFile(i)} />
              ))}
            </div>
          )}

          {files.length < MAX_FILES && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full border border-dashed border-gray-600 hover:border-purple-500 text-gray-400 hover:text-purple-400 p-3 rounded text-sm transition-colors"
              >
                + Add files
              </button>
            </>
          )}
        </div>

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
