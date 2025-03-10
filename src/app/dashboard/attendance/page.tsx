"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType, Result } from '@zxing/library';

interface TicketData {
    ticketNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    organizationName: string;
    tier: string;
    purchaseDate: string;
    status: 'checked' | 'not checked';
    timeChecked?: string;
}

const mockTicketData: TicketData = {
    ticketNumber: 'A001F89G872124',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '+1234567890',
    organizationName: 'Tech Corp',
    tier: 'VIP',
    purchaseDate: '12 July 2025 ; 10:19 AM',
    status: 'not checked'
};

type MessageType = 'success' | 'error' | 'warning';

interface Message {
    type: MessageType;
    text: string;
}

export default function TicketCheckIn() {
    // State for camera
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraError, setError] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsRef = useRef<IScannerControls | null>(null);
    const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // State for ticket verification
    const [isVerifying, setIsVerifying] = useState(false);
    const [ticketVerified, setTicketVerified] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');

    // State for ticket data
    const [ticketData, setTicketData] = useState<TicketData | null>(null);
    const [lastScannedCode, setLastScannedCode] = useState<string>('');

    // State for messages
    const [message, setMessage] = useState<Message | null>(null);

    // Auto-hide message after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Camera handling functions
    const startCamera = async () => {
        try {
            if (!videoRef.current) return;

            const hints = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, [
                BarcodeFormat.QR_CODE,
                BarcodeFormat.EAN_13,
                BarcodeFormat.EAN_8,
                BarcodeFormat.CODE_128,
                BarcodeFormat.CODE_39,
                BarcodeFormat.UPC_A,
                BarcodeFormat.UPC_E,
            ]);

            const codeReader = new BrowserMultiFormatReader(hints);

            controlsRef.current = await codeReader.decodeFromVideoDevice(
                undefined,
                videoRef.current,
                (result: Result | null, error: Error | undefined) => {
                    if (result) {
                        const scannedCode = result.getText();
                        if (scannedCode !== lastScannedCode) {
                            setLastScannedCode(scannedCode);
                            setTicketNumber(scannedCode);
                            verifyTicket(scannedCode);

                            // Clear previous timeout if exists
                            if (scanTimeoutRef.current) {
                                clearTimeout(scanTimeoutRef.current);
                            }

                            // Set a timeout to allow scanning the same code again after 5 seconds
                            scanTimeoutRef.current = setTimeout(() => {
                                setLastScannedCode('');
                            }, 5000);
                        }
                    }
                    if (error) {
                        console.debug('Scanning error:', error);
                    }
                }
            );

            setIsCameraActive(true);
            setError('');
        } catch (err) {
            setError('Failed to access camera. Please check permissions.');
            console.error('Camera error:', err);
        }
    };

    const stopCamera = () => {
        if (controlsRef.current) {
            controlsRef.current.stop();
            controlsRef.current = null;
        }
        if (scanTimeoutRef.current) {
            clearTimeout(scanTimeoutRef.current);
        }
        setIsCameraActive(false);
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const verifyTicket = async (ticketNum: string) => {
        if (isVerifying) return;

        setIsVerifying(true);
        setMessage(null);
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (ticketNum === mockTicketData.ticketNumber) {
            setTicketData({
                ...mockTicketData,
                status: 'not checked'
            });
            setTicketVerified(true);
        } else {
            setTicketData(null);
            setTicketVerified(false);
            setMessage({
                type: 'error',
                text: 'Ticket not found. Please check the ticket number and try again.'
            });
        }
        setIsVerifying(false);
    };

    const handleCheckIn = () => {
        if (!ticketData) return;

        if (ticketData.status === 'checked') {
            setMessage({
                type: 'warning',
                text: `This attendee (${ticketData.firstName} ${ticketData.lastName}) has already checked in at ${ticketData.timeChecked}`
            });
            return;
        }

        setTicketData(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                status: 'checked',
                timeChecked: new Date().toLocaleString()
            };
        });

        setMessage({
            type: 'success',
            text: `${ticketData.firstName} ${ticketData.lastName} has been successfully checked in!`
        });
    };

    const handleCancel = () => {
        setTicketData(null);
        setTicketVerified(false);
        setTicketNumber('');
        setLastScannedCode('');
        setMessage(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    Ticket Check-in
                </h1>
                <p className="text-gray-600 max-w-2xl">
                    Scan QR codes or barcodes to check in attendees. You can also enter ticket numbers manually.
                </p>
            </header>

            {/* Message Display */}
            {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                        message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                            'bg-yellow-100 text-yellow-800 border border-yellow-200'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Camera and Ticket Number Section */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Code Scanner
                            </label>
                            <div className="relative">
                                <video
                                    ref={videoRef}
                                    className="w-full h-[300px] object-cover rounded-lg bg-black"
                                />
                                {isCameraActive ? (
                                    <button
                                        onClick={stopCamera}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <Camera className="h-5 w-5" />
                                    </button>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                                        <button
                                            onClick={startCamera}
                                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Camera className="h-5 w-5" />
                                            <span>Start Scanner</span>
                                        </button>
                                        {cameraError && (
                                            <p className="mt-2 text-sm text-red-500">{cameraError}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Ticket Number
                            </label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={ticketNumber}
                                    onChange={(e) => setTicketNumber(e.target.value)}
                                    placeholder="Enter ticket number"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                                <button
                                    onClick={() => verifyTicket(ticketNumber)}
                                    disabled={isVerifying || !ticketNumber}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isVerifying ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            <span>Checking...</span>
                                        </>
                                    ) : (
                                        <span>Check</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendee Information Section */}
                <div className="space-y-6">
                    <div className={`bg-white p-6 rounded-lg shadow-sm ${!ticketVerified ? 'opacity-50 pointer-events-none' : ''}`}>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Attendee Information
                        </h2>

                        {ticketVerified && ticketData ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={ticketData.firstName}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={ticketData.lastName}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={ticketData.email}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={ticketData.phoneNumber}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Organization
                                        </label>
                                        <input
                                            type="text"
                                            value={ticketData.organizationName}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tier
                                        </label>
                                        <input
                                            type="text"
                                            value={ticketData.tier}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 space-y-2 text-sm text-gray-600">
                                    <p>Purchase Date: {ticketData.purchaseDate}</p>
                                    <p>Status: {ticketData.status}</p>
                                    {ticketData.timeChecked && <p>Time Checked: {ticketData.timeChecked}</p>}
                                </div>

                                <div className="mt-6 flex gap-4">
                                    <button
                                        onClick={handleCheckIn}
                                        disabled={ticketData.status === 'checked'}
                                        className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {ticketData.status === 'checked' ? 'Already Checked In' : 'Check In'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Enter a ticket number or scan a code to view attendee information
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}