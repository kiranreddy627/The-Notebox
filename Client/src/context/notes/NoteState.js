import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8080";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes 
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const json = await response.json();
        setNotes(json);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a note function 
  const addNote = async (title, description, dueDate) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes((prevNotes) => [...prevNotes, newNote]);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note 
  const deleteNote = async (noteId) => {
    try {
      console.log("Attempting to delete note with ID:", noteId);
  
      const response = await fetch(`${host}/api/notes/deletenote/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error(`Error ${response.status}: ${errorData.message || 'An error occurred'}`);
      }
  
      // Update state to remove deleted note
      setNotes(notes.filter(note => note._id !== noteId));
      console.log('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete the note. Please try again.');
    }
  };
  

  // Edit a note
  const editNote = async (id, title, description, dueDate) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (response.ok) {
        const updatedNotes = notes.map((note) =>
          note._id === id ? { ...note, title, description, dueDate } : note
        );
        setNotes(updatedNotes);
      } else {
        console.error("Error editing note:", response.status);
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
