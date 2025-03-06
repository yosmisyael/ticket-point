"use client";

import {ChangeEvent, useState} from "react";

export default function Email() {
    const [email, setEmail] = useState("dummy@gmail.com");
    const currentEmail: string = email;

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return (
        <div className="p-4 sm:p-6 md:p-10 text-dark">
            <div className="mb-6 md:mb-20 border-b border-dark pb-4">
                <h1 className="mx-2 1text-4xl sm:text-5xl md:text-6xl font-semibold font-inter text-[var(--color-dark)]">
                    Change Email Address
                </h1>
            </div>
            <form className="grid grid-cols-3 items-center w-1/2 gap-5 mt-8">
                <h2 className="text-3xl font-semibold col-span-3">Main Email Address</h2>
                <p className="col-span-3 text-xl underline">{currentEmail}</p>
                <label htmlFor="name" className="col-span-1 mb-2 text-2xl font-medium text-dark">Email</label>
                <input type="email" name="name" id="name"
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"
                       defaultValue={email} onChange={handleEmailChange}/>
                <button type="submit"
                        className="bg-primary-mid px-8 py-3 col-span-3 w-fit text-base text-light hover:bg-primary-dark cursor-pointer rounded-full">Change Email
                </button>
            </form>
        </div>
    )
}