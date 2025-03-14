"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Footer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formatParam = searchParams.get("format");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmYes = () => {
    setIsModalOpen(false);
    router.push(`/dashboard/events/create/ticket?format=${formatParam}`);
  };

  const handleConfirmNo = () => {
    setIsModalOpen(false);
    const locationSection = document.getElementById("location-type");
    if (locationSection) {
      locationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="col-span-4 fixed bottom-0 left-0 bg-light py-4 px-12 w-full flex justify-end">
        <button
          onClick={handleClick}
          className="bg-primary-mid text-white px-4 py-2 rounded-4xl"
        >
          Save and Continue
        </button>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            {!formatParam ? (
              <>
                <h2 className="text-xl font-bold mb-4">Location Type Required</h2>
                <p className="mb-6">
                  Please select your location type by clicking one of the buttons in the Location Type section.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={handleConfirmNo}
                    className="bg-gray-300 text-dark px-4 py-2 rounded-4xl hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Confirmation</h2>
                <p className="mb-6">Are you sure you want to save and continue?</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleConfirmYes}
                    className="bg-primary-mid text-white px-4 py-2 rounded-4xl hover:bg-primary-dark transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleConfirmNo}
                    className="bg-gray-300 text-dark px-4 py-2 rounded-4xl hover:bg-gray-400 transition-colors"
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
