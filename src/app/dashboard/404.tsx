import Link from "next/link";

const Custom404 = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-full p-10 shadow-lg mb-4">
                <span className="text-6xl">😞</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">404 Oops! Page Not Be Found</h1>
            <p className="text-lg text-gray-600 mb-4">
                Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable.
            </p>
            <Link href="/" className="text-blue-500 hover:underline">
                Back to homepage
            </Link>
        </div>
    );
};

export default Custom404;