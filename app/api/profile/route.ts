// app\api\profile\route.ts
import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");
    const profile = await db.collection("profile").findOne({});

    return NextResponse.json(profile || {});
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Parse the request body first
    const body = await request.json();
    // console.log("Received profile data:", body); // Debug log

    // For development, let's temporarily bypass authentication
    // Remove this in production and implement proper auth
    const isDevelopment = process.env.NODE_ENV === "development";

    if (!isDevelopment) {
      const session = await getServerSession();
      // console.log("Session:", session); // Debug log

      if (!session) {
        // console.log("No session found, unauthorized");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Portfolio");

    // console.log("Attempting to update profile in database...");

    // Remove _id from body to avoid MongoDB immutable field error
    const { _id, ...profileData } = body;

    // Use upsert to create or update the profile
    const result = await db.collection("profile").replaceOne(
      {}, // Empty filter to match the first/only document
      {
        ...profileData,
        updatedAt: new Date(),
      },
      { upsert: true }
    );

    // console.log("Database operation result:", {
    //   acknowledged: result.acknowledged,
    //   matchedCount: result.matchedCount,
    //   modifiedCount: result.modifiedCount,
    //   upsertedCount: result.upsertedCount,
    //   upsertedId: result.upsertedId,
    // });

    if (result.acknowledged) {
      return NextResponse.json({
        success: true,
        message:
          result.upsertedCount > 0 ? "Profile created" : "Profile updated",
      });
    } else {
      throw new Error("Database operation was not acknowledged");
    }
  } catch (error) {
    console.error("Detailed error in PUT /api/profile:", error);

    // More detailed error response
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to update profile",
          details: error.message,
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to update profile",
        details: "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
