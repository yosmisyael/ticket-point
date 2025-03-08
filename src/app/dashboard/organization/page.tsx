"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

export default function OrganizationSettings() {
  // State untuk form organisasi
  const [orgName, setOrgName] = useState("");
  const [logoMode, setLogoMode] = useState<"url" | "upload">("url");
  const [orgLogoUrl, setOrgLogoUrl] = useState("");
  const [orgLogoFile, setOrgLogoFile] = useState<File | null>(null);
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgDescription, setOrgDescription] = useState("");

  // State error validasi
  const [errors, setErrors] = useState({
    orgName: "",
    orgLogo: "",
    orgWebsite: "",
    orgDescription: "",
  });

  const handleLogoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOrgLogoFile(e.target.files[0]);
      // Jika menggunakan upload, Anda bisa menghapus logo URL agar tidak terjadi konflik
      setOrgLogoUrl("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validasi form
    let valid = true;
    const newErrors = {
      orgName: "",
      orgLogo: "",
      orgWebsite: "",
      orgDescription: "",
    };

    if (orgName.trim() === "") {
      newErrors.orgName = "Nama organisasi harus diisi";
      valid = false;
    }
    if (logoMode === "url" && orgLogoUrl.trim() === "") {
      newErrors.orgLogo = "URL logo harus diisi atau pilih upload";
      valid = false;
    }
    if (logoMode === "upload" && !orgLogoFile) {
      newErrors.orgLogo = "Harap upload file logo";
      valid = false;
    }
    if (orgWebsite.trim() === "") {
      newErrors.orgWebsite = "URL website harus diisi";
      valid = false;
    }
    if (orgDescription.trim() === "") {
      newErrors.orgDescription = "Deskripsi organisasi harus diisi";
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return;

    // Proses simulasikan penyimpanan data (misalnya, panggil API)
    console.log("Organization Data:", {
      orgName,
      logoMode,
      orgLogoUrl,
      orgLogoFile,
      orgWebsite,
      orgDescription,
    });
    alert("Informasi organisasi berhasil disimpan!");
  };

  // Preview URL untuk file upload
  const logoPreviewUrl =
    logoMode === "upload" && orgLogoFile
      ? URL.createObjectURL(orgLogoFile)
      : orgLogoUrl;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Organization Settings
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Ubah informasi organisasi Anda. Informasi ini nantinya akan muncul sebagai
          penyelenggara event saat Anda membuat event.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        {/* Organization Name */}
        <div>
          <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
            Organization Name
          </label>
          <input
            type="text"
            id="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Masukkan nama organisasi"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.orgName && (
            <p className="mt-1 text-xs text-red-500">{errors.orgName}</p>
          )}
        </div>

        {/* Pilihan Logo: URL atau Upload */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Logo Organization
          </span>
          <div className="flex gap-4 mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="logoMode"
                value="url"
                checked={logoMode === "url"}
                onChange={() => setLogoMode("url")}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">URL</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="logoMode"
                value="upload"
                checked={logoMode === "upload"}
                onChange={() => setLogoMode("upload")}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Upload</span>
            </label>
          </div>
          {logoMode === "url" ? (
            <input
              key="logoUrl"
              type="text"
              id="orgLogoUrl"
              value={orgLogoUrl}
              onChange={(e) => setOrgLogoUrl(e.target.value)}
              placeholder="Masukkan URL logo"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          ) : (
            <input
              key="logoUpload"
              type="file"
              accept="image/*"
              id="orgLogoUpload"
              onChange={handleLogoFileChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
            />
          )}
          {errors.orgLogo && (
            <p className="mt-1 text-xs text-red-500">{errors.orgLogo}</p>
          )}
          {/* Preview logo */}
          {logoPreviewUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Preview:</p>
              <img
                src={logoPreviewUrl}
                alt="Logo Preview"
                className="mt-1 w-24 h-24 object-contain border border-gray-300 rounded"
              />
            </div>
          )}
        </div>

        {/* Website URL */}
        <div>
          <label htmlFor="orgWebsite" className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <input
            type="text"
            id="orgWebsite"
            value={orgWebsite}
            onChange={(e) => setOrgWebsite(e.target.value)}
            placeholder="Masukkan URL website"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.orgWebsite && (
            <p className="mt-1 text-xs text-red-500">{errors.orgWebsite}</p>
          )}
        </div>

        {/* Organization Description */}
        <div>
          <label htmlFor="orgDescription" className="block text-sm font-medium text-gray-700">
            Organization Description
          </label>
          <textarea
            id="orgDescription"
            value={orgDescription}
            onChange={(e) => setOrgDescription(e.target.value)}
            placeholder="Masukkan deskripsi organisasi"
            rows={4}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.orgDescription && (
            <p className="mt-1 text-xs text-red-500">{errors.orgDescription}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Save Organization
        </button>
      </form>
    </div>
  );
}
