"use client";

import { useState } from "react";
import { UserProps } from "@/interfaces/user";

const userDummy: UserProps = {
    name: "Fajar",
    email: "fajar@gmail.com",
    phone: "981234",
    organization: "pens"
}

export default function Contact(): React.ReactNode {
    const [name, setName] = useState(userDummy.name);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const [phone, setPhone] = useState(userDummy.phone);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    }

    return (
        <div className="p-4 sm:p-6 md:p-10 text-dark">
            <div className="mb-6 md:mb-20 border-b border-dark pb-4">
                <h1 className="mx-2 1text-4xl sm:text-5xl md:text-6xl font-semibold font-inter text-[var(--color-dark)]">
                    Account Settings
                </h1>
            </div>
            <div>
                <h2 className="text-3xl font-semibold">Account Profile</h2>
                <div className="h-64 w-64 rounded-full bg-mid-light mt-6"></div>
            </div>
            <form className="grid grid-cols-3 items-center w-1/2 gap-5 mt-8">
                <h2 className="text-3xl font-semibold col-span-3">Contact Information</h2>
                <label htmlFor="name" className="col-span-1 mb-2 text-2xl font-medium text-dark">Name</label>
                <input type="text" name="name" id="name"
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500" defaultValue={ name } onChange={handleNameChange} />
                <label htmlFor="email" className="col-span-1 mb-2 text-2xl font-medium text-dark">Email</label>
                <input type="email" name="email" id="email"
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500" readOnly={true} value={ userDummy.email } />
                <label htmlFor="phone" className="col-span-1 mb-2 text-2xl font-medium text-dark">Phone</label>
                <input type="text" name="phone" id="phone"
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500" defaultValue={ phone } onChange={ handlePhoneChange } />
                <label htmlFor="organization" className="col-span-1 mb-2 text-2xl font-medium text-dark">Organization</label>
                <input type="text" name="organization" id="organization"
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500" readOnly={true} value={userDummy.organization} />
                <button type="submit" className="bg-primary-mid px-8 py-3 col-span-3 w-fit text-base text-light hover:bg-primary-dark cursor-pointer rounded-full">Save</button>
            </form>
        </div>
    );
}