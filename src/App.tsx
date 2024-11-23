import React, { useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';
import GridContainer from './components/GridContainer';
import { patientInfo, assessments, medicalPlans, initialLayouts } from './data/initialData';

function App() {
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isEditMode, setIsEditMode] = useState(true);
  const [layouts, setLayouts] = useState<Layout[]>(initialLayouts);
  const [visibleItems, setVisibleItems] = useState<string[]>(
    initialLayouts.map(item => item.i)
  );

  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.App');
      if (container) {
        setContainerWidth(container.clientWidth - 40);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLayoutChange = (newLayout: Layout[]) => {
    if (isEditMode) {
      setLayouts(newLayout.filter(item => visibleItems.includes(item.i)));
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDeleteItem = (itemId: string) => {
    setVisibleItems(current => current.filter(id => id !== itemId));
    setLayouts(current => current.filter(item => item.i !== itemId));
  };

  return (
    <div className="App">
      <div className="mode-toggle">
        <button 
          onClick={toggleEditMode}
          className={`mode-button ${isEditMode ? 'edit-mode' : 'use-mode'}`}
        >
          {isEditMode ? '🔒 Lock Layout' : '🔓 Edit Layout'}
        </button>
        <span className="mode-indicator">
          {isEditMode ? 'Edit Mode: Drag to rearrange' : 'Use Mode: Layout locked'}
        </span>
      </div>
      
      <GridContainer
        layouts={layouts}
        containerWidth={containerWidth}
        isEditMode={isEditMode}
        visibleItems={visibleItems}
        patientInfo={patientInfo}
        assessments={assessments}
        medicalPlans={medicalPlans}
        onLayoutChange={handleLayoutChange}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default App;
