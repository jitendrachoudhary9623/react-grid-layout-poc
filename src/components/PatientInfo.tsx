import React from 'react';

interface InfoCardProps {
  label: string;
  value: string | number;
}

interface PatientInfoProps {
  info: {
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
  onDelete: (key: string) => void;
  isEditMode: boolean;
}

const InfoCard: React.FC<InfoCardProps & { id: string; onDelete: (key: string) => void; isEditMode: boolean }> = ({ 
  label, 
  value, 
  id, 
  onDelete,
  isEditMode 
}) => (
  <div 
    className={`grid-item info-card-container ${isEditMode ? 'draggable' : ''}`}
    key={id}
  >
    <button
      className="delete-button"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(id);
      }}
      aria-label={`Delete ${label}`}
    >
      ×
    </button>
    <div className="info-card" role="group" aria-label={label}>
      <div className="card-content">
        <div className="card-label">{label}</div>
        <div className="card-value">{value}</div>
      </div>
    </div>
  </div>
);

const PatientInfo: React.FC<PatientInfoProps> = ({ info, onDelete, isEditMode }) => {
  const infoCards = [
    { id: 'name', label: 'Name', value: info.name },
    { id: 'age', label: 'Age', value: info.age },
    { id: 'gender', label: 'Gender', value: info.gender },
    { id: 'code', label: 'Code', value: info.code },
    { id: 'mobility', label: 'Mobility', value: info.mobility },
    { id: 'location', label: 'Location', value: info.location },
    { id: 'condition', label: 'Condition', value: info.condition },
    { id: 'procedure', label: 'Procedure', value: info.procedure },
    { id: 'admission', label: 'Date of Admission', value: info.admissionDate }
  ];

  return (
    <>
      {infoCards.map(card => (
        <InfoCard
          key={card.id}
          id={card.id}
          label={card.label}
          value={card.value}
          onDelete={onDelete}
          isEditMode={isEditMode}
        />
      ))}
    </>
  );
};

export default PatientInfo;
