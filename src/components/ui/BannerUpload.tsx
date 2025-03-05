import React, { useState, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

export default function BannerUpload(): React.ReactNode {
    const [image, setImage] = useState('/banner-placeholder.png');
    const [isHovering, setIsHovering] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];

        // Show preview immediately
        const localUrl = URL.createObjectURL(file);
        setImage(localUrl);

        // Start upload process
        setIsUploading(true);

        try {
            // Create form data for upload
            const formData = new FormData();
            formData.append('image', file);

            // Example upload request - replace with your actual API endpoint
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            // Get the saved image URL from response
            const data = await response.json();
            setImage(data.imageUrl); // Update with the server URL

        } catch (error) {
            console.error('Error uploading image:', error);
            // Revert to placeholder on error
            setImage('/banner-placeholder.png');
            // You might want to show an error message to the user here
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div
            className="relative bg-mid-light w-full rounded-xl cursor-pointer overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* Image */}
            <div className="relative w-full h-fit">
                <Image
                    src="/banner-placeholder.png"
                    alt="event-banner"
                    width={1600}
                    height={800}
                    className="object-cover rounded-xl"
                />
            </div>

            {/* Hover overlay */}
            {isHovering && (
                <div className="absolute inset-0 bg-mid-dark bg-opacity-20 flex items-center justify-center transition-opacity duration-200 rounded-xl">
                    <div className="text-white text-center px-4">
                        <ImageIcon size={20} className="h-12 w-12 mx-auto mb-2" />
                        {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                        {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />*/}
                        {/*</svg>*/}
                        <p>Click to upload a new banner image</p>
                    </div>
                </div>
            )}

            {/* Upload loading indicator */}
            {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-xl">
                    <div className="text-white text-center">
                        <svg className="animate-spin h-10 w-10 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p>Uploading image...</p>
                    </div>
                </div>
            )}
        </div>
    );
}