export function buildQuizPrompt(slug: string, content: string): string {
  return `
Jesteś ekspertem od wzorców projektowych i zasad SOLID.
Na podstawie poniższych notatek o zasadzie "${slug.toUpperCase()}" wygeneruj dokładnie 4 pytania quizowe.

NOTATKI:
${content}

WYMAGANIA:
- Pytanie 1: o definicję zasady
- Pytanie 2: o rozpoznanie naruszenia zasady w kodzie Java
- Pytanie 3: o poprawne zastosowanie zasady
- Pytanie 4: o pułapki lub edge case

Każde pytanie musi mieć:
- 3 opcje odpowiedzi (A, B, C)
- dokładnie jedną poprawną odpowiedź
- krótkie wyjaśnienie (max 2 zdania) dlaczego odpowiedź jest poprawna

Odpowiedz WYŁĄCZNIE w formacie JSON, bez żadnego tekstu przed ani po:
{
  "questions": [
    {
      "id": 1,
      "type": "definition",
      "question": "treść pytania",
      "options": [
        { "key": "A", "text": "treść opcji A" },
        { "key": "B", "text": "treść opcji B" },
        { "key": "C", "text": "treść opcji C" }
      ],
      "correct": "A",
      "explanation": "wyjaśnienie"
    }
  ]
}
`.trim();
}
