"use client";

import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import AxiosInstance from "@/service/api";
import Image from "next/image";

interface UserData {
  id?: number; // Ensure ID is included
  name: string;
  email: string;
  phone: string;
  profileUrl?: string;
  organization?: string;
}

export default function Contact(): React.ReactNode {
  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    profileUrl: "",
    organization: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    async function getCurrentUser() {
      try {
        const response = await AxiosInstance.get("/api/users/current", {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });

        setUser((prevUser: UserData) => ({
          ...prevUser,
          ...response.data,
        }));
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    }

    getCurrentUser();
  }, []);

  const handleProfileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert("File size must be less than 3MB");
      return;
    }

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Only PNG, JPEG, and JPG files are allowed");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        setUser((prevState) => ({
          ...prevState,
          profileUrl: event.target!.result as string,
        }));

        const formData = new FormData();
        formData.append("image", file);
        formData.append("id", user.id?.toString() || "");
        formData.append("type", "profile");

        try {
          const response = await AxiosInstance.post("/api/image/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")!).token}`,
            },
          });
          setUser((prevState) => ({ ...prevState, profileUrl: response.data.path }))
        } catch (error) {
          console.error("Upload failed:", error);
          alert("Failed to upload image");
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({ ...prevUser, phone: e.target.value }));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({ ...prevUser, name: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.patch(
          "/api/users/update",
          JSON.stringify({ name: user.name, phone: user.phone }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")!).token}`,
            },
          }
      );

      alert("Profile updated successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
      <div className="p-2 sm:p-4 md:p-6 text-dark overflow-hidden">
        <div className="mb-4 md:mb-8 border-b border-dark pb-2">
          <h1 className="mx-2 text-2xl sm:text-3xl md:text-4xl font-semibold font-inter text-[var(--color-dark)]">
            Account Settings
          </h1>
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Account Profile</h2>
          <label htmlFor="profile-upload" className="cursor-pointer">

            {user.profileUrl ? (
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.profileUrl}`}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="rounded-full object-cover mx-auto"
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

        <form
            className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-4"
            onSubmit={handleSubmit}
        >
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
              value={user.name}
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
              value={user.email}
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
              value={user.phone}
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
              value={user.organization || "Not in organization"}
          />

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-3 flex justify-end mt-2">
            <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(user);
                }}
                className="bg-primary-mid text-white px-6 py-2 text-sm hover:bg-primary-dark cursor-pointer rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
  );
}
