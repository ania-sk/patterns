import { NextRequest, NextResponse } from "next/server";
import { buildQuizPrompt } from "@/lib/quizPrompt";
import { buildPatternQuizPrompt } from "@/lib/quizPrompt";

// Tasuje opcje pytania i aktualizuje pole correct
function shuffleOptions(
  questions: {
    id: number;
    type: string;
    question: string;
    code?: string | null;
    options: { key: string; text: string }[];
    correct: string;
    explanation: string;
  }[],
) {
  return questions.map((q) => {
    const correctOption = q.options.find((o) => o.key === q.correct);
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    const keys = ["A", "B", "C"];
    const remapped = shuffled.map((opt, i) => ({
      key: keys[i],
      text: opt.text,
    }));
    const newCorrect =
      keys[shuffled.findIndex((o) => o.text === correctOption?.text)];
    return { ...q, options: remapped, correct: newCorrect };
  });
}

export async function POST(req: NextRequest) {
  try {
    const { slug, content, type } = await req.json();

    if (!slug || !content) {
      return NextResponse.json(
        { error: "Brak wymaganych pól: slug, content" },
        { status: 400 },
      );
    }

    const prompt =
      type === "pattern"
        ? buildPatternQuizPrompt(slug, content)
        : buildQuizPrompt(slug, content);

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
    const sanitized = clean.replace(
      /"code"\s*:\s*"([\s\S]*?)"/g,
      (match: string) => match.replace(/\n/g, "\\n").replace(/\t/g, "\\t"),
    );

    const parsed = JSON.parse(sanitized);
    parsed.questions = shuffleOptions(parsed.questions);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Nie udało się wygenerować pytań" },
      { status: 500 },
    );
  }
}
