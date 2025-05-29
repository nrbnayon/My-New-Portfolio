import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import clientPromise from "@/lib/mongodb"
import { initialProjects, initialExperiences, initialProfile } from "@/lib/seed-data"

export async function POST() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("Portfolio")

    // Check if data already exists
    const existingProjects = await db.collection("projects").countDocuments()
    const existingExperiences = await db.collection("experiences").countDocuments()
    const existingProfile = await db.collection("profile").countDocuments()

    const results = {
      projects: { existing: existingProjects, inserted: 0 },
      experiences: { existing: existingExperiences, inserted: 0 },
      profile: { existing: existingProfile, inserted: 0 },
    }

    // Seed projects if none exist
    if (existingProjects === 0) {
      const projectResult = await db.collection("projects").insertMany(initialProjects)
      results.projects.inserted = projectResult.insertedCount
    }

    // Seed experiences if none exist
    if (existingExperiences === 0) {
      const experienceResult = await db.collection("experiences").insertMany(initialExperiences)
      results.experiences.inserted = experienceResult.insertedCount
    }

    // Seed profile if none exists
    if (existingProfile === 0) {
      const profileResult = await db.collection("profile").insertOne(initialProfile)
      results.profile.inserted = profileResult.insertedId ? 1 : 0
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      results,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("Portfolio")

    // Clear all collections
    await Promise.all([
      db.collection("projects").deleteMany({}),
      db.collection("experiences").deleteMany({}),
      db.collection("profile").deleteMany({}),
      db.collection("messages").deleteMany({}),
    ])

    return NextResponse.json({
      success: true,
      message: "Database cleared successfully",
    })
  } catch (error) {
    console.error("Error clearing database:", error)
    return NextResponse.json({ error: "Failed to clear database" }, { status: 500 })
  }
}
