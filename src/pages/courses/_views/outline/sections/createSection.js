import React, { useState } from 'react';
import ButtonType from './buttonType';
import DynamicFields from './demo';

const CreateSection = () => {
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

export default CreateSection;
