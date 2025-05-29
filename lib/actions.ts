"use server"

import { Resend } from "resend"
import { z } from "zod"
import clientPromise from "@/lib/mongodb"
import { envConfig } from "@/lib/env-config"

// Initialize Resend with environment variable
const resend = envConfig.resendApiKey ? new Resend(envConfig.resendApiKey) : null

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function sendContactEmail(formData: FormData) {
  // Extract form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate form data
  try {
    contactFormSchema.parse({
      name,
      email,
      subject,
      message,
    })
  } catch (error) {
    console.error("Form validation error:", error)
    throw new Error("Invalid form data")
  }

  try {
    // Save message to database
    const client = await clientPromise
    const db = client.db("Portfolio")

    await db.collection("messages").insertOne({
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: new Date(),
    })

    // Send email using Resend if configured
    if (resend && envConfig.nodeEnv === "production") {
      try {
        const { data, error } = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: envConfig.adminEmail,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
          reply_to: email,
        })

        if (error) {
          console.error("Resend API error:", error)
        } else {
          console.log("Email sent successfully:", data)
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError)
        // Don't throw error here, message is still saved to database
      }
    } else {
      console.log("Email would be sent in production:", {
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: envConfig.adminEmail,
        subject: `Portfolio Contact: ${subject}`,
        message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Contact form error:", error)
    throw new Error("Failed to send message")
  }
}
