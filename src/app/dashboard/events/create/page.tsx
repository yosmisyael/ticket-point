'use client'

import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/fragments/dashboard/Footer";
import { useState } from "react";
import {Trash, MapPinHouse, TvMinimalPlay, Puzzle, Search, Info} from 'lucide-react'

interface EventFormat {
    type: string;
    icon: React.ReactNode;
}

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface AgendaItem {
    id: string;
    startTime: string;
    endTime: string;
    agenda: string;
    duration?: string;
}

const formats: EventFormat[] = [
    {
        type: 'onsite',
        icon: (<MapPinHouse size={20} />),
    },
    {
        type: 'online',
        icon: (<TvMinimalPlay size={20} />),
    },
    {
        type: 'hybrid',
        icon: (<Puzzle size={20} />),
    }
];

type LocationFormat = 'onsite' | 'online' | 'hybrid';

const ONLINE_PLATFORMS = [
    { value: 'zoom', label: 'Zoom' },
    { value: 'google-meet', label: 'Google Meet' },
    { value: 'microsoft-teams', label: 'Microsoft Teams' },
    { value: 'youtube-live', label: 'YouTube Live' },
    { value: 'other', label: 'Other Platform' }
];

export default function CreateEvent() {
    // faq states
    const [faqs, setFaqs] = useState<FaqItem[]>([]);

    const generateFaqId = () => `faq-${Date.now()}-${Math.random().toString(36).substring(2,9)}`;

    const addFaqItem = () => {
        const newFaq: FaqItem = {
            id: generateFaqId(),
            question: '',
            answer: '',
        };

        setFaqs([...faqs, newFaq]);
    }

    const updateFaqItem = (
        id: string,
        field: 'question' | 'answer',
        value: string,
    ) => {
        setFaqs(faqs.map(faq =>
            faq.id === id ? { ...faq, [field]: value } : faq
        ));
    }

    const removeFaqItem = (id: string) => {
        setFaqs(faqs.filter(faq => faq.id !== id));
    };

    // agenda states
    const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);

    // Function to generate a unique ID for each agenda item
    const generateAgendaId = () => {
        return `agenda-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };

    // Calculate duration between start and end times
    const calculateDuration = (startTime: string, endTime: string): string => {
        // Convert times to minutes
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        // Calculate total minutes
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;

        // Handle cases crossing midnight
        const durationMinutes = endTotalMinutes >= startTotalMinutes
            ? endTotalMinutes - startTotalMinutes
            : (24 * 60 - startTotalMinutes) + endTotalMinutes;

        // Convert to hours and minutes
        const durationHours = Math.floor(durationMinutes / 60);
        const remainingMinutes = durationMinutes % 60;

        // Format duration string
        if (durationHours > 0 && remainingMinutes > 0) {
            return `${durationHours} hr ${remainingMinutes} min`;
        } else if (durationHours > 0) {
            return `${durationHours} hr`;
        } else {
            return `${remainingMinutes} min`;
        }
    };

    const convertToEpochTime = (time: string): number => {
        const now = new Date();
        const [hours, minutes] = time.split(':').map(Number);

        // Create a new date with the specified time
        const dateWithTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes
        );

        // Return epoch time (milliseconds since Jan 1, 1970)
        return dateWithTime.getTime();
    };
    // Validate time input
    const validateTimeInput = (startTime: string, endTime: string): boolean => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        // Ensure both times are valid
        if (isNaN(startHours) || isNaN(startMinutes) ||
            isNaN(endHours) || isNaN(endMinutes)) {
            return false;
        }

        // Check basic time range validity
        if (startHours < 0 || startHours > 23 || endHours < 0 || endHours > 23 ||
            startMinutes < 0 || startMinutes > 59 || endMinutes < 0 || endMinutes > 59) {
            return false;
        }

        return true;
    };
    // Add a new Agenda Item
    const addAgendaItem = () => {
        const newAgendaItem: AgendaItem = {
            id: generateAgendaId(),
            startTime: '00:00',
            endTime: '00:00',
            agenda: '',
        };

        setAgendaItems([...agendaItems, newAgendaItem]);
    };

    // Update a specific Agenda Item
    const updateAgendaItem = (
        id: string,
        field: 'startTime' | 'endTime' | 'agenda',
        value: string
    ) => {
        const updatedItems = agendaItems.map(item => {
            if (item.id !== id) return item;

            const updatedItem = { ...item, [field]: value };

            // Recalculate duration if both times are valid
            if (validateTimeInput(updatedItem.startTime, updatedItem.endTime)) {
                updatedItem.duration = calculateDuration(
                    updatedItem.startTime,
                    updatedItem.endTime
                );
            }

            return updatedItem;
        });

        setAgendaItems(updatedItems);
    };

    // Remove an Agenda Item
    const removeAgendaItem = (id: string) => {
        setAgendaItems(agendaItems.filter(item => item.id !== id));
    };

    // location states
    const [locationFormat, setLocationFormat] = useState<LocationFormat | null>(null);

    const [locationDetails, setLocationDetails] = useState({
        physicalLocation: '',
        onlinePlatform: '',
        meetingLink: ''
    });

    const formats = [
        {
            type: 'onsite',
            icon: <MapPinHouse className="mr-2" />,
            description: 'Physical venue for in-person attendance'
        },
        {
            type: 'online',
            icon: <TvMinimalPlay className="mr-2" />,
            description: 'Virtual event accessible via online platform'
        },
        {
            type: 'hybrid',
            icon: <Puzzle className="mr-2" />,
            description: 'Combination of physical and online participation'
        }
    ];

    // Update location format
    const handleFormatChange = (format: LocationFormat) => {
        setLocationFormat(format);
        // Reset location details when format changes
        setLocationDetails({
            physicalLocation: '',
            onlinePlatform: '',
            meetingLink: ''
        });
    };

    // Update location details
    const updateLocationDetails = (field: keyof typeof locationDetails, value: string) => {
        setLocationDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Render location input based on selected format
    const renderLocationInput = () => {
        switch(locationFormat) {
            case 'onsite':
                return (
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="physical-location"
                                className="block mt-6 text-lg font-medium text-dark"
                            >
                                Physical Location
                            </label>
                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    id="physical-location"
                                    value={locationDetails.physicalLocation}
                                    onChange={(e) => updateLocationDetails('physicalLocation', e.target.value)}
                                    placeholder="Enter venue address"
                                    className="block w-full pl-10 p-4 rounded-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-mid focus:border-primary-mid focus:border-2 peer"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-mid-dark peer-focus:text-primary-mid"/>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder for Map */}
                        <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Location Map Preview</p>
                        </div>
                    </div>
                );

            case 'online':
                return (
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="online-platform"
                                className="block mt-6 text-lg font-medium text-dark"
                            >
                                Online Platform
                            </label>
                            <select
                                id="online-platform"
                                value={locationDetails.onlinePlatform}
                                onChange={(e) => updateLocationDetails('onlinePlatform', e.target.value)}
                                className="mt-3 p-4 rounded-lg block w-full border border-mid-dark shadow-sm focus:outline-none focus:ring-primary-mid focus:border-primary-mid"
                            >
                                <option value="">Select Platform</option>
                                {ONLINE_PLATFORMS.map(platform => (
                                    <option key={platform.value} value={platform.value}>
                                        {platform.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="meeting-link"
                                className="block mt-6 text-lg font-medium text-dark"
                            >
                                Meeting Link
                            </label>
                            <input
                                type="url"
                                id="meeting-link"
                                value={locationDetails.meetingLink}
                                onChange={(e) => updateLocationDetails('meetingLink', e.target.value)}
                                placeholder="Enter meeting link"
                                className="mt-3 p-4 rounded-lg block w-full border border-mid-dark rounded-md shadow-sm focus:outline-none focus:ring-primary-mid focus:border-primary-mid"
                            />
                            <p className="mt-2 text-md text-yellow-600 flex gap-2 items-center">
                                <Info size={20} /> Note: This link will only be sent to registered participants and won&apos;t be publicly displayed.
                            </p>
                        </div>
                    </div>
                );

            case 'hybrid':
                return (
                    <div className="space-y-4">
                        {/* Onsite Location Section */}
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="physical-location"
                                    className="block mt-6 text-lg font-medium text-dark"
                                >
                                    Physical Location
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        type="text"
                                        id="physical-location"
                                        value={locationDetails.physicalLocation}
                                        onChange={(e) => updateLocationDetails('physicalLocation', e.target.value)}
                                        placeholder="Enter venue address"
                                        className="block w-full pl-10 p-4 rounded-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-mid focus:border-primary-mid focus:border-2 peer"
                                    />
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-mid-dark peer-focus:text-primary-mid"/>
                                    </div>
                                </div>
                            </div>

                            {/* Placeholder for Map */}
                            <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">Location Map Preview</p>
                            </div>
                        </div>

                        {/* Online Platform Section */}
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="online-platform"
                                    className="block mt-6 text-lg font-medium text-dark"
                                >
                                    Online Platform
                                </label>
                                <select
                                    id="online-platform"
                                    value={locationDetails.onlinePlatform}
                                    onChange={(e) => updateLocationDetails('onlinePlatform', e.target.value)}
                                    className="mt-3 p-4 rounded-lg block w-full border border-mid-dark shadow-sm focus:outline-none focus:ring-primary-mid focus:border-primary-mid"
                                >
                                    <option value="">Select Platform</option>
                                    {ONLINE_PLATFORMS.map(platform => (
                                        <option key={platform.value} value={platform.value}>
                                            {platform.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="meeting-link"
                                    className="block mt-6 text-lg font-medium text-dark"
                                >
                                    Meeting Link
                                </label>
                                <input
                                    type="url"
                                    id="meeting-link"
                                    value={locationDetails.meetingLink}
                                    onChange={(e) => updateLocationDetails('meetingLink', e.target.value)}
                                    placeholder="Enter meeting link"
                                    className="mt-3 p-4 rounded-lg block w-full border border-mid-dark rounded-md shadow-sm focus:outline-none focus:ring-primary-mid focus:border-primary-mid"
                                />
                                <p className="mt-2 text-md text-yellow-600 flex gap-2 items-center">
                                    <Info size={20}/> Note: This link will only be sent to registered participants and
                                    won&apos;t be publicly displayed.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <div className="p-5 select-none">
                <Breadcrumb/>
                <div className="flex flex-col my-5 gap-12 mb-36">

                    {/* overview */}
                    <section className="border-2 border-mid-light rounded-xl w-2/3 p-5 hover:border-primary-mid">
                        {/*<Image*/}
                        {/*    src={null}*/}
                        {/*    alt="event banner"*/}
                        {/*    width="1600"*/}
                        {/*    height="800"*/}
                        {/*/>*/}
                        <div className="bg-mid-light w-full h-80 rounded-xl"></div>
                        <h2 className="mt-8 text-2xl font-semibold">Event Overview</h2>
                        <p className="text-base font-light mt-3">Create your event&apos;s first impression: Set a catchy
                            title, upload a banner image, and provide a concise description of your event.</p>
                        <div className="mt-6">
                            <label htmlFor="large-input"
                                   className="block mb-2 text-lg font-medium text-dark">Event Title</label>
                            <input type="text" id="large-input"
                                   placeholder="Enter Event Name"
                                   className="block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"/>
                        </div>

                        <label htmlFor="description"
                               className="block mt-6 text-lg font-medium text-dark">Event Description</label>
                        <textarea id="description" rows={4}
                                  className="block w-full p-4 text-dark border border-mid-dark  rounded-lg bg-ligth text-base focus:ring-primary-mid focus:border-primary-mid"
                                  placeholder="Write event description here">
                        </textarea>
                    </section>

                    {/* date time */}
                    <section className="border-2 border-mid-light rounded-xl w-2/3 p-5 hover:border-primary-mid">
                        <h2 className="text-2xl font-semibold">Date</h2>
                        <p className="text-base font-light mt-3">Flexible scheduling: Select a single day or multiple days, and set your event&#39;s start and end times.</p>
                        <div className="flex gap-10 mt-6">
                            <div>
                                <label htmlFor="date-input" className="block mb-2 text-lg font-medium">
                                    Date
                                </label>
                                <input type="date" id="date-input"/>
                            </div>
                            <div>
                                <label htmlFor="start-time"
                                       className="block mb-2 text-lg font-medium">Start
                                    time</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-mid-dark" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd"
                                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input type="time" id="start-time"
                                           className="bg-gray-50 border leading-none border-mid-dark text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                           min="09:00" max="18:00" defaultValue="00:00" required/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="end-time"
                                       className="block mb-2 text-lg font-medium text-dark">End
                                    time</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-mid-dark" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd"
                                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input type="time" id="end-time"
                                           className="bg-gray-50 border leading-none border-mid-dark text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                           min="09:00" max="18:00" defaultValue="00:00" required/>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* location */}
                    <section className="border-2 border-mid-light rounded-xl w-2/3 p-5 hover:border-primary-mid">
                        <h2 className="text-2xl font-semibold">Location</h2>
                        <p className="text-base font-light mt-3">Choose your event&apos;s format: Select from online, offline, or hybrid options.</p>
                        <div className="mt-6 flex gap-4 select-none">
                            {
                                formats.map((item) => (
                                    <div key={item.type}>
                                        <input
                                            type="radio"
                                            name="event-type"
                                            id={item.type}
                                            className="peer hidden"
                                            checked={locationFormat === item.type}
                                            onChange={() => handleFormatChange(item.type as LocationFormat)}
                                        />
                                        <label
                                            htmlFor={item.type}
                                            className="flex gap-2 items-center cursor-pointer rounded-lg border border-mid-dark px-4 py-2 text-mid-dark peer-checked:border-primary-mid peer-checked:bg-blue-100 peer-checked:text-blue-700 hover:border-primary-mid hover:bg-blue-100 hover:text-blue-700 capitalize"
                                        >
                                            {item.icon}
                                            {item.type}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                        {/* Dynamic Location Input */}
                        {locationFormat && (
                            <div className="mt-6">
                                {renderLocationInput()}
                            </div>
                        )}
                    </section>

                    {/* addons */}
                    <section className="border-2 border-mid-light rounded-xl w-2/3 p-5 hover:border-primary-mid">
                        <h2 className="text-2xl font-semibold">Additional Information</h2>
                        <p className="text-base font-light mt-3">Add a detailed agenda and answer frequently asked questions to help your attendees.</p>
                        <label htmlFor=""
                               className="block mt-6 text-lg font-medium text-dark">Agenda</label>
                        {
                            agendaItems.map((item) => (
                            <div key={item.id} className="border p-4 rounded-lg border-mid-dark mt-6">
                                {/* Time Inputs */}
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    {/* Start Time Input */}
                                    <div>
                                        <label htmlFor={`start-time-${item.id}`}
                                               className="block mb-2 text-lg font-medium">Start time</label>
                                        <div className="relative">
                                            <div
                                                className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                <svg className="w-4 h-4 text-mid-dark" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd"
                                                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <input
                                                type="time"
                                                id={`start-time-${item.id}`}
                                                value={item.startTime}
                                                onChange={(e) => updateAgendaItem(item.id, 'startTime', e.target.value)}
                                                className="bg-gray-50 border leading-none border-mid-dark text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                min="00:00"
                                                max="23:59"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* End Time Input */}
                                    <div>
                                        <label htmlFor={`end-time-${item.id}`}
                                               className="block mb-2 text-lg font-medium text-dark">End time</label>
                                        <div className="relative">
                                            <div
                                                className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                                <svg className="w-4 h-4 text-mid-dark" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd"
                                                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            <input
                                                type="time"
                                                id={`end-time-${item.id}`}
                                                value={item.endTime}
                                                onChange={(e) => updateAgendaItem(item.id, 'endTime', e.target.value)}
                                                className="bg-gray-50 border leading-none border-mid-dark text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                min="00:00"
                                                max="23:59"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Duration Display */}
                                {item.duration && (
                                    <div className="text-sm text-gray-600 mb-3">
                                        Duration: {item.duration}
                                    </div>
                                )}

                                {/* Agenda Description Input */}
                                <div>
                                    <label
                                        htmlFor={`agenda-${item.id}`}
                                        className="block mb-2 text-lg font-medium"
                                    >
                                        Agenda Description
                                    </label>
                                    <textarea
                                        id={`agenda-${item.id}`}
                                        value={item.agenda}
                                        onChange={(e) => updateAgendaItem(item.id, 'agenda', e.target.value)}
                                        placeholder="Describe the agenda item in detail"
                                        rows={3}
                                        className="block w-full p-4 text-dark border border-mid-dark  rounded-lg bg-ligth text-base focus:ring-primary-mid focus:border-primary-mid"
                                    />
                                </div>
                                {/* Remove Agenda Item Button */}
                                <button
                                    onClick={() => removeAgendaItem(item.id)}
                                    className="ms-auto mt-4 text-dark hover:text-red-800 hover:bg-red-100 bg-mid-light rounded-3xl py-2 px-5 cursor-pointer flex items-center gap-2"
                                >
                                    <Trash size={20} />
                                    Remove
                                </button>
                            </div>
                        ))
                        }
                        <button
                            className="mt-6 flex gap-1 items-center py-2 px-5 border-2 border-primary-mid text-base font-medium rounded-4xl text-primary-mid hover:text-white hover:bg-primary-mid hover:cursor-pointer"
                            onClick={addAgendaItem}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                                 stroke="currentColor" className="size-[18px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            Add Event
                        </button>
                        <label htmlFor=""
                               className="block mt-6 text-lg font-medium text-dark">Add FAQ</label>
                        {
                            faqs.map((faq, index) => (
                            <div key={faq.id} className="relative rounded-lg p-4 border border-mid-dark mt-6">
                                {/* Question Input */}
                                <div className="mb-3">
                                    <label
                                        htmlFor={`question-${faq.id}`}
                                        className="block mt-6 text-lg font-medium text-dark"
                                    >
                                        Question { index + 1 }
                                    </label>
                                    <input
                                        id={`question-${faq.id}`}
                                        type="text"
                                        value={faq.question}
                                        onChange={(e) => updateFaqItem(faq.id, 'question', e.target.value)}
                                        placeholder="Enter your FAQ question"
                                        className="block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-primary-mid focus:border-primary-mid"
                                    />
                                </div>

                                {/* Answer Input */}
                                <div>
                                    <label
                                        htmlFor={`answer-${faq.id}`}
                                        className="block mt-6 text-lg font-medium text-dark"
                                    >
                                        Answer { index + 1 }
                                    </label>
                                    <textarea
                                        id={`answer-${faq.id}`}
                                        value={faq.answer}
                                        onChange={(e) => updateFaqItem(faq.id, 'answer', e.target.value)}
                                        placeholder="Provide a detailed answer"
                                        rows={3}
                                        className="block w-full p-4 text-dark border border-mid-dark text-base rounded-lg bg-ligth text-base focus:ring-primary-mid focus:border-primary-mid"
                                    />
                                </div>
                                {/* Remove FAQ Button */}
                                <button
                                    onClick={() => removeFaqItem(faq.id)}
                                    className="ms-auto mt-4 text-dark hover:text-red-800 hover:bg-red-100 bg-mid-light rounded-3xl py-2 px-5 cursor-pointer flex items-center gap-2"
                                >
                                    <Trash size={18} className="" /> Remove
                                </button>
                            </div>
                            ))
                        }
                        <button
                            className="mt-6 flex gap-1 items-center py-2 px-5 border-2 border-primary-mid text-base font-medium rounded-4xl text-primary-mid hover:text-white hover:bg-primary-mid hover:cursor-pointer"
                            onClick={addFaqItem}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                                 stroke="currentColor" className="size-[18px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            Add question
                        </button>
                    </section>
                </div>
            </div>
            <Footer/>
        </>
    )
}