type Answer = {
  text: string;
  value: number;
}

type Question = {
  id: number;
  question: string;
  answers: Answer[];
}

export type Survey = Question[]

export type SurveyCardProps = {
  id: number;
  question: string;
  answers: Answer[];
  selectedValue: number | null;
  onPointsChange: (questionId: number, newValue: number) => void;
};

export type ContactForm = {
  name: string;
  email: string;
  score: number;
  answers: { [key: number]: number };
}

export type ResultTier = {
  title: string;
  subtitle: string;
  description: string;
  risk: string;
  nextStep: string;
  ctaLabel: string;
  whatsappUrl: string;
  color: string;
  emoji: string;
}
