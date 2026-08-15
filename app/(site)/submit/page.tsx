"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { CameraIcon, MapPinIcon, XIcon } from "@/components/icons";
import { CATEGORIES } from "@/lib/data";

export default function SubmitPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const inputClass =
    "mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Submit a complaint
      </h1>
      <p className="mt-1 text-gray-500">
        Tell us what's broken — the right department will pick it up.
      </p>

      <form
        className="mt-8 space-y-7"
        onSubmit={(e) => e.preventDefault()}
      >
        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the issue?"
              className={inputClass}
            />
          </label>

          <label className="mt-6 block">
            <span className="text-sm font-semibold text-gray-700">
              Description
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Add details — location, how long it's been happening, how it affects you…"
              className={`${inputClass} resize-none`}
            />
          </label>

          <div className="mt-6">
            <span className="text-sm font-semibold text-gray-700">
              Category
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
                    category === cat
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
          <span className="text-sm font-semibold text-gray-700">Photo</span>
          {photo ? (
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <CameraIcon className="h-4 w-4 text-primary" />
                {photo}
              </p>
              <button
                type="button"
                aria-label="Remove photo"
                onClick={() => setPhoto(null)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPhoto("street-corner-2026-08.jpg")}
              className="mt-3 flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-9 text-gray-400 transition-colors hover:border-primary/50 hover:bg-primary-soft/40 hover:text-primary"
            >
              <CameraIcon className="h-7 w-7" />
              <span className="text-sm font-semibold">Tap to add a photo</span>
              <span className="text-xs">JPG or PNG, up to 10MB (demo)</span>
            </button>
          )}
        </section>

        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
          <span className="text-sm font-semibold text-gray-700">
            Location
          </span>
          <div className="bg-map-grid relative mt-3 h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-soft via-white to-accent-orange/20">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg">
              <MapPinIcon className="h-6 w-6 text-primary-dark" />
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-600 backdrop-blur-md">
              Map picker — drag to set the exact spot
            </span>
          </div>
        </section>

        <Button type="submit" size="lg" className="w-full">
          Submit complaint
        </Button>
        <p className="-mt-4 text-center text-xs text-gray-400">
          Demo UI only — nothing is actually submitted.
        </p>
      </form>
    </div>
  );
}
