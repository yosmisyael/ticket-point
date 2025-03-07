"use client";

import { useState, ChangeEvent } from "react";

export default function Password() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleValidatePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValidatePassword(e.target.value);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 text-dark">
      {/* Header */}
      <div className="mb-4 md:mb-8 border-b border-dark pb-2">
        <h1 className="mx-2 text-2xl sm:text-3xl md:text-4xl font-semibold font-inter text-[var(--color-dark)]">
          Change Password
        </h1>
      </div>

      {/* Form Container */}
      <form className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <h2 className="text-xl font-semibold col-span-1 md:col-span-3">
          Update your password periodically for security
        </h2>

        {/* Current Password */}
        <label
          htmlFor="current-password"
          className="col-span-1 text-base font-medium text-dark mt-4"
        >
          Current Password
        </label>
        <input
          type="password"
          name="current-password"
          id="current-password"
          className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
        />

        {/* New Password */}
        <label
          htmlFor="new-password"
          className="col-span-1 text-base font-medium text-dark mt-4"
        >
          New Password
        </label>
        <input
          type="password"
          name="new-password"
          id="new-password"
          className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />

        {/* Validate Password */}
        <label
          htmlFor="validate-password"
          className="col-span-1 text-base font-medium text-dark mt-4"
        >
          Validate Password
        </label>
        <input
          type="password"
          name="validate-password"
          id="validate-password"
          className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
          value={validatePassword}
          onChange={handleValidatePasswordChange}
        />

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-3 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-primary-mid px-6 py-2 text-sm text-light hover:bg-primary-dark cursor-pointer rounded-full"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
