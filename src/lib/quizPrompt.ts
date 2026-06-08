export function buildQuizPrompt(slug: string, content: string): string {
  return `
Jesteś ekspertem od wzorców projektowych i zasad SOLID.
Na podstawie poniższych notatek o zasadzie "${slug.toUpperCase()}" wygeneruj dokładnie 4 pytania quizowe.

NOTATKI:
${content}

WYMAGANIA:
- Pytanie 1: o definicję zasady
- Pytanie 2:  o rozpoznanie naruszenia zasady w kodzie Java — MUSI zawierać krótki przykład kodu Java (max 8 linii) w polu "code". Przykład powinien być konkretny i pokazywać rzeczywiste naruszenie
- Pytanie 3: o poprawne zastosowanie zasady
- Pytanie 4: o pułapki lub edge case
- Pole "code" musi być pojedynczym stringiem JSON z escapowanymi znakami: nowe linie jako \\n, tabulatory jako \\t, cudzysłowy jako \\" itd.

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
      "code": null,
      "options": [
        { "key": "A", "text": "treść opcji A" },
        { "key": "B", "text": "treść opcji B" },
        { "key": "C", "text": "treść opcji C" }
      ],
      "correct": "A",
      "explanation": "wyjaśnienie"
    },
    {
      "id": 2,
      "type": "code",
      "question": "treść pytania",
      "code": "class UserService {\n  void saveUser() {}\n  void sendEmail() {}\n}",
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
