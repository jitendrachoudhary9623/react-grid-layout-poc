export const patientInfo = {
  name: "Smith, Elizabeth",
  age: 70,
  gender: "Female",
  code: "Full",
  mobility: "1PA with walker",
  location: "Vancouver",
  condition: "Class 1, sinus rhythm",
  procedure: "Cardiac Surgery",
  admissionDate: "January 1, 2024"
};

export const assessments = {
  safety: {
    title: "Safety Alerts",
    details: [
      "Safety Alert: Bed alarm",
      "Pain: 6/10, regular tylenol/hydromorphone 2mg, last dose 1300"
    ],
    status: 'warning' as const
  },
 
};

export const medicalPlans = {
  cabg: {
    title: "Post CABG Pathway",
    subItems: [
      { text: "Mobilize TID", checked: false },
      { text: "Stairs", checked: false },
      { text: "Wires out Jan 6", time: "1300", checked: false },
      { text: "Foley out Jan 6", time: "0600", checked: false },
      { text: "Chest tube out Jan 7", time: "1300", checked: false }
    ]
  },
  delirium: {
    title: "Delirium",
    subItems: [
      { text: "Bed alarm", checked: false },
      { text: "CAM Scores qshift", checked: false }
    ]
  },
  kidney: {
    title: "Chronic kidney disease",
    subItems: [
      { text: "Stable", checked: true }
    ]
  }
};

export const initialLayouts = [
  // Patient Info Cards - All in First Row
  { i: 'name', x: 0, y: 0, w: 2, h: 1 },
  { i: 'age', x: 2, y: 0, w: 1, h: 1 },
  { i: 'gender', x: 3, y: 0, w: 1, h: 1 },
  { i: 'code', x: 4, y: 0, w: 1, h: 1 },
  { i: 'mobility', x: 5, y: 0, w: 2, h: 1 },
  { i: 'location', x: 7, y: 0, w: 1, h: 1 },
  { i: 'condition', x: 8, y: 0, w: 2, h: 1 },
  { i: 'procedure', x: 10, y: 0, w: 1, h: 1 },
  { i: 'admission', x: 11, y: 0, w: 1, h: 1 },
  
  // System Assessment Section (Grouped together)
  { i: 'safety', x: 0, y: 1, w: 4, h: 4, minH: 3, minW: 1 },
  { i: 'neuro', x: 4, y: 1, w: 4, h: 4, minH: 3, minW: 1 },
  { i: 'resp', x: 8, y: 1, w: 4, h: 4, minH: 3, minW: 1 },
  { i: 'cardiac', x: 0, y: 5, w: 4, h: 4, minH: 3, minW: 1 },
  { i: 'gigu', x: 4, y: 5, w: 4, h: 4, minH: 3, minW: 1 },
  { i: 'mskSkin', x: 8, y: 5, w: 4, h: 4, minH: 3, minW: 1 },
  
  // Medical Section (Grouped together)
  { i: 'vital-signs', x: 0, y: 9, w: 6, h: 6, minH: 4, minW: 1 },
  { i: 'medication', x: 6, y: 9, w: 6, h: 6, minH: 4, minW: 1 },
  { i: 'plan-cabg', x: 0, y: 15, w: 4, h: 5, minH: 4, minW: 1 },
  { i: 'plan-delirium', x: 4, y: 15, w: 4, h: 4, minH: 3, minW: 1 },
  { i: 'plan-kidney', x: 8, y: 15, w: 4, h: 3, minH: 2, minW: 1 },
  { i: 'progress-notes', x: 0, y: 20, w: 6, h: 6, minH: 4, minW: 1 },
  { i: 'lab-results', x: 6, y: 20, w: 6, h: 6, minH: 4, minW: 1 },
  
  // Additional Tools
  { i: 'drawing-canvas', x: 0, y: 26, w: 6, h: 6, minH: 4, minW: 1 },
  { i: 'text-editor', x: 6, y: 26, w: 6, h: 6, minH: 4, minW: 1 },
  
  // Complex Form at the bottom
  // { i: 'complex-form', x: 0, y: 32, w: 12, h: 8, minH: 6, minW: 1 }
];
