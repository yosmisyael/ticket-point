'use client'

import DashboardLayout from "@/app/dashboard/layout";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Footer from "@/components/fragments/dashboard/Footer";
// import Image from "next/image";

export default function CreateEvent() {
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
                        <div className="mt-6">
                            <label htmlFor="large-input"
                                   className="block mb-2 text-lg font-medium text-dark">Event Title</label>
                            <input type="text" id="large-input"
                                   placeholder="Enter Event Name"
                                   className="block w-full p-4 text-dark border border-gray-300 rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"/>
                        </div>

                        <label htmlFor="description"
                               className="block mt-6 text-lg font-medium text-dark">Event Description</label>
                        <textarea id="description" rows={4}
                                  className="block p-2.5 w-full text-base text-dark bg-light rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Write event description here">
                        </textarea>
                    </section>

                    {/* date time */}
                    <section className="border-2 border-mid-light rounded-xl w-2/3 p-5 hover:border-primary-mid">
                        <h2 className="text-2xl font-semibold">Date</h2>
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
                                           className="bg-gray-50 border leading-none border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                           className="bg-gray-50 border leading-none border-gray-300 text-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                           min="09:00" max="18:00" defaultValue="00:00" required/>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* location */}
                    <section className="border-2 border-mid-light rounded-xl w-2/3 p-5 hover:border-primary-mid">
                        <h2 className="text-2xl font-semibold">Location</h2>
                        <div className="mt-6 flex gap-4 select-none">
                            <div>
                                <input type="radio" name="event-type" id="onsite" className="peer hidden"/>
                                <label htmlFor="onsite"
                                       className="flex gap-1 cursor-pointer rounded-lg border-2 border-mid-light px-4 py-2 text-mid-dark peer-checked:border-primary-mid peer-checked:bg-blue-100 peer-checked:text-blue-700 flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                                    </svg>
                                    Onsite
                                </label>
                            </div>
                            <div>
                                <input type="radio" name="event-type" id="online" className="peer hidden"/>
                                <label htmlFor="online"
                                       className="flex gap-1 cursor-pointer rounded-lg border-2 border-mid-light px-4 py-2 text-mid-dark peer-checked:border-primary-mid peer-checked:bg-blue-100 peer-checked:text-primary-mid">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/>
                                    </svg>
                                    Online
                                </label>
                            </div>
                            <div>
                                <input type="radio" name="event-type" id="hybrid" className="peer hidden"/>
                                <label htmlFor="hybrid"
                                       className="flex gap-1 cursor-pointer rounded-lg border-2 border-mid-light px-4 py-2 text-mid-dark peer-checked:border-primary-mid peer-checked:bg-blue-100 peer-checked:text-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"/>
                                    </svg>

                                    Hybrid
                                </label>
                            </div>
                        </div>
                        <label htmlFor="location"
                               className="block mt-6 text-lg font-medium text-dark">Location</label>
                        <input type="text" id="location"
                               placeholder="Enter location"
                               className="block w-full p-4 text-dark border border-gray-300 rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"/>
                        <div className="bg-mid-light w-full h-80 rounded-xl mt-6"></div>
                    </section>

                    {/* addons */}
                    <section className="border-2 border-mid-light rounded-xl w-2/3 p-5 hover:border-primary-mid">
                        <h2 className="text-2xl font-semibold">Additional Information</h2>
                        <label htmlFor=""
                               className="block mt-6 text-lg font-medium text-dark">Agenda</label>
                        {/*<input type="text" id="location"*/}
                        {/*       placeholder="Enter location"*/}
                        {/*       className="block w-full p-4 text-dark border border-gray-300 rounded-lg bg-light text-base focus:ring-blue-500 focus:border-blue-500"/>*/}
                        <button className="mt-6 flex gap-1 items-center py-2 px-5 border-2 border-primary-mid text-base font-medium rounded-4xl text-primary-mid hover:text-white hover:bg-primary-mid hover:cursor-pointer
                         ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                                 stroke="currentColor" className="size-[18px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            Add Event
                        </button>
                        <label htmlFor=""
                               className="block mt-6 text-lg font-medium text-dark">Add FAQ</label>
                        <button className="mt-6 flex gap-1 items-center py-2 px-5 border-2 border-primary-mid text-base font-medium rounded-4xl text-primary-mid hover:text-white hover:bg-primary-mid hover:cursor-pointer
                         ">
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