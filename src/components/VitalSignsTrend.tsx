import React, { useState } from 'react';
import './VitalSignsTrend.css';

interface VitalSign {
  time: string;
  temperature: string;
  heartRate: string;
  bloodPressure: string;
  respiratoryRate: string;
  oxygenSaturation: string;
}

interface VitalRanges {
  min: number;
  max: number;
  unit: string;
}

const vitalRanges: Record<string, VitalRanges> = {
  temperature: { min: 35, max: 37.5, unit: '°C' },
  heartRate: { min: 60, max: 100, unit: 'bpm' },
  respiratoryRate: { min: 12, max: 20, unit: 'breaths/min' },
  oxygenSaturation: { min: 95, max: 100, unit: '%' }
};

const VitalSignsTrend: React.FC = () => {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);
  const [currentVital, setCurrentVital] = useState<VitalSign>({
    time: '',
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
    oxygenSaturation: ''
  });

  const validateValue = (field: keyof typeof vitalRanges, value: string): string => {
    if (!value) return '';
    const numValue = parseFloat(value);
    const range = vitalRanges[field];
    if (numValue < range.min) return 'low';
    if (numValue > range.max) return 'high';
    return 'normal';
  };

  const addVitalSign = () => {
    if (currentVital.time) {
      setVitalSigns(prev => [...prev, currentVital].sort((a, b) => a.time.localeCompare(b.time)));
      setCurrentVital({
        time: '',
        temperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: '',
        oxygenSaturation: ''
      });
    }
  };

  const handleInputChange = (field: keyof VitalSign, value: string) => {
    setCurrentVital(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isValidBP = (bp: string): boolean => {
    return /^\d{2,3}\/\d{2,3}$/.test(bp);
  };

  const getVitalClass = (field: keyof typeof vitalRanges, value: string): string => {
    return `vital-value ${validateValue(field, value)}`;
  };

  const getBPClass = (bp: string): string => {
    if (!bp) return '';
    const [systolic, diastolic] = bp.split('/').map(Number);
    if (systolic > 140 || diastolic > 90) return 'vital-value high';
    if (systolic < 90 || diastolic < 60) return 'vital-value low';
    return 'vital-value normal';
  };

  return (
    <div className="vitals-container">
      <div className="vitals-header">
        <h3 className="vitals-title">Vital Signs Trend</h3>
      </div>
      <div className="vitals-toolbar">
        <div className="input-group">
          <label>Time:</label>
          <input
            type="time"
            value={currentVital.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            className="time-input"
          />
        </div>
        <div className="input-group">
          <label>Temperature ({vitalRanges.temperature.unit}):</label>
          <input
            type="number"
            step="0.1"
            min={vitalRanges.temperature.min}
            max={vitalRanges.temperature.max}
            value={currentVital.temperature}
            onChange={(e) => handleInputChange('temperature', e.target.value)}
            placeholder={`${vitalRanges.temperature.min}-${vitalRanges.temperature.max}`}
            className={getVitalClass('temperature', currentVital.temperature)}
          />
        </div>
        <div className="input-group">
          <label>Heart Rate ({vitalRanges.heartRate.unit}):</label>
          <input
            type="number"
            min={vitalRanges.heartRate.min}
            max={vitalRanges.heartRate.max}
            value={currentVital.heartRate}
            onChange={(e) => handleInputChange('heartRate', e.target.value)}
            placeholder={`${vitalRanges.heartRate.min}-${vitalRanges.heartRate.max}`}
            className={getVitalClass('heartRate', currentVital.heartRate)}
          />
        </div>
        <div className="input-group">
          <label>Blood Pressure (mmHg):</label>
          <input
            type="text"
            value={currentVital.bloodPressure}
            onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
            placeholder="120/80"
            className={isValidBP(currentVital.bloodPressure) ? getBPClass(currentVital.bloodPressure) : ''}
          />
        </div>
        <div className="input-group">
          <label>Respiratory Rate ({vitalRanges.respiratoryRate.unit}):</label>
          <input
            type="number"
            min={vitalRanges.respiratoryRate.min}
            max={vitalRanges.respiratoryRate.max}
            value={currentVital.respiratoryRate}
            onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
            placeholder={`${vitalRanges.respiratoryRate.min}-${vitalRanges.respiratoryRate.max}`}
            className={getVitalClass('respiratoryRate', currentVital.respiratoryRate)}
          />
        </div>
        <div className="input-group">
          <label>O2 Saturation ({vitalRanges.oxygenSaturation.unit}):</label>
          <input
            type="number"
            min={vitalRanges.oxygenSaturation.min}
            max={vitalRanges.oxygenSaturation.max}
            value={currentVital.oxygenSaturation}
            onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
            placeholder={`${vitalRanges.oxygenSaturation.min}-${vitalRanges.oxygenSaturation.max}`}
            className={getVitalClass('oxygenSaturation', currentVital.oxygenSaturation)}
          />
        </div>
        <button 
          onClick={addVitalSign} 
          className="action-button"
          disabled={!currentVital.time}
        >
          Add Vital Signs
        </button>
      </div>
      <div className="vitals-content">
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#28a745' }}></div>
            <span>Normal</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#dc3545' }}></div>
            <span>High</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#ffc107' }}></div>
            <span>Low</span>
          </div>
        </div>
        <table className="vitals-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Temp ({vitalRanges.temperature.unit})</th>
              <th>HR ({vitalRanges.heartRate.unit})</th>
              <th>BP (mmHg)</th>
              <th>RR ({vitalRanges.respiratoryRate.unit})</th>
              <th>O2 Sat ({vitalRanges.oxygenSaturation.unit})</th>
            </tr>
          </thead>
          <tbody>
            {vitalSigns.map((vital, index) => (
              <tr key={index}>
                <td className="time-stamp">{vital.time}</td>
                <td className={getVitalClass('temperature', vital.temperature)}>{vital.temperature}</td>
                <td className={getVitalClass('heartRate', vital.heartRate)}>{vital.heartRate}</td>
                <td className={isValidBP(vital.bloodPressure) ? getBPClass(vital.bloodPressure) : ''}>
                  {vital.bloodPressure}
                </td>
                <td className={getVitalClass('respiratoryRate', vital.respiratoryRate)}>{vital.respiratoryRate}</td>
                <td className={getVitalClass('oxygenSaturation', vital.oxygenSaturation)}>{vital.oxygenSaturation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VitalSignsTrend;
