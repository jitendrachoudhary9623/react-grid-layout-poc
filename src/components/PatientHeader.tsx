import React from 'react';

interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  code: string;
  mobility: string;
  location: string;
  condition: string;
  procedure: string;
  admissionDate: string;
}

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

const PatientHeader: React.FC<PatientInfo> = ({
  name,
  age,
  gender,
  code,
  mobility,
  location,
  condition,
  procedure,
  admissionDate
}) => {
  return (
    <div 
      className="patient-header"
      role="banner"
      aria-label="Patient Information"
    >
      <div className="info-cards-container">
        <InfoCard label="Name" value={name} />
        <InfoCard label="Age" value={age} />
        <InfoCard label="Gender" value={gender} />
        <InfoCard label="Code" value={code} />
        <InfoCard label="Mobility" value={mobility} />
        <InfoCard label="Location" value={location} />
        <InfoCard label="Condition" value={condition} />
        <InfoCard label="Procedure" value={procedure} />
        <InfoCard label="Date of Admission" value={admissionDate} />
      </div>
    </div>
  );
};

export default PatientHeader;
