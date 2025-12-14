import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { NG, US, GB, IN, CN } from "country-flag-icons/react/3x2";

interface ContactDetailsStepProps {
  email: string;
  countryCode: string;
  phoneNumber: string;
  errors: {
    email?: string;
    phoneNumber?: string;
  };
  onEmailChange: (value: string) => void;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
}

const countryCodes = [
  { code: "+234", Flag: NG, country: "Nigeria" },
  { code: "+1", Flag: US, country: "United States" },
  { code: "+44", Flag: GB, country: "United Kingdom" },
  { code: "+91", Flag: IN, country: "India" },
  { code: "+86", Flag: CN, country: "China" },
];

export default function ContactDetailsStep({
  email,
  countryCode,
  phoneNumber,
  errors,
  onEmailChange,
  onCountryCodeChange,
  onPhoneNumberChange,
}: ContactDetailsStepProps) {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    console.log("Dropdown state:", showCountryDropdown);
  }, [showCountryDropdown]);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    if (showCountryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCountryDropdown]);

  const getCurrentFlag = () => {
    const country = countryCodes.find((c) => c.code === countryCode);
    return country ? country.Flag : NG;
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,5})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(" - ");
    }
    return value;
  };

  const CurrentFlag = getCurrentFlag();

  return (
    <div className="space-y-8 sm:space-y-8 mb-36 sm:mb-36">
      <div>
        <label className="block text-[#013941] font-semibold text-base sm:text-lg mb-3">
          Recipient email
        </label>
        <input
          type="email"
          placeholder="Enter recipient email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={`w-full px-5 sm:px-6 py-3.5 sm:py-4 bg-white border-2 ${
            errors.email ? "border-red-400" : "border-gray-200"
          } rounded-full text-gray-800 placeholder-gray-400 placeholder:text-[15px] focus:outline-none focus:border-[#0d3d3d] focus:ring-2 focus:ring-[#0d3d3d]/20 transition-all`}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-500 ml-2">{errors.email}</p>
        )}
      </div>

      {/* Recipient Phone Number */}
      <div>
        <label className="block text-[#0d3d3d] font-semibold text-base sm:text-lg mb-3">
          Recipient phone number
        </label>
        <div
          className={`flex border-2 ${
            errors.phoneNumber ? "border-red-400" : "border-gray-200"
          } rounded-full bg-white focus-within:border-[#013941] focus-within:ring-2 focus-within:ring-[#0d3d3d]/20 transition-all`}
        >
          {/* Country Code Selector */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(
                  "Button clicked, current state:",
                  showCountryDropdown
                );
                setShowCountryDropdown(!showCountryDropdown);
              }}
              className="flex items-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 bg-white hover:bg-gray-50 transition-colors border-r-2 border-gray-200 h-full rounded-l-full"
              type="button"
            >
              <span className="text-gray-800 font-medium text-sm sm:text-base">
                {countryCode}
              </span>
              <CurrentFlag className="w-5 h-4 sm:w-6 sm:h-5 rounded-full" />

              <ChevronDown
                className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                  showCountryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu - WITH DEBUG STYLING */}
            {showCountryDropdown && (
              <div
                className="fixed z-[9999] bg-white border-2 border-gray-200 rounded-2xl shadow-2xl min-w-[240px] max-h-[300px] overflow-y-auto"
                style={{
                  top: dropdownRef.current
                    ? `${
                        dropdownRef.current.getBoundingClientRect().bottom + 8
                      }px`
                    : "auto",
                  left: dropdownRef.current
                    ? `${dropdownRef.current.getBoundingClientRect().left}px`
                    : "auto",
                }}
              >
                {countryCodes.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Country selected:", item.code);
                      onCountryCodeChange(item.code);
                      setShowCountryDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                  >
                    <item.Flag className="w-6 h-5 rounded-sm" />
                    <span className="text-gray-800 font-medium">
                      {item.code}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {item.country}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            inputMode="numeric"
            placeholder="000 - 000 - 00000"
            value={formatPhoneNumber(phoneNumber)}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "");
              onPhoneNumberChange(cleaned);
            }}
            className="flex-1 px-4 sm:px-6 py-3.5 sm:py-4 bg-white text-gray-800 placeholder-gray-400 placeholder:text-[15px] focus:outline-none rounded-r-full"
            maxLength={16}
          />
        </div>
        {errors.phoneNumber && (
          <p className="mt-2 text-sm text-red-500 ml-2">{errors.phoneNumber}</p>
        )}
      </div>
    </div>
  );
}
