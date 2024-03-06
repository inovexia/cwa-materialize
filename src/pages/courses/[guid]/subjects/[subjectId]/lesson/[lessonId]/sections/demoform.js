import React, { useState } from 'react';
import TypeButtons from './typeButtons';
import DynamicFields from './demo';

const MainComponent = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleDrawerContent = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <TypeButtons handleDrawerContent={handleDrawerContent} />
      <DynamicFields selectedType={selectedType} />
    </div>
  );
};

export default MainComponent;
