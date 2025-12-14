"use client"
import React from "react";
import CustomSelect from "./CustomSelect";

interface BankDetailsStepProps {
  bank: string;
  accountNumber: string;
  accountName: string;
  isLoadingAccount: boolean;
  errors: {
    bank?: string;
    accountNumber?: string;
    accountName?: string;
  };
  onBankChange: (value: string) => void;
  onAccountNumberChange: (value: string) => void;
}

const banks = [
  "Access Bank",
  "GTBank",
  "First Bank",
  "Zenith Bank",
  "UBA",
  "Wema Bank",
  "Kuda Bank",
  "Sterling Bank",
];

export default function BankDetailsStep({
  bank,
  accountNumber,
  accountName,
  isLoadingAccount,
  errors,
  onBankChange,
  onAccountNumberChange,
}: BankDetailsStepProps) {
  const bankOptions = banks.map((b) => ({ label: b, value: b }));

  return (
    <div className="space-y-6 sm:space-y-8 mb-16 sm:mb-16">
    
      <CustomSelect
        label="Bank"
        placeholder="Select an option"
        options={bankOptions}
        value={bank}
        onChange={onBankChange}
        error={errors.bank}
      />

    
      <div>
        <label className="block text-[#013941] font-semibold text-base sm:text-lg mb-3">
          Account number
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter your account number"
          value={accountNumber}
          onChange={(e) =>
            onAccountNumberChange(
              e.target.value.replace(/\D/g, "").slice(0, 10)
            )
          }
          className={`w-full px-5 sm:px-6 py-3.5 sm:py-4 bg-white border-2 ${
            errors.accountNumber ? "border-red-400" : "border-gray-200"
          } rounded-full text-gray-800 placeholder-gray-400 placeholder:text-[15px] focus:outline-none focus:border-[#0d3d3d] focus:ring-2 focus:ring-[#0d3d3d]/20 transition-all`}
          maxLength={10}
        />
        {errors.accountNumber && (
          <p className="mt-2 text-sm text-red-500 ml-2">
            {errors.accountNumber}
          </p>
        )}
      </div>

      {/* Account Name (Read-only) */}
      <div>
        <label className="block text-[#013941] font-semibold text-base sm:text-lg mb-3">
          Account name
        </label>
        <div className="w-full px-5 sm:px-6 py-3.5 sm:py-4 bg-[#e8ecef] border-2 border-transparent rounded-full text-[#013941] font-medium min-h-[52px] sm:min-h-[56px] flex items-center">
          {isLoadingAccount ? (
            <span className="text-gray-500 italic">Loading...</span>
          ) : (
            <span className={accountName ? "" : "text-transparent"}>
              {accountName || "Name"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
