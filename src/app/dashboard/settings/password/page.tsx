"use client";

import { useState } from "react";

export default function Password() {
    const [currentPassword, setCurrentPassword] = useState("");

    const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    }

    const [newPassword, setNewPassword] = useState("");

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    }

    const [validatePassword, setValidatePassword] = useState("");

    const handleValidatePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidatePassword(e.target.value);
    }

    return (
        <div className="p-4 sm:p-6 md:p-10 text-dark">
            <div className="mb-6 md:mb-20 border-b border-dark pb-4">
                <h1 className="mx-2 text-4xl sm:text-5xl md:text-6xl font-semibold font-inter text-[var(--color-dark)]">
                    Change Password
                </h1>
            </div>
            <form className="grid grid-cols-3 items-center w-1/2 gap-5 mt-8">
                <h2 className="text-3xl font-semibold col-span-3">Update your password periodically for security</h2>
                <label htmlFor="name" className="col-span-1 mt-6 text-2xl font-medium text-dark">Current
                    Password</label>
                <input type="password" name="name" id="name"
                       className="mt-6 col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"
                       defaultValue={currentPassword} onChange={handleCurrentPasswordChange}/>
                <label htmlFor="name" className="col-span-1 mt-6 text-2xl font-medium text-dark">New
                    Password</label>
                <input type="password" name="name" id="name"
                       className="col-span-2 mt-6 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"
                       defaultValue={newPassword} onChange={handleNewPasswordChange}/>
                <label htmlFor="name" className="col-span-1 mt-6 text-2xl font-medium text-dark">Validate Password</label>
                <input type="password" name="name" id="name"
                       className="col-span-2 mt-6 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"
                       defaultValue={validatePassword} onChange={handleValidatePasswordChange}/>
                <button type="submit"
                        className="bg-primary-mid px-8 py-3 col-span-3 w-fit text-base text-light hover:bg-primary-dark cursor-pointer rounded-full">
                    Change Password
                </button>
            </form>
        </div>
    )
}