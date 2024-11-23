import React from 'react';
import './SystemAssessment.css';

interface Assessment {
  title: string;
  details: string[];
  status?: 'normal' | 'warning' | 'alert';
}

interface SystemAssessmentProps {
  assessments: {
    safety: Assessment;
    neuro: Assessment;
    resp: Assessment;
    cardiac: Assessment;
    gigu: Assessment;
    mskSkin: Assessment;
  };
}

const AssessmentItem: React.FC<{ 
  assessment: Assessment;
  id: string;
}> = ({ assessment, id }) => {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'warning':
        return '⚠️';
      case 'alert':
        return '🚨';
      case 'normal':
        return '✓';
      default:
        return null;
    }
  };

  return (
    <div 
      className={`assessment-card status-${assessment.status || 'normal'}`}
      role="region"
      aria-label={assessment.title}
      id={id}
    >
      <div className="assessment-header">
        <h4 className="assessment-title">
          {getStatusIcon(assessment.status)} {assessment.title}
        </h4>
      </div>
      <div className="assessment-content">
        {assessment.details.map((detail, index) => {
          const key = `${id}-detail-${index}`;
          const hasSymbol = detail.startsWith('✓') || detail.startsWith('✗');
          const symbol = detail.charAt(0);
          const text = hasSymbol ? detail.slice(1).trim() : detail;
          
          return (
            <div 
              key={key} 
              className="assessment-item"
              data-status={hasSymbol ? symbol : undefined}
              role="listitem"
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SystemAssessment: React.FC<SystemAssessmentProps> = ({ assessments }) => {
  return (
    <div 
      className="system-assessment"
      role="region" 
      aria-label="System Assessment"
    >
      <div className="assessment-content">
        <AssessmentItem 
          assessment={assessments.safety} 
          id="safety-assessment"
        />
        {/* <AssessmentItem 
          assessment={assessments.neuro} 
          id="neuro-assessment"
        />
        <AssessmentItem 
          assessment={assessments.resp} 
          id="resp-assessment"
        />
        <AssessmentItem 
          assessment={assessments.cardiac} 
          id="cardiac-assessment"
        />
        <AssessmentItem 
          assessment={assessments.gigu} 
          id="gigu-assessment"
        />
        <AssessmentItem 
          assessment={assessments.mskSkin} 
          id="msk-assessment"
        /> */}
      </div>
    </div>
  );
};

export default SystemAssessment;
