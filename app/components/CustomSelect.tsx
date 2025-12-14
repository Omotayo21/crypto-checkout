"use client"
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function CustomSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  error
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <label className="block text-[#013941] font-semibold text-base sm:text-lg mb-3">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-5 sm:px-6 py-3.5 sm:py-4 text-left bg-white border-2 ${
            error ? 'border-red-400' : 'border-gray-200'
          } rounded-full text-gray-800 hover:border-gray-300 transition-all focus:outline-none focus:border-[#013941] focus:ring-2 focus:ring-[#013941]/20`}
        >
          <span className={value ? 'text-[#013941] font-medium' : 'text-gray-400 font-normal text-[15px]'}>
            {value || placeholder}
          </span>
          <ChevronDown 
            className={`absolute right-5 sm:right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#013941] transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-h-64 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full px-5 sm:px-6 py-3.5 text-left hover:bg-gray-50 transition-colors text-[#013941] font-medium border-b border-gray-100 last:border-b-0"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 ml-2">{error}</p>
      )}
    </div>
  );
}
