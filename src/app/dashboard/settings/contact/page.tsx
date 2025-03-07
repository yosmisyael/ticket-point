"use client";

import { useState, ChangeEvent } from "react";
import { UserProps } from "@/interfaces/user";

const userDummy: UserProps = {
  name: "Fajar",
  email: "fajar@gmail.com",
  phone: "981234",
  organization: "pens",
};

export default function Contact(): React.ReactNode {
  const [name, setName] = useState(userDummy.name);
  const [phone, setPhone] = useState(userDummy.phone);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleProfileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Batasi ukuran file hingga 3MB (3 * 1024 * 1024 bytes)
      if (file.size > 3 * 1024 * 1024) {
        alert("File size must be less than 3MB");
        return;
      }
      // Cek tipe file yang diizinkan
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        alert("Only PNG, JPEG, and JPG files are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setProfileImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 text-dark overflow-hidden">
      {/* Header */}
      <div className="mb-4 md:mb-8 border-b border-dark pb-2">
        <h1 className="mx-2 text-2xl sm:text-3xl md:text-4xl font-semibold font-inter text-[var(--color-dark)]">
          Account Settings
        </h1>
      </div>

      {/* Account Profile */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold mb-3">Account Profile</h2>
        <label htmlFor="profile-upload" className="cursor-pointer">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover mx-auto"
            />
          ) : (
            <div className="h-40 w-40 rounded-full bg-mid-light flex items-center justify-center mx-auto">
              <span className="text-sm text-dark">Click to upload</span>
            </div>
          )}
        </label>
        <input
          type="file"
          id="profile-upload"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleProfileUpload}
          className="hidden"
        />
      </div>

      {/* Contact Information Form */}
      <form className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <h2 className="text-xl font-semibold col-span-1 md:col-span-3">
          Contact Information
        </h2>

        {/* Name */}
        <label htmlFor="name" className="col-span-1 text-base font-medium text-dark">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
          value={name}
          onChange={handleNameChange}
        />

        {/* Email */}
        <label htmlFor="email" className="col-span-1 text-base font-medium text-dark">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
          readOnly
          value={userDummy.email}
        />

        {/* Phone */}
        <label htmlFor="phone" className="col-span-1 text-base font-medium text-dark">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
          value={phone}
          onChange={handlePhoneChange}
        />

        {/* Organization */}
        <label htmlFor="organization" className="col-span-1 text-base font-medium text-dark">
          Organization
        </label>
        <input
          type="text"
          name="organization"
          id="organization"
          className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
          readOnly
          value={userDummy.organization}
        />

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-3 flex justify-end mt-2">
          <button
            type="submit"
            className="bg-primary-mid text-white px-6 py-2 text-sm hover:bg-primary-dark cursor-pointer rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
