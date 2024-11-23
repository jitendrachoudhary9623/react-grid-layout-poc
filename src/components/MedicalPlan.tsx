import React, { useState } from 'react';
import './MedicalPlan.css';

interface SubItem {
  text: string;
  time?: string;
  checked?: boolean;
}

interface PlanItem {
  title: string;
  subItems?: SubItem[];
}

interface MedicalPlanProps {
  plans: PlanItem[];
}

const MedicalPlan: React.FC<MedicalPlanProps> = ({ plans: initialPlans }) => {
  const [plans, setPlans] = useState<PlanItem[]>(initialPlans);

  const handleCheckboxChange = (planIndex: number, subItemIndex: number) => {
    setPlans(currentPlans => {
      const newPlans = [...currentPlans];
      const plan = { ...newPlans[planIndex] };
      const subItems = [...(plan.subItems || [])];
      
      subItems[subItemIndex] = {
        ...subItems[subItemIndex],
        checked: !subItems[subItemIndex].checked
      };
      
      plan.subItems = subItems;
      newPlans[planIndex] = plan;
      return newPlans;
    });
  };

  return (
    <div className="plan-card">
      <div className="plan-header">
        <h3 className="plan-title">Medical Plan / Discharge Barriers</h3>
      </div>
      <div className="plan-content">
        {plans.map((plan, planIndex) => (
          <div 
            key={`${plan.title}-${planIndex}`} 
            className="plan-section"
            role="group"
            aria-label={plan.title}
          >
            <div className="plan-section-title">
              {plan.title}
            </div>
            {plan.subItems && (
              <div className="plan-items">
                {plan.subItems.map((item, subItemIndex) => (
                  <div 
                    key={`${plan.title}-${planIndex}-${subItemIndex}`} 
                    className={`plan-item ${item.checked ? 'completed' : 'pending'}`}
                  >
                    <input
                      id={`checkbox-${planIndex}-${subItemIndex}`}
                      type="checkbox"
                      checked={item.checked || false}
                      onChange={() => handleCheckboxChange(planIndex, subItemIndex)}
                      className="plan-checkbox"
                      aria-label={item.text}
                    />
                    <span className="plan-text">{item.text}</span>
                    {item.time && (
                      <span className="plan-time" aria-label={`Time: ${item.time}`}>
                        {item.time}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalPlan;
