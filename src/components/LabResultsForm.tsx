import React, { useState } from 'react';

interface LabResult {
  time: string;
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag?: 'H' | 'L' | 'C' | null;
}

const LabResultsForm: React.FC = () => {
  const [results, setResults] = useState<LabResult[]>([]);
  const [currentResult, setCurrentResult] = useState<LabResult>({
    time: '',
    testName: '',
    value: '',
    unit: '',
    referenceRange: '',
    flag: null
  });

  const commonTests = [
    { name: 'Hemoglobin', unit: 'g/dL', range: '12.0-15.5' },
    { name: 'WBC', unit: 'K/µL', range: '4.5-11.0' },
    { name: 'Platelets', unit: 'K/µL', range: '150-450' },
    { name: 'Sodium', unit: 'mEq/L', range: '135-145' },
    { name: 'Potassium', unit: 'mEq/L', range: '3.5-5.0' },
    { name: 'Creatinine', unit: 'mg/dL', range: '0.6-1.2' },
    { name: 'Glucose', unit: 'mg/dL', range: '70-100' }
  ];

  const handleInputChange = (field: keyof LabResult, value: string) => {
    setCurrentResult(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestSelect = (testName: string) => {
    const test = commonTests.find(t => t.name === testName);
    if (test) {
      setCurrentResult(prev => ({
        ...prev,
        testName: test.name,
        unit: test.unit,
        referenceRange: test.range
      }));
    }
  };

  const determineFlag = (value: string, range: string): LabResult['flag'] => {
    const numValue = parseFloat(value);
    const [min, max] = range.split('-').map(parseFloat);
    
    if (isNaN(numValue) || isNaN(min) || isNaN(max)) return null;
    
    if (numValue > max) return 'H';
    if (numValue < min) return 'L';
    return null;
  };

  const addResult = () => {
    if (currentResult.testName && currentResult.value) {
      const flag = determineFlag(currentResult.value, currentResult.referenceRange);
      setResults([...results, { ...currentResult, flag }]);
      setCurrentResult({
        time: '',
        testName: '',
        value: '',
        unit: '',
        referenceRange: '',
        flag: null
      });
    }
  };

  return (
    <div className="lab-results-form">
      <h3>Lab Results</h3>
      <div className="results-input">
        <div className="input-row">
          <div className="input-group">
            <label>Time:</label>
            <input
              type="time"
              value={currentResult.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Test Name:</label>
            <select
              value={currentResult.testName}
              onChange={(e) => handleTestSelect(e.target.value)}
            >
              <option value="">Select Test</option>
              {commonTests.map(test => (
                <option key={test.name} value={test.name}>{test.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Value:</label>
            <input
              type="text"
              value={currentResult.value}
              onChange={(e) => handleInputChange('value', e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div className="input-group">
            <label>Unit:</label>
            <input
              type="text"
              value={currentResult.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              placeholder="Unit"
            />
          </div>
          <div className="input-group">
            <label>Reference Range:</label>
            <input
              type="text"
              value={currentResult.referenceRange}
              onChange={(e) => handleInputChange('referenceRange', e.target.value)}
              placeholder="e.g., 12.0-15.5"
            />
          </div>
        </div>
        <button onClick={addResult} className="add-result-button">
          Add Result
        </button>
      </div>
      <div className="results-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Test</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Reference Range</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className={result.flag ? `flag-${result.flag.toLowerCase()}` : ''}>
                <td>{result.time}</td>
                <td>{result.testName}</td>
                <td>{result.value}</td>
                <td>{result.unit}</td>
                <td>{result.referenceRange}</td>
                <td>{result.flag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabResultsForm;
