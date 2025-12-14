// components/RecipientDetailsForm.tsx
"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import BankDetailsStep from "./BankDetails";
import ContactDetailsStep from "./ContactDetails";

interface FormData {
  bank: string;
  accountNumber: string;
  accountName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

export default function RecipientDetailsForm() {
  const [step, setStep] = useState(1);
  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    bank: "",
    accountNumber: "",
    accountName: "",
    email: "",
    countryCode: "+234",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleAccountNumberChange = (value: string) => {
    setFormData({ ...formData, accountNumber: value, accountName: "" });

    if (value.length < 10) {
      setIsLoadingAccount(false);
      return;
    }

    if (value.length === 10) {
      setIsLoadingAccount(true);
      setTimeout(() => {
        setFormData((prev) => ({ ...prev, accountName: "ODUTUGA GBEKE" }));
        setIsLoadingAccount(false);
      }, 800);
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.bank) newErrors.bank = "Please select a bank";
    if (!formData.accountNumber)
      newErrors.accountNumber = "Account number is required";
    if (formData.accountNumber.length !== 10)
      newErrors.accountNumber = "Account number must be 10 digits";
    if (!formData.accountName) newErrors.accountName = "Account name not found";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setErrors({});
    } else if (step === 2 && validateStep2()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully");
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full sm:w-lg max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-10 sm:mb-12">
          <button
            onClick={handleBack}
            className="mr-3 sm:mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
              strokeWidth={2.5}
            />
          </button>
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-medium text-[#013941] text-center flex-1 mr-8 sm:mr-12">
            Recipient details
          </h1>
        </div>

        {/* Step Content */}
        {step === 1 ? (
          <BankDetailsStep
            bank={formData.bank}
            accountNumber={formData.accountNumber}
            accountName={formData.accountName}
            isLoadingAccount={isLoadingAccount}
            errors={errors}
            onBankChange={(value) => {
              setFormData({ ...formData, bank: value });
              setErrors({ ...errors, bank: undefined });
            }}
            onAccountNumberChange={handleAccountNumberChange}
          />
        ) : (
          <ContactDetailsStep
            email={formData.email}
            countryCode={formData.countryCode}
            phoneNumber={formData.phoneNumber}
            errors={errors}
            onEmailChange={(value) => {
              setFormData({ ...formData, email: value });
              setErrors({ ...errors, email: undefined });
            }}
            onCountryCodeChange={(value) => {
              setFormData({ ...formData, countryCode: value });
            }}
            onPhoneNumberChange={(value) => {
              setFormData({ ...formData, phoneNumber: value });
              setErrors({ ...errors, phoneNumber: undefined });
            }}
          />
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isLoadingAccount}
          className="sm:w-lg w-full  mt-2 sm:mt-2 px-10 py-5 sm:py-5 bg-[#013941] text-white font-semibold text-base sm:text-lg rounded-full hover:bg-[#0a2f2f] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
