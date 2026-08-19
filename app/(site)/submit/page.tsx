/**
 * Submit Page - The primary intake form for reporting new issues.
 * Uploads the photo to Cloudinary, then creates the complaint via the API.
 */
"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import MapPicker, { type LatLng, type MapPickerHandle } from "@/components/MapPicker";
import {
  CameraIcon,
  MapPinIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XIcon,
  RouteIcon,
  LightbulbIcon,
  TreePineIcon,
  Volume2Icon,
  TrashIcon,
  DropletIcon,
  AlertCircleIcon,
  ClipboardIcon,
  CrosshairIcon,
} from "@/components/icons";
import { CATEGORIES, MAX_PHOTO_BYTES } from "@/lib/data";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Roads: RouteIcon,
  Lighting: LightbulbIcon,
  Parks: TreePineIcon,
  Noise: Volume2Icon,
  Garbage: TrashIcon,
  Water: DropletIcon,
  Safety: AlertCircleIcon,
  Other: ClipboardIcon,
};

const inputBase =
  "w-full rounded-xl border border-hairline bg-white px-4 py-3.5 text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-surface-dark focus:ring-2 focus:ring-surface-dark/10";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<LatLng | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapPickerRef = useRef<MapPickerHandle>(null);

  if (submittedId) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-canvas px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F0F0F0] ring-4 ring-[#E0E0E0]">
            <CheckCircleIcon className="h-10 w-10 text-surface-dark" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">Report Filed</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
            Your complaint has been received and logged. The civic response team will review it shortly.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FFF5E5] px-4 py-2 text-sm font-semibold text-[#FF9F0A]">
            <span className="h-2 w-2 rounded-full bg-[#FF9F0A]" />
            Status: Pending Review
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg">
              <Link href={`/complaints/${submittedId}`}>View Report</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                setSubmittedId(null);
                setTitle("");
                setDescription("");
                setCategory(null);
                setAddress("");
                setLocation(null);
                setPhotoFile(null);
                setPhotoPreview(null);
                setPhotoError(null);
              }}
            >
              File Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /** Map pin moved or auto-located: just record the detected coordinates. */
  const handleLocationChange = (p: LatLng) => {
    setLocation(p);
  };

  /** "Locate Me" in the Location header — drives the map's geolocation. */
  const handleLocate = async () => {
    if (locating) return;
    setLocating(true);
    try {
      await mapPickerRef.current?.locate();
    } finally {
      setLocating(false);
    }
  };

  const pickPhoto = (file: File | null) => {
    if (file && file.size > MAX_PHOTO_BYTES) {
      // Reject oversized photos immediately with a clear message.
      if (fileInputRef.current) fileInputRef.current.value = "";
      setPhotoFile(null);
      setPhotoPreview(null);
      setPhotoError(
        `That photo is ${(file.size / 1024).toFixed(0)} KB — the limit is 1 MB. Please pick a smaller image.`
      );
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
    setPhotoError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || title.trim().length < 5) {
      setError("Please add a short title for the issue (at least 5 characters).");
      return;
    }
    if (!category) {
      setError("Please pick a category.");
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setError("Please describe the issue in a little more detail.");
      return;
    }

    setBusy(true);
    setPhotoError(null);
    try {
      // 1. Upload the photo (optional) to Cloudinary. A failed upload never
      //    blocks the report — the complaint goes through without the image.
      let image: string | null = null;
      if (photoFile) {
        const form = new FormData();
        form.append("file", photoFile);
        const up = await fetch("/api/upload", { method: "POST", body: form });
        if (up.status === 401) {
          window.location.href = "/login";
          return;
        }
        const upData = await up.json();
        if (!up.ok) {
          setPhotoError(upData.error ?? "Photo upload failed — the report will be submitted without it.");
        } else {
          image = upData.url;
        }
      }

      // 2. Create the complaint
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          address: address.trim() || "Shirpur, Maharashtra",
          latitude: location?.lat ?? null,
          longitude: location?.lng ?? null,
          image,
        }),
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmittedId(data.complaint.id);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-canvas pb-24 sm:pb-12">

      <div className="mx-auto max-w-3xl px-4 pt-10 pb-6 sm:px-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-soft px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          Intake Form
        </span>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
          What needs attention?
        </h1>
        <p className="mt-2 text-base leading-relaxed text-gray-500">
          Provide details so our civic response teams can route and resolve it effectively.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">



        <form className="mt-6 space-y-6" onSubmit={submit}>
          {error && (
            <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
            <div className="border-b border-hairline bg-[#F5F5F7] px-5 py-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">What is the issue?</span>
            </div>
            <div className="p-5">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Deep pothole on northbound lane"
                className={inputBase}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-hairline bg-[#F5F5F7] px-5 py-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">Type of issue</span>
              <span className="text-xs font-medium text-gray-400">Select one</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat];
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat === category ? null : cat)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3.5 text-sm font-semibold transition-all active:scale-95 ${category === cat
                          ? "border-surface-dark bg-surface-dark text-white shadow-md"
                          : "border-hairline bg-white text-gray-700 hover:border-gray-300 hover:bg-[#F5F5F7]"
                        }`}
                    >
                      <span className="text-current">{Icon && <Icon className="h-6 w-6" />}</span>
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
            <div className="border-b border-hairline bg-[#F5F5F7] px-5 py-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">Provide more context</span>
            </div>
            <div className="p-5">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Be specific about the severity and exact location so teams can act quickly."
                className={`${inputBase} resize-none`}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-hairline bg-[#F5F5F7] px-5 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">Location</span>
                <button
                  type="button"
                  onClick={handleLocate}
                  disabled={locating}
                  className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.05em] text-gray-600 transition-colors hover:text-gray-900 disabled:opacity-60"
                >
                  <CrosshairIcon
                    className={`h-3.5 w-3.5 text-primary ${locating ? "animate-spin" : ""}`}
                  />
                  {locating ? "Locating…" : "Locate Me"}
                </button>
              </div>
              <div className="border-b border-hairline">
                <MapPicker
                  ref={mapPickerRef}
                  value={location}
                  onChange={handleLocationChange}
                  height="h-44"
                />
              </div>
              <div className="space-y-2.5 px-5 py-3.5">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Type the street address or intersection"
                  className={`${inputBase} !py-2.5 text-sm`}
                />
                <p className="text-xs text-gray-400">
                  {location
                    ? "Location detected — type the address below."
                    : "Tap the map or use Locate Me to detect the location."}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
              <div className="border-b border-hairline bg-[#F5F5F7] px-5 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">Upload photos</span>
              </div>
              <div className="p-5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => pickPhoto(e.target.files?.[0] ?? null)}
                />
                {photoPreview ? (
                  <div className="relative overflow-hidden rounded-xl border border-hairline">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoPreview} alt="Selected report photo" className="h-44 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => pickPhoto(null)}
                      aria-label="Remove photo"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                    <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      {photoFile?.name}
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-44 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-hairline bg-[#FAFAFA] text-gray-400 transition-all hover:border-gray-400 hover:bg-[#F5F5F7]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-white shadow-sm">
                      <CameraIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="text-center">
                      <span className="block text-sm font-semibold text-gray-600">Upload Photos</span>
                      <span className="mt-1 block text-xs text-gray-400">Max 1 MB · Drag &amp; drop or tap to browse</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {photoError && (
            <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
              <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {photoError}{" "}
                <button
                  type="button"
                  onClick={() => pickPhoto(null)}
                  className="font-semibold underline underline-offset-2 hover:text-amber-950"
                >
                  Remove photo
                </button>
              </span>
            </div>
          )}

          <div className="flex justify-center rounded-2xl border border-hairline bg-white px-6 py-5 shadow-sm">
            <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto px-10" disabled={busy}>
              {busy ? "Submitting…" : "Submit Report"}
              {!busy && <ChevronRightIcon className="h-4 w-4" />}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
