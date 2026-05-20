import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { apiClient } from "@/lib/api-client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { image, mimeType } = body;

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: "Image and mimeType are required" },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!ALLOWED_TYPES.includes(mimeType)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: jpg, png, webp, gif" },
        { status: 400 }
      );
    }

    // Validate file size (base64 is ~33% larger than binary)
    const base64Size = (image.length * 3) / 4;
    if (base64Size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      `data:${mimeType};base64,${image}`,
      "dailyeng/avatars"
    );

    if (!uploadResult.success) {
      return NextResponse.json({ error: uploadResult.error }, { status: 500 });
    }

    // Update user's image in database via Spring Boot API (PUT /users/me)
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const API_BASE =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
    const updateRes = await fetch(`${API_BASE}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ image: uploadResult.url }),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text().catch(() => "Unknown error");
      console.error("Failed to update user avatar in Spring Boot:", errText);
      return NextResponse.json(
        { error: "Failed to update avatar in database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json(
      { error: "Failed to upload avatar" },
      { status: 500 }
    );
  }
}
