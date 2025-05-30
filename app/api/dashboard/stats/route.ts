// app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("Portfolio");

    // Get counts efficiently using MongoDB aggregation
    const [projectCount, experienceCount, messageCount] = await Promise.all([
      db.collection("projects").countDocuments(),
      db.collection("experiences").countDocuments(),
      db
        .collection("messages")
        .countDocuments()
        .catch(() => 0), // Handle if collection doesn't exist
    ]);

    // Get the most recent update date across all collections
    const recentUpdates = await Promise.all([
      db
        .collection("projects")
        .findOne(
          {},
          {
            sort: { updatedAt: -1, createdAt: -1 },
            projection: { updatedAt: 1, createdAt: 1 },
          }
        ),
      db
        .collection("experiences")
        .findOne(
          {},
          {
            sort: { updatedAt: -1, createdAt: -1 },
            projection: { updatedAt: 1, createdAt: 1 },
          }
        ),
      db
        .collection("messages")
        .findOne({}, { sort: { createdAt: -1 }, projection: { createdAt: 1 } })
        .catch(() => null),
    ]);

    // Find the most recent date
    const dates = recentUpdates
      .filter((doc) => doc !== null)
      .map((doc) => new Date(doc.updatedAt || doc.createdAt))
      .filter((date) => !isNaN(date.getTime()));

    const lastUpdated =
      dates.length > 0
        ? new Date(Math.max(...dates.map((d) => d.getTime())))
        : new Date();

    const stats = {
      totalProjects: projectCount,
      totalExperiences: experienceCount,
      totalMessages: messageCount,
      lastUpdated: lastUpdated.toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
