import { useState } from 'react';

const Dropdown = ({ modelConfigs, setSelectedModel, selectedModel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedModel(value);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-4 justify-end mt-10">
      <div className="relative text-right text-[#6C6C6C] cursor-pointer">
        <div
          className="be-vietnam text-base font-semibold  w-[350px] h-[40px] bg-[#FEF5F1] rounded-md focus:outline-none border-0 flex items-center justify-between pl-12"
          onClick={() => setIsOpen(!isOpen)}
        >
          {modelConfigs[selectedModel].name}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        {isOpen && (
          <div className="absolute w-[300] aligh-right bg-[#FEF5F1] rounded-md mt-0 shadow-lg z-10">
            <div
              className={`dm-mono font-medium text-sm px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                selectedModel === 'model1' ? 'text-[#8953CD]' : ''
              }`}
              onClick={() => handleSelect('model1')}
            >
              {modelConfigs.model1.name}
            </div>
            <div
              className={`dm-mono font-medium text-sm px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                selectedModel === 'model2' ? 'text-[#8953CD]' : ''
              }`}
              onClick={() => handleSelect('model2')}
            >
              {modelConfigs.model2.name}
            </div>
            <div
              className={`dm-mono font-medium text-sm px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                selectedModel === 'model3' ? 'text-[#8953CD]' : ''
              }`}
              onClick={() => handleSelect('model3')}
            >
              {modelConfigs.model3.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
