// schemas/examSchema.ts
import { z } from "zod";

const AnswerSchema = z.object({
  id: z.number().optional(),
  questionText: z.string().min(1),
  isCorrect: z.boolean(),
  question: z.any().nullable().optional(),
});

const QuestionSchema = z.object({
  id: z.number().optional(),
  type: z.enum(["single_choice", "multi_choice", "true_false", "matching"]),
  text: z.string().min(1),
  explanation: z.string().nullable().optional(),
  score: z.number().min(0).optional().default(0),
  story: z.any().nullable().optional(),
  answers: z.array(AnswerSchema).min(1),
});

const StorySchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  // audioUrl: z.string().url().nullable().optional(),
  skill: z.any().nullable().optional(),
  questions: z.array(QuestionSchema).optional().default([]),
});

const SkillSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  audioUrl: z.string().url().nullable().optional(),
  stories: z.array(StorySchema).optional().default([]),
});

export const ExamSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  description: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  skills: z.array(SkillSchema).optional().default([]),
});
export type ExamType = z.infer<typeof ExamSchema>;
