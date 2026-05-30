export interface Question {
  id: number;
  competition: string;
  year: number;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}
