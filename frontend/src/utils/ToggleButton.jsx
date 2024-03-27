import React, { useState } from 'react';

export const ToggleButton = ({toggle,onToggle}) => {
  const [isToggled, setIsToggled] = useState(toggle);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onToggle(!isToggled)

  };

  return (
    <div className="flex items-center space-x-2 box-border">
      <label htmlFor="toggle" className="flex items-center cursor-pointer ">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="hidden "
            checked={isToggled}
            onChange={handleToggle}
          />
          <div className="toggle__line w-12 h-6 bg-gray-400 rounded-full shadow-inner transition-colors duration-200 "></div>
          <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 transition-all duration-300 ease-in-out"></div>
        </div>
        <div className={`ml-3 text-text-25 font-medium text-sm ${isToggled ? 'text-primary-500 ' : ''}`}>
          {isToggled ? 'ON' : 'OFF'}
        </div>
      </label>
    </div>
  );
};

