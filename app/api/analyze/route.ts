import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const requesterName = formData.get("requesterName") as string
    const requesterEmail = formData.get("requesterEmail") as string
    const notes = formData.get("notes") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to text (simplified - in production you'd use proper PDF/Word parsing)
    const fileText = await file.text()

    // Analyze contract with AI
    const { text: analysis } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a legal contract analysis AI. Analyze the provided contract and identify:
      1. Liability clauses and risk exposure
      2. Insurance requirements and gaps
      3. Termination conditions and penalties
      4. Contract duration and renewal terms
      5. Other potential legal concerns
      
      Provide a risk score from 1-100 and detailed findings with recommendations.`,
      prompt: `Analyze this contract document:\n\n${fileText}\n\nRequester notes: ${notes || "None"}`,
    })

    // Extract risk score from analysis (simplified)
    const riskScoreMatch = analysis.match(/risk score:?\s*(\d+)/i)
    const riskScore = riskScoreMatch ? Number.parseInt(riskScoreMatch[1]) : 50

    // Simulate email sending (in production, integrate with email service)
    console.log(`Sending analysis to ${requesterEmail}`)

    return NextResponse.json({
      success: true,
      analysis,
      riskScore,
      fileName: file.name,
      requester: requesterName,
      email: requesterEmail,
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze contract" }, { status: 500 })
  }
}
