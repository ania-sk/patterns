import { NextRequest, NextResponse } from "next/server";
import { buildQuizPrompt } from "@/lib/quizPrompt";

export async function POST(req: NextRequest) {
  try {
    const { slug, content } = await req.json();

    if (!slug || !content) {
      return NextResponse.json(
        { error: "Brak wymaganych pól: slug, content" },
        { status: 400 },
      );
    }

    const prompt = buildQuizPrompt(slug, content);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Nie udało się wygenerować pytań" },
      { status: 500 },
    );
  }
}
