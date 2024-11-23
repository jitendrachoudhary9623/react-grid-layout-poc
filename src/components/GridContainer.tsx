import React from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import ErrorBoundary from './ErrorBoundary';
import SystemAssessment from './SystemAssessment';
import MedicalPlan from './MedicalPlan';
import DrawingCanvas from './DrawingCanvas';
import RichTextEditor from './RichTextEditor';
import VitalSignsTrend from './VitalSignsTrend';
import MedicationForm from './MedicationForm';
import ProgressNotesForm from './ProgressNotesForm';
import LabResultsForm from './LabResultsForm';
import ComplexGridForm from './ComplexGridForm';

interface InfoCardProps {
  label: string;
  value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, value }) => (
  <div 
    className="info-card"
    role="group"
    aria-label={label}
  >
    <div className="card-content">
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
    </div>
  </div>
);

interface GridContainerProps {
  layouts: Layout[];
  containerWidth: number;
  isEditMode: boolean;
  visibleItems: string[];
  patientInfo: {
    name: string;
    age: number;
    gender: string;
    code: string;
    mobility: string;
    location: string;
    condition: string;
    procedure: string;
    admissionDate: string;
  };
  assessments: Record<string, any>;
  medicalPlans: Record<string, any>;
  onLayoutChange: (layout: Layout[]) => void;
  onDeleteItem: (itemId: string) => void;
}

const GridContainer: React.FC<GridContainerProps> = ({
  layouts,
  containerWidth,
  isEditMode,
  visibleItems,
  patientInfo,
  assessments,
  medicalPlans,
  onLayoutChange,
  onDeleteItem
}) => {
  const renderGridItem = (key: string, content: React.ReactNode) => {
    if (!visibleItems.includes(key)) return null;

    return (
      <div key={key} className={`grid-item ${isEditMode ? 'draggable' : ''}`}>
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteItem(key);
          }}
          aria-label={`Delete ${key}`}
        >
          ×
        </button>
        <ErrorBoundary componentName={key}>
          {content}
        </ErrorBoundary>
      </div>
    );
  };

  const patientInfoCards = [
    { id: 'name', label: 'Name', value: patientInfo.name },
    { id: 'age', label: 'Age', value: patientInfo.age },
    { id: 'gender', label: 'Gender', value: patientInfo.gender },
    { id: 'code', label: 'Code', value: patientInfo.code },
    { id: 'mobility', label: 'Mobility', value: patientInfo.mobility },
    { id: 'location', label: 'Location', value: patientInfo.location },
    { id: 'condition', label: 'Condition', value: patientInfo.condition },
    { id: 'procedure', label: 'Procedure', value: patientInfo.procedure },
    { id: 'admission', label: 'Date of Admission', value: patientInfo.admissionDate }
  ];

  return (
    <GridLayout
      className={`layout ${isEditMode ? 'edit-mode' : 'use-mode'}`}
      layout={layouts.filter(item => visibleItems.includes(item.i))}
      cols={15}
      rowHeight={80}
      width={containerWidth}
      margin={[0, 0]}
      containerPadding={[0, 0]}
      isDraggable={isEditMode}
      isResizable={isEditMode}
      onLayoutChange={onLayoutChange}
      preventCollision={true}
      verticalCompact={true}
      compactType="vertical"
      useCSSTransforms={true}
    >
      {/* Patient Info Cards */}
      {patientInfoCards.map(card => 
        renderGridItem(card.id, <InfoCard label={card.label} value={card.value} />)
      )}

      {/* System Assessment Section */}
      {Object.entries(assessments).map(([key, assessment]) => 
        renderGridItem(key, 
          <SystemAssessment 
            assessments={{ 
              [key]: assessment,
              safety: assessment,
              neuro: assessment,
              resp: assessment,
              cardiac: assessment,
              gigu: assessment,
              mskSkin: assessment
            }} 
          />
        )
      )}

      {/* Medical Section */}
      {Object.entries(medicalPlans).map(([key, plan]) => 
        renderGridItem(`plan-${key}`, <MedicalPlan plans={[plan]} />)
      )}

      {renderGridItem("vital-signs", <VitalSignsTrend />)}
      {renderGridItem("medication", <MedicationForm />)}
      {renderGridItem("progress-notes", <ProgressNotesForm />)}
      {renderGridItem("lab-results", <LabResultsForm />)}

      {/* Additional Tools */}
      {renderGridItem("drawing-canvas", <DrawingCanvas />)}
      {renderGridItem("text-editor", <RichTextEditor />)}

      {/* Complex Form */}
      {renderGridItem("complex-form", <ComplexGridForm />)}
    </GridLayout>
  );
};

export default GridContainer;
