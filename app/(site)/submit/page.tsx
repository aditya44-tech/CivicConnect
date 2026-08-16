/**
 * Submit Page - The primary intake form for reporting new issues.
 * Features a multi-step visual indicator and success state handling.
 */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { CameraIcon, MapPinIcon, ChevronRightIcon, CheckCircleIcon, XIcon, RouteIcon, LightbulbIcon, TreePineIcon, Volume2Icon, TrashIcon, DropletIcon, AlertCircleIcon, ClipboardIcon } from "@/components/icons";
import { CATEGORIES } from "@/lib/data";

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
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
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
              <Link href="/my-complaints">Track My Reports</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => { setSubmitted(false); setTitle(""); setDescription(""); setCategory(null); setPhoto(null); }}
            >
              File Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-1.5 text-surface-dark">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-surface-dark text-[9px] text-white">1</span>
            <span>Describe</span>
          </div>
          <span className="h-px w-6 bg-hairline" />
          <div className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E0E0E0] text-[9px] text-white">2</span>
            <span>Category</span>
          </div>
          <span className="h-px w-6 bg-hairline" />
          <div className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E0E0E0] text-[9px] text-white">3</span>
            <span>Location</span>
          </div>
        </div>

        <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>

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
                <button type="button" className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.05em] text-gray-600 hover:text-gray-900">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  Locate Me
                </button>
              </div>
              <div className="bg-map-grid relative h-44 border-b border-hairline">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-hairline bg-white p-3 shadow-md">
                  <MapPinIcon className="h-6 w-6 text-gray-800" />
                </span>
              </div>
              <div className="px-5 py-3.5">
                <p className="text-sm font-semibold text-gray-900">Civic Center Plaza</p>
                <p className="mt-0.5 text-xs text-gray-400">Tap map to adjust pin</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
              <div className="border-b border-hairline bg-[#F5F5F7] px-5 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">Upload photos</span>
              </div>
              <div className="p-5">
                <button
                  type="button"
                  onClick={() => setPhoto(photo ? null : "photo.jpg")}
                  className={`flex h-44 w-full flex-col items-center justify-center gap-3 rounded-xl transition-all ${photo
                      ? "border border-solid border-surface-dark bg-[#F5F5F7] text-gray-900"
                      : "border border-dashed border-hairline bg-[#FAFAFA] text-gray-400 hover:border-gray-400 hover:bg-[#F5F5F7]"
                    }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full border shadow-sm ${photo ? "border-surface-dark bg-surface-dark" : "border-hairline bg-white"}`}>
                    {photo
                      ? <XIcon className="h-5 w-5 text-white" />
                      : <CameraIcon className="h-5 w-5 text-gray-500" />
                    }
                  </div>
                  <div className="text-center">
                    <span className={`block text-sm font-semibold ${photo ? "text-gray-900" : "text-gray-600"}`}>
                      {photo ? "Photo Attached — tap to remove" : "Upload Photos"}
                    </span>
                    <span className="mt-1 block text-xs text-gray-400">Drag & drop or tap to browse</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-hairline bg-white px-6 py-5 shadow-sm sm:flex-row">
            <p className="text-xs leading-relaxed text-gray-400 max-w-xs">
              By submitting you agree to our{" "}
              <Link href="/terms" className="font-semibold text-gray-700 hover:underline">Civic Reporting Guidelines</Link>.
            </p>
            <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto px-10" onClick={() => setSubmitted(true)}>
              Submit Report
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
