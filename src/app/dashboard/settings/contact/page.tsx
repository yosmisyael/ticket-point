export default function Contact(): React.ReactNode {
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
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"/>
                <label htmlFor="email" className="col-span-1 mb-2 text-2xl font-medium text-dark">Email</label>
                <input type="email" name="email" id="email"
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500" readOnly={true}/>
                <label htmlFor="phone" className="col-span-1 mb-2 text-2xl font-medium text-dark">Phone</label>
                <input type="number" name="phone" id="phone"
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500"/>
                <label htmlFor="organization" className="col-span-1 mb-2 text-2xl font-medium text-dark">Organization</label>
                <input type="text" name="organization" id="organization"
                       className="col-span-2 block w-full p-4 text-dark border border-mid-dark rounded-lg bg-ligth text-base focus:ring-blue-500 focus:border-blue-500" readOnly={true}/>
            </form>
        </div>
    );
}