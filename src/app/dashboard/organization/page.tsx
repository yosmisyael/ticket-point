"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "next/image";

export default function OrganizationSettings() {
  const [orgName, setOrgName] = useState("");
  const [logoMode, setLogoMode] = useState<"url" | "upload">("url");
  const [orgLogoUrl, setOrgLogoUrl] = useState("");
  const [orgLogoFile, setOrgLogoFile] = useState<File | null>(null);
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgDescription, setOrgDescription] = useState("");

  const [errors, setErrors] = useState({
    orgName: "",
    orgLogo: "",
    orgWebsite: "",
    orgDescription: "",
  });

  const handleLogoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOrgLogoFile(e.target.files[0]);
      setOrgLogoUrl("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { orgName: "", orgLogo: "", orgWebsite: "", orgDescription: "" };

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

  const logoPreviewUrl = logoMode === "upload" && orgLogoFile ? URL.createObjectURL(orgLogoFile) : orgLogoUrl;

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold text-[var(--color-dark)] sm:text-left">
          Organization Settings
        </h1>
        <p className="text-sm text-[var(--color-mid-dark)] my-2 max-w-2xl">
          Ubah informasi organisasi Anda. Informasi ini nantinya akan muncul sebagai
          penyelenggara event saat Anda membuat event.
        </p>
        <hr className="mt-2 border-slate-100" />
      </header>

      <Card className="max-w-lg mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-[var(--color-dark)]">
              Organization Name
            </label>
            <input
              type="text"
              id="orgName"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-[var(--color-primary-mid)] focus:border-[var(--color-primary-mid)]"
            />
            {errors.orgName && <p className="mt-1 text-xs text-red-500">{errors.orgName}</p>}
          </div>

          <div>
            <span className="block text-sm font-medium text-[var(--color-dark)] mb-1">Logo Organization</span>
            <div className="flex gap-4 mb-2">
              <label className="inline-flex items-center">
                <input type="radio" name="logoMode" value="url" checked={logoMode === "url"} onChange={() => setLogoMode("url")} />
                <span className="ml-2">URL</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="logoMode" value="upload" checked={logoMode === "upload"} onChange={() => setLogoMode("upload")} />
                <span className="ml-2">Upload</span>
              </label>
            </div>
            {logoMode === "url" ? (
              <input type="text" id="orgLogoUrl" value={orgLogoUrl} onChange={(e) => setOrgLogoUrl(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg" />
            ) : (
              <input type="file" accept="image/*" id="orgLogoUpload" onChange={handleLogoFileChange} className="mt-1 block w-full" />
            )}
            {errors.orgLogo && <p className="mt-1 text-xs text-red-500">{errors.orgLogo}</p>}
            {logoPreviewUrl && <Image src={logoPreviewUrl} alt="Logo Preview" className="mt-2 w-24 h-24 object-contain" />}
          </div>

          <div>
            <label htmlFor="orgWebsite" className="block text-sm font-medium text-[var(--color-dark)]">Website URL</label>
            <input type="text" id="orgWebsite" value={orgWebsite} onChange={(e) => setOrgWebsite(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg" />
            {errors.orgWebsite && <p className="mt-1 text-xs text-red-500">{errors.orgWebsite}</p>}
          </div>

          <div>
            <label htmlFor="orgDescription" className="block text-sm font-medium text-[var(--color-dark)]">Organization Description</label>
            <textarea id="orgDescription" value={orgDescription} onChange={(e) => setOrgDescription(e.target.value)} rows={4}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg" />
            {errors.orgDescription && <p className="mt-1 text-xs text-red-500">{errors.orgDescription}</p>}
          </div>

          <Button type="submit" className="w-full text-[var(--color-light)] bg-[var(--color-primary-mid)] hover:bg-[var(--color-primary-dark)] rounded-lg p-3">
            Save Organization
          </Button>
        </form>
      </Card>
    </div>
  );
}
