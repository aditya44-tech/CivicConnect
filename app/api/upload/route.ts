import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getSessionUser } from "@/lib/auth";
import { MAX_PHOTO_BYTES } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to upload photos." }, { status: 401 });
  }
  if (!cloudinary) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured — add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.",
      },
      { status: 503 }
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json(
        { error: "Photo must be under 500 KB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary!.uploader.upload_stream(
        {
          folder: "civicconnect",
          resource_type: "image",
        },
        (err, res) => {
          if (err || !res) return reject(err ?? new Error("Upload failed"));
          resolve({ secure_url: res.secure_url });
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url }, { status: 201 });
  } catch (err) {
    console.error("upload error", err);
    return NextResponse.json({ error: "Upload failed. Try a different image." }, { status: 500 });
  }
}
