"use client";

import { ChangeEvent, useRef, useState } from "react";
import AxiosInstance from "@/service/api"; // Make sure this path is correct for your project
import { useRouter } from "next/navigation"; // Import the router for redirection

export default function Email() {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState("dummy@gmail.com");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Use useRef to store the initial email (unchanged)
  const initialEmail = useRef<string>(
      JSON.parse(localStorage.getItem("user") || "{}").email || ""
  );

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const requestData = {
        email: email,
      };

      const response = await AxiosInstance.patch("/api/users/update", requestData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(response);

      // Show success message
      setMessage({
        text: "Email successfully updated. Please log in again.",
        type: "success",
      });

      // Clear local storage and redirect to login page
      localStorage.removeItem("user"); // Clear user data
      setTimeout(() => {
        router.push("/login"); // Redirect to login page
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Error updating email:", error);
      setMessage({
        text: "Failed to update email. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
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
        <form
            className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-4"
            onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold col-span-1 md:col-span-3">
            Main Email Address
          </h2>

          {/* Display the initial email (unchanged) */}
          <p className="col-span-1 md:col-span-3 text-sm underline mb-2">
            Current Email: {initialEmail.current}
          </p>

          {/* Display success/error messages */}
          {message.text && (
              <div
                  className={`col-span-1 md:col-span-3 p-2 rounded ${
                      message.type === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                  }`}
              >
                {message.text}
              </div>
          )}

          {/* Email input field */}
          <label htmlFor="email" className="col-span-1 text-sm font-medium text-dark">
            New Email
          </label>
          <input
              type="email"
              name="email"
              id="email"
              className="col-span-1 md:col-span-2 block w-full p-2 text-dark border border-mid-dark rounded-lg bg-light text-sm focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={handleEmailChange}
              required
          />

          {/* Submit button */}
          <div className="col-span-1 md:col-span-3 flex justify-end mt-2">
            <button
                type="submit"
                className={`bg-primary-mid px-6 py-2 text-sm text-white hover:bg-primary-dark cursor-pointer rounded-full ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
            >
              {loading ? "Processing..." : "Change Email"}
            </button>
          </div>
        </form>
      </div>
  );
}