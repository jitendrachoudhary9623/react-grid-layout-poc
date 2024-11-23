import React, { useState } from 'react';
import './MedicationForm.css';

interface Medication {
  time: string;
  name: string;
  dose: string;
  route: string;
  frequency: string;
  status: 'scheduled' | 'administered' | 'held' | 'missed';
  notes: string;
}

const MedicationForm: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentMed, setCurrentMed] = useState<Medication>({
    time: '',
    name: '',
    dose: '',
    route: '',
    frequency: '',
    status: 'scheduled',
    notes: ''
  });

  const routes = ['PO', 'IV', 'IM', 'SC', 'Topical', 'Inhaled', 'PR', 'SL'];
  const frequencies = ['Once', 'BID', 'TID', 'QID', 'Q4H', 'Q6H', 'Q8H', 'Q12H', 'Daily', 'PRN'];

  const addMedication = () => {
    if (currentMed.name && currentMed.dose) {
      setMedications(prev => [...prev, currentMed].sort((a, b) => a.time.localeCompare(b.time)));
      setCurrentMed({
        time: '',
        name: '',
        dose: '',
        route: '',
        frequency: '',
        status: 'scheduled',
        notes: ''
      });
    }
  };

  const handleInputChange = (field: keyof Medication, value: string) => {
    setCurrentMed(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearForm = () => {
    setCurrentMed({
      time: '',
      name: '',
      dose: '',
      route: '',
      frequency: '',
      status: 'scheduled',
      notes: ''
    });
  };

  const isFormValid = () => {
    return currentMed.name && currentMed.dose && currentMed.time && 
           currentMed.route && currentMed.frequency;
  };

  return (
    <div className="medication-container">
      <div className="medication-header">
        <h3 className="medication-title">Medication Administration</h3>
      </div>
      <div className="medication-content">
        <form className="medication-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>Time:</label>
            <input
              type="time"
              value={currentMed.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Medication Name:</label>
            <input
              type="text"
              value={currentMed.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter medication name"
              required
            />
          </div>
          <div className="input-group">
            <label>Dose:</label>
            <input
              type="text"
              value={currentMed.dose}
              onChange={(e) => handleInputChange('dose', e.target.value)}
              placeholder="Enter dose"
              required
            />
          </div>
          <div className="input-group">
            <label>Route:</label>
            <select
              value={currentMed.route}
              onChange={(e) => handleInputChange('route', e.target.value)}
              required
            >
              <option value="">Select Route</option>
              {routes.map(route => (
                <option key={route} value={route}>{route}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Frequency:</label>
            <select
              value={currentMed.frequency}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
              required
            >
              <option value="">Select Frequency</option>
              {frequencies.map(freq => (
                <option key={freq} value={freq}>{freq}</option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Status:</label>
            <select
              value={currentMed.status}
              onChange={(e) => handleInputChange('status', e.target.value as Medication['status'])}
              required
            >
              <option value="scheduled">Scheduled</option>
              <option value="administered">Administered</option>
              <option value="held">Held</option>
              <option value="missed">Missed</option>
            </select>
          </div>
          <div className="input-group notes-field">
            <label>Notes:</label>
            <textarea
              value={currentMed.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Enter any additional notes"
              rows={3}
            />
          </div>
        </form>
        
        <div className="action-buttons">
          <button 
            onClick={addMedication}
            className="action-button add-button"
            disabled={!isFormValid()}
          >
            Add Medication
          </button>
          <button 
            onClick={clearForm}
            className="action-button clear-button"
          >
            Clear Form
          </button>
        </div>

        <table className="medication-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Medication</th>
              <th>Dose/Route</th>
              <th>Frequency</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, index) => (
              <tr key={index}>
                <td>
                  <span className="time-badge">{med.time}</span>
                </td>
                <td>
                  <div className="medication-info">
                    <span className="medication-name">{med.name}</span>
                  </div>
                </td>
                <td>
                  <div className="medication-info">
                    <span className="medication-details">{med.dose} - {med.route}</span>
                  </div>
                </td>
                <td>{med.frequency}</td>
                <td>
                  <span className={`status-badge status-${med.status.toLowerCase()}`}>
                    {med.status}
                  </span>
                </td>
                <td>
                  <div className="medication-details">{med.notes}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicationForm;
