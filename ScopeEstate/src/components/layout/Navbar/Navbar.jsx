import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaBell, 
  FaSignOutAlt, 
  FaPlus, 
  FaStickyNote, 
  FaTrash, 
  FaSave, 
  FaTimes,
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaTrashAlt
} from "react-icons/fa";

function Navbar() {
  const [isStickyOpen, setIsStickyOpen] = useState(false);
  const [noteColor, setNoteColor] = useState("blue");
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  const toggleSticky = () => {
    setIsStickyOpen(!isStickyOpen);
    if (!isStickyOpen) {
      setNoteText("");
      setNoteColor("blue");
      setEditingNoteId(null);
    }
  };

  const handleSaveNote = () => {
    if (noteText.trim() === "") return;

    if (editingNoteId) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNoteId
            ? { ...note, color: noteColor, text: noteText }
            : note
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        color: noteColor,
        text: noteText,
      };
      setNotes([newNote, ...notes]);
    }

    setNoteText("");
    setNoteColor("blue");
    setEditingNoteId(null);
    setIsStickyOpen(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note) => {
    setNoteText(note.text);
    setNoteColor(note.color);
    setEditingNoteId(note.id);
    setIsStickyOpen(true);
    setDropdownOpenId(null);
  };

  const handleViewNote = (note) => {
    setViewingNote(note);
    setDropdownOpenId(null);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-end gap-4 items-center sticky top-0 z-50">
        <button 
          className="text-sm cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300"
          title="Clear Cache"
        >
          <FaTrash />
        </button>
        <button
          onClick={toggleSticky}
          className="text-sm cursor-pointer bg-yellow-300 p-2 rounded hover:bg-yellow-400"
          title="Sticky Note"
        >
          <FaStickyNote />
        </button>
        <button 
          className="text-sm cursor-pointer bg-green-500 text-white p-2 rounded hover:bg-green-600"
          title="Create New"
        >
          <FaPlus />
        </button>
        <button 
          className="text-sm cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          title="Notifications"
        >
          <FaBell />
        </button>
        <button 
          className="text-sm cursor-pointer bg-red-500 text-white p-2 rounded hover:bg-red-600"
          title="Logout"
        >
          <FaSignOutAlt />
        </button>
      </div>

      {/* Sticky Notes Display */}
      {notes.length > 0 && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`relative border-l-4 p-4 shadow rounded bg-white border-${note.color}-500`}
            >
              {/* Dropdown Trigger */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() =>
                    setDropdownOpenId(
                      dropdownOpenId === note.id ? null : note.id
                    )
                  }
                  className="text-gray-500 hover:text-black"
                  title="Actions"
                >
                  <FaEllipsisV />
                </button>

                {dropdownOpenId === note.id && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow w-32 z-10">
                    <button
                      onClick={() => handleViewNote(note)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                    >
                      <FaEye /> View
                    </button>
                    <button
                      onClick={() => handleEditNote(note)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left text-red-500"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-700 whitespace-pre-line">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Sticky Note Add/Edit Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-gray-100 z-50 transform transition-transform duration-700 ease-in-out ${
          isStickyOpen ? "translate-x-12" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={toggleSticky}
          className="absolute cursor-pointer top-4 left-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 z-50"
          title="Close"
        >
          <FaTimes />
        </button>

        <div className="flex items-start justify-center h-full pt-16">
          <div className="bg-white rounded shadow-lg w-full max-w-2xl p-6 m-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingNoteId ? "Edit Note" : "Add Note"}
            </h2>

            <div className="border rounded p-4 bg-gray-50">
              <h3 className="text-md font-medium mb-4">Note Details</h3>

              {/* Color dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Color Code
                </label>
                <select
                  value={noteColor}
                  onChange={(e) => setNoteColor(e.target.value)}
                  className="w-48 border rounded px-3 py-2"
                >
                  <option value="blue">🔵 Blue</option>
                  <option value="yellow">🟡 Yellow</option>
                  <option value="green">🟢 Green</option>
                  <option value="red">🔴 Red</option>
                </select>
              </div>

              {/* Note text */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Note</label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full h-40 border rounded p-3 resize-none"
                  placeholder="Write your note here..."
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 items-center">
                <button
                  onClick={handleSaveNote}
                  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={toggleSticky}
                  className="text-sm cursor-pointer text-gray-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {viewingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">View Note</h3>
              <button
                onClick={() => setViewingNote(null)}
                className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <FaTimes />
              </button>
            </div>
            <div
              className="border-l-4 p-4"
              style={{ borderColor: viewingNote.color }}
            >
              <p className="text-gray-800 whitespace-pre-line">
                {viewingNote.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;