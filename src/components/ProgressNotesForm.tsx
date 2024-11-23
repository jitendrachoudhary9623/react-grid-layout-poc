import React, { useState } from 'react';

interface ProgressNote {
  time: string;
  category: string;
  note: string;
  signature: string;
}

const ProgressNotesForm: React.FC = () => {
  const [notes, setNotes] = useState<ProgressNote[]>([]);
  const [currentNote, setCurrentNote] = useState<ProgressNote>({
    time: '',
    category: '',
    note: '',
    signature: ''
  });

  const categories = [
    'Nursing Note',
    'Physician Note',
    'Therapy Note',
    'Social Work Note',
    'Dietary Note'
  ];

  const handleInputChange = (field: keyof ProgressNote, value: string) => {
    setCurrentNote(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addNote = () => {
    if (currentNote.time && currentNote.note && currentNote.signature) {
      setNotes([...notes, currentNote]);
      setCurrentNote({
        time: '',
        category: '',
        note: '',
        signature: ''
      });
    }
  };

  return (
    <div className="progress-notes-form">
      <h3>Progress Notes</h3>
      <div className="notes-input">
        <div className="input-row">
          <div className="input-group">
            <label>Time:</label>
            <input
              type="time"
              value={currentNote.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Category:</label>
            <select
              value={currentNote.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-group full-width">
          <label>Note:</label>
          <textarea
            value={currentNote.note}
            onChange={(e) => handleInputChange('note', e.target.value)}
            placeholder="Enter progress note..."
            rows={4}
          />
        </div>
        <div className="input-group">
          <label>Signature:</label>
          <input
            type="text"
            value={currentNote.signature}
            onChange={(e) => handleInputChange('signature', e.target.value)}
            placeholder="Your signature"
          />
        </div>
        <button onClick={addNote} className="add-note-button">
          Add Note
        </button>
      </div>
      <div className="notes-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Category</th>
              <th>Note</th>
              <th>Signature</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={index}>
                <td>{note.time}</td>
                <td>{note.category}</td>
                <td>{note.note}</td>
                <td>{note.signature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressNotesForm;
