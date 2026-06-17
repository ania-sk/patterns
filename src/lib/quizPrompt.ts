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

export function buildPatternQuizPrompt(slug: string, content: string): string {
  return `
Jesteś ekspertem od wzorców projektowych GoF (Gang of Four).
Na podstawie poniższych notatek o wzorcu "${slug}" wygeneruj dokładnie 4 pytania quizowe.

NOTATKI:
${content}

WYMAGANIA DLA PYTAŃ:
- Pytanie 1: o definicję wzorca — co robi i do jakiej grupy należy

- Pytanie 2: MUSI zawierać kod Java (max 8 linii) w polu "code" pokazujący problem 
  BEZ wzorca ${slug}. Kod musi pokazywać KONKRETNY, REALISTYCZNY problem — 
  nie sam fakt tworzenia obiektów, ale sytuację która prowadzi do błędów, 
  niespójności lub trudności w utrzymaniu kodu. Pokaż kod który "boli" — 
  gdzie brak wzorca ${slug} ma widoczne negatywne konsekwencje. ZAKAZ używania klasy SerwisWiadomosci lub przykładów 
  z powiadomieniami. Wymyśl inny, konkretny przykład domenowy (np. UI, baza danych, 
  konfiguracja systemu operacyjnego, sklep internetowy itp.) - Pole "code" musi być pojedynczym stringiem JSON z escapowanymi znakami: nowe linie jako \\n, tabulatory jako \\t, cudzysłowy jako \\" itd.

  - Pytanie 3: MUSI zawierać kod Java (max 8 linii) w polu "code" pokazujący 
  ROZWIĄZANIE tego samego problemu Z zastosowaniem wzorca ${slug}. 
  Kod musi być kontynuacją przykładu z pytania 2. - Pole "code" musi być pojedynczym stringiem JSON z escapowanymi znakami: nowe linie jako \\n, tabulatory jako \\t, cudzysłowy jako \\" itd.
 
- Pytanie 4: o pułapki, ograniczenia lub kiedy wzorca NIE stosować


WYMAGANIA DLA OPCJI ODPOWIEDZI:
- Wszystkie 3 opcje muszą być WIARYGODNE i MERYTORYCZNE
- Dystraktory muszą być typowymi błędnymi przekonaniami o wzorcu
- Żadnych absurdalnych opcji jak "brak pamięci", "wolne wykonanie", "zła baza danych"
- Pytanie NIE MOŻE zawierać w treści nazwy poprawnej odpowiedzi
- Opcje powinny być podobnej długości

 WYMAGANIA DLA PYTANIA 3:
- Opcje odpowiedzi NIE MOGĄ być nazwami wzorców projektowych
- Zamiast tego pokaż 3 różne podejścia implementacyjne i zapytaj które 
  jest poprawną implementacją wzorca ${slug}
- Np. opcje mogą opisywać strukturę kodu: "interfejs z metodami tworzącymi 
  powiązane obiekty", "klasa abstrakcyjna z jedną metodą fabryczną", 
  "statyczne metody w klasie narzędziowej"

Każde pytanie musi mieć:
- 3 opcje odpowiedzi (A, B, C)
- dokładnie jedną poprawną odpowiedź
- krótkie wyjaśnienie (max 2 zdania) dlaczego odpowiedź jest poprawna;

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
      "code": "class Example {\n  void method() {}\n}",
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
