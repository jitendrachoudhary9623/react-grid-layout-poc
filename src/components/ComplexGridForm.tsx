import React, { useState, useEffect, useCallback } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'time';
  value: string;
  label: string;
  options?: string[];
  min?: number;
  max?: number;
}

const ComplexGridForm: React.FC = () => {
  const [layout, setLayout] = useState<Layout[]>([
    // Header row
    { i: 'header-1', x: 0, y: 0, w: 2, h: 1, static: true },
    { i: 'header-2', x: 2, y: 0, w: 2, h: 1, static: true },
    { i: 'header-3', x: 4, y: 0, w: 2, h: 1, static: true },
    { i: 'header-4', x: 6, y: 0, w: 2, h: 1, static: true },
    { i: 'header-5', x: 8, y: 0, w: 2, h: 1, static: true },
    { i: 'header-6', x: 10, y: 0, w: 2, h: 1, static: true },
    { i: 'header-7', x: 12, y: 0, w: 2, h: 1, static: true },
  ]);

  const [formData, setFormData] = useState<{ [key: string]: FormField }>({
    'vital-1': { id: 'vital-1', type: 'time', value: '', label: 'Time' },
    'vital-2': { id: 'vital-2', type: 'number', value: '', label: 'Temperature', min: 35, max: 42 },
    'vital-3': { id: 'vital-3', type: 'number', value: '', label: 'Heart Rate', min: 40, max: 200 },
    'vital-4': { id: 'vital-4', type: 'number', value: '', label: 'Blood Pressure', min: 0, max: 300 },
    'vital-5': { id: 'vital-5', type: 'number', value: '', label: 'Respiratory Rate', min: 0, max: 60 },
    'vital-6': { 
      id: 'vital-6', 
      type: 'select', 
      value: '', 
      label: 'Pain Score', 
      options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] 
    },
    'vital-7': { id: 'vital-7', type: 'text', value: '', label: 'Notes' },
  });

  const [containerWidth, setContainerWidth] = useState(1400);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.complex-grid-form');
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFieldType = useCallback((column: number): FormField['type'] => {
    switch (column) {
      case 0: return 'time';
      case 1: return 'number';
      case 2: return 'number';
      case 3: return 'text';
      case 4: return 'number';
      case 5: return 'select';
      case 6: return 'text';
      default: return 'text';
    }
  }, []);

  const getFieldValidation = useCallback((column: number): Partial<FormField> => {
    switch (column) {
      case 1: return { min: 35, max: 42 }; // Temperature
      case 2: return { min: 40, max: 200 }; // Heart Rate
      case 4: return { min: 0, max: 60 }; // Respiratory Rate
      default: return {};
    }
  }, []);

  const generateRows = useCallback(() => {
    const rows: Layout[] = [];
    for (let i = 1; i <= 24; i++) {
      const y = i;
      for (let j = 0; j < 7; j++) {
        // Create a truly unique identifier for each field
        const fieldId = `grid-field-${i}-${j}-${Date.now()}`;
        rows.push({
          i: fieldId,
          x: j * 2,
          y: y,
          w: 2,
          h: 1,
          isDraggable: true
        });
      }
    }
    return rows;
  }, []);

  // Store generated layouts to prevent regeneration on each render
  const [generatedLayouts, setGeneratedLayouts] = useState<Layout[]>([]);

  // Initialize layouts and form data once
  useEffect(() => {
    const rows = generateRows();
    setGeneratedLayouts(rows);
    
    setFormData(prevFormData => {
      const newFormData = { ...prevFormData };
      
      rows.forEach(row => {
        if (!newFormData[row.i]) {
          const column = Math.floor(row.x / 2);
          newFormData[row.i] = {
            id: row.i,
            type: getFieldType(column),
            value: '',
            label: '',
            ...(column === 5 ? { 
              options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] 
            } : {}),
            ...(getFieldValidation(column))
          };
        }
      });

      return newFormData;
    });
  }, [generateRows, getFieldType, getFieldValidation]);

  const handleInputChange = (fieldId: string, value: string) => {
    const field = formData[fieldId];
    
    // Validate number inputs
    if (field.type === 'number') {
      const numValue = Number(value);
      if (field.min !== undefined && numValue < field.min) return;
      if (field.max !== undefined && numValue > field.max) return;
    }

    setFormData(prev => ({
      ...prev,
      [fieldId]: {
        ...prev[fieldId],
        value
      }
    }));
  };

  const renderField = (fieldId: string) => {
    const field = formData[fieldId];
    if (!field) return null;

    const commonProps = {
      'aria-label': field.label,
      id: fieldId,
      className: "form-input",
      value: field.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
        handleInputChange(fieldId, e.target.value)
    };

    switch (field.type) {
      case 'select':
        return (
          <select
            {...commonProps}
            className="form-select"
          >
            <option value="">Select</option>
            {field.options?.map(opt => (
              <option key={`${fieldId}-${opt}`} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'time':
        return (
          <input
            type="time"
            {...commonProps}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            min={field.min}
            max={field.max}
            {...commonProps}
          />
        );
      default:
        return (
          <input
            type="text"
            {...commonProps}
          />
        );
    }
  };

  const allLayouts = [
    ...layout,
    ...generatedLayouts
  ];

  return (
    <div className="complex-grid-form">
      <h3>Complex Medical Form</h3>
      <div className="grid-container">
        <GridLayout
          className="layout"
          layout={allLayouts}
          cols={14}
          rowHeight={40}
          width={containerWidth}
          margin={[5, 5]}
          compactType={null}
          preventCollision={true}
          onLayoutChange={(newLayout) => {
            // Only update the non-header layouts
            const headerLayouts = layout;
            const nonHeaderLayouts = newLayout.filter(
              item => !item.i.startsWith('header-')
            );
            setLayout(headerLayouts);
            setGeneratedLayouts(nonHeaderLayouts);
          }}
        >
          {/* Headers */}
          <div key="header-1" className="grid-header" role="columnheader">Time</div>
          <div key="header-2" className="grid-header" role="columnheader">Temp</div>
          <div key="header-3" className="grid-header" role="columnheader">HR</div>
          <div key="header-4" className="grid-header" role="columnheader">BP</div>
          <div key="header-5" className="grid-header" role="columnheader">RR</div>
          <div key="header-6" className="grid-header" role="columnheader">Pain</div>
          <div key="header-7" className="grid-header" role="columnheader">Notes</div>

          {/* Form Fields */}
          {generatedLayouts.map((item) => (
            <div key={item.i} className="grid-item" role="gridcell">
              {renderField(item.i)}
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default ComplexGridForm;
