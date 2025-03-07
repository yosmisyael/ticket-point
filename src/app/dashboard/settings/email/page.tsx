"use client";

import { ChangeEvent, useState } from "react";

export default function Email() {
  const [email, setEmail] = useState("dummy@gmail.com");
  const currentEmail: string = email;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 text-dark">
      {/* Header */}
      <div className="mb-4 md:mb-8 border-b border-dark pb-2">
        <h1 className="mx-2 text-2xl sm:text-3xl md:text-4xl font-semibold font-inter text-[var(--color-dark)]">
          Change Email Address
        </h1>
      </div>

      {/* Form Container */}
      <form className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <h2 className="text-xl font-semibold col-span-1 md:col-span-3">
          Main Email Address
        </h2>

        <p className="col-span-1 md:col-span-3 text-sm underline mb-2">
          {currentEmail}
        </p>

        <label htmlFor="email" className="col-span-1 text-sm font-medium text-dark">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
          value={email}
          onChange={handleEmailChange}
        />

        <div className="col-span-1 md:col-span-3 flex justify-end mt-2">
          <button
            type="submit"
            className="bg-primary-mid px-6 py-2 text-sm text-white hover:bg-primary-dark cursor-pointer rounded-full"
          >
            Change Email
          </button>
        </div>
      </form>
    </div>
  );
}
