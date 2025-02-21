import { useState, useEffect } from "react";
import { Sun, Moon, Trash2, PlusCircle, CheckCircle, XCircle } from "lucide-react";

const API_URL ="http://localhost:5000/notes";


export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showNewNote, setShowNewNote] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchNotes();
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const fetchNotes = async () => {
    const response = await fetch(API_URL);
    
    const data = await response.json();
    setNotes(data);
  };

  const addNote = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newNote = { title: newTitle, content: newContent };
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    const data = await response.json();
    setNotes([...notes, data]);
    setNewTitle("");
    setNewContent("");
    setShowNewNote(false);
  };

  const updateNote = async (id, field, value) => {
    const updatedNote = notes.find((note) => note.id === id);
    if (!updatedNote) return;
    const newNote = { ...updatedNote, [field]: value };
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    setNotes(notes.map((note) => (note.id === id ? newNote : note)));
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Notes App</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowNewNote(true)} className="p-2 bg-blue-500 text-white rounded">
            <PlusCircle className="w-5 h-5 inline" /> Add Note
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-500 text-white rounded">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {showNewNote && (
        <div className="mb-4 p-4 border rounded bg-white shadow">
          <input
            value={newTitle}
            placeholder="Title"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newContent}
            placeholder="Write your note here..."
            rows={4}
            className="w-full p-2 border rounded"
            onChange={(e) => setNewContent(e.target.value)}
          ></textarea>
          <div className="flex gap-2 mt-2">
            <button onClick={addNote} className="p-2 bg-green-500 text-white rounded">
              <CheckCircle className="w-5 h-5 inline" /> Save
            </button>
            <button onClick={() => setShowNewNote(false)} className="p-2 bg-red-500 text-white rounded">
              <XCircle className="w-5 h-5 inline" /> Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded bg-white shadow">
            <input
              value={note.title}
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
              onChange={(e) => updateNote(note.id, "title", e.target.value)}
            />
            <textarea
              value={note.content}
              placeholder="Write your note here..."
              rows={4}
              className="w-full p-2 border rounded"
              onChange={(e) => updateNote(note.id, "content", e.target.value)}
            ></textarea>
            <button onClick={() => deleteNote(note.id)} className="mt-2 p-2 bg-red-500 text-white rounded">
              <Trash2 className="w-5 h-5 inline" /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
