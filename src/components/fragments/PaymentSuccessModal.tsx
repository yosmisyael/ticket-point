"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import confetti from "canvas-confetti";

interface OrderDetails {
  orderId: string;
  transactionId: string;
  amount: string;
  date: string;
}

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ isOpen, onClose }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Trigger confetti animation when the modal opens
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Retrieve order details from localStorage
      const storedOrder = localStorage.getItem("orderDetails");
      if (storedOrder) {
        setOrderDetails(JSON.parse(storedOrder));
      } else {
        setOrderDetails({
          orderId: "ORDER-123456789",
          transactionId: "TXN-987654321",
          amount: "$250.00",
          date: "March 10, 2025",
        });
      }
      setLoading(false);
    }
  }, [isOpen]);

  console.log("PaymentSuccessModal rendered, isOpen:", isOpen); // Debugging
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
          <Head>
            <title>Payment Success</title>
            <meta name="description" content="Payment successful confirmation modal." />
          </Head>

          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4 -4" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
          <p className="text-gray-700 mb-6">
            Thank you for your payment. Your transaction has been successfully processed.
          </p>

          {loading ? (
            <div className="mb-6 flex items-center justify-center">
              <svg className="animate-spin h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span>Loading order details...</span>
            </div>
          ) : error ? (
            <p className="text-red-500 mb-6">{error}</p>
          ) : (
            <div className="mb-6 text-left">
              <p><span className="font-semibold">Order ID:</span> {orderDetails?.orderId}</p>
              <p><span className="font-semibold">Transaction ID:</span> {orderDetails?.transactionId}</p>
              <p><span className="font-semibold">Amount:</span> {orderDetails?.amount}</p>
              <p><span className="font-semibold">Date:</span> {orderDetails?.date}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="bg-green-600 text-white px-6 py-3 rounded-full transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessModal;