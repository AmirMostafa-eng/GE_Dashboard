import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const QUESTION_TYPES = [
  { value: "single_choice", label: "Single Choice" },
  { value: "multi_choice", label: "Multiple Choice" },
  { value: "true_false", label: "True/False" },
  { value: "matching", label: "Matching" },
];

// German levels
const GERMAN_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

// Question Form Component
export default function QuestionForm({ question, onChange, onDelete }) {
  const updateQuestion = (field, value) => {
    onChange({ ...question, [field]: value });
  };

  const updateAnswer = (answerIndex, field, value) => {
    const updatedAnswers = question.answers.map((answer, index) =>
      index === answerIndex ? { ...answer, [field]: value } : answer
    );
    updateQuestion("answers", updatedAnswers);
  };

  const addAnswer = () => {
    // If it's a true/false question and we already have 2 answers, don't add more
    if (question.type === "true_false" && question.answers?.length >= 2) {
      return;
    }

    const newAnswer = {
      text:
        question.type === "true_false"
          ? question.answers?.length === 0
            ? "True"
            : "False"
          : "",
      isCorrect: false,
    };

    updateQuestion("answers", [...(question.answers || []), newAnswer]);
  };

  const removeAnswer = (answerIndex) => {
    const updatedAnswers = question.answers.filter(
      (_, index) => index !== answerIndex
    );
    updateQuestion("answers", updatedAnswers);
  };

  const getAnswerPlaceholder = (type) => {
    switch (type) {
      case "true_false":
        return "True or False";
      case "matching":
        return 'Item ↔ Match (e.g., "Word ↔ Meaning")';
      default:
        return "Answer option";
    }
  };

  return (
    <Card className="mb-4 border border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 mb-3 bg-secondary/20">
        <CardTitle className="text-sm font-medium text-secondary-foreground">
          Question
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 size={14} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question Type */}
        <div className="space-y-2">
          <Label>Question Type</Label>
          <Select
            value={question.type}
            onValueChange={(value) => {
              if (value === "true_false") {
                // Set up true/false answers
                updateQuestion("answers", [
                  {
                    id: Date.now(),
                    text: "True",
                    isCorrect: false,
                    // question: null,
                  },
                  {
                    id: Date.now() + 1,
                    text: "False",
                    isCorrect: false,
                    // question: null,
                  },
                ]);
              }
              updateQuestion("type", value);
            }}
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {QUESTION_TYPES.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className="bg-white"
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Question Text */}
        <div className="space-y-2">
          <Label>Question Text</Label>
          <Textarea
            value={question.questionText || ""}
            onChange={(e) => updateQuestion("questionText", e.target.value)}
            placeholder="Enter your question..."
            className="bg-white resize-none"
            rows={3}
          />
        </div>

        {/* Explanation */}
        <div className="space-y-2">
          <Label>Explanation (Optional)</Label>
          <Textarea
            value={question.explanation || ""}
            onChange={(e) => updateQuestion("explanation", e.target.value)}
            placeholder="Explain the answer..."
            className="bg-white resize-none"
            rows={2}
          />
        </div>

        {/* Score */}
        <div className="space-y-2">
          <Label>Score</Label>
          <Input
            type="number"
            value={question.score || 0}
            onChange={(e) => updateQuestion("score", Number(e.target.value))}
            placeholder="Points for this question"
            className="bg-white"
          />
        </div>

        {/* Answers ===========================================================*/}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Answers</Label>
            {question.type === "true_false" ? (
              question.answers?.length < 2 ? (
                <Button size="sm" onClick={addAnswer}>
                  <Plus size={14} className="mr-1" />
                  Add Answer
                </Button>
              ) : null
            ) : (
              <Button size="sm" onClick={addAnswer}>
                <Plus size={14} className="mr-1" />
                Add Answer
              </Button>
            )}
          </div>

          {question.answers?.map((answer, answerIndex) => (
            <div
              key={answer.id || answerIndex}
              className="flex gap-2 items-start p-3 border rounded-md"
            >
              <div className="flex-1 space-y-2">
                <Input
                  value={answer.text || ""}
                  onChange={(e) =>
                    updateAnswer(answerIndex, "text", e.target.value)
                  }
                  placeholder={getAnswerPlaceholder(question.type)}
                  className="bg-white"
                  disabled={question.type === "true_false"}
                />
                <div className="flex items-center gap-2">
                  <input
                    type={
                      question.type === "multi_choice" ? "checkbox" : "radio"
                    }
                    checked={answer.isCorrect || false}
                    name={`question-${question.id || Date.now()}`}
                    onChange={(e) => {
                      if (question.type === "multi_choice") {
                        // For multiple choice, just toggle the current answer
                        updateAnswer(
                          answerIndex,
                          "isCorrect",
                          e.target.checked
                        );
                      } else {
                        // For single choice and matching, uncheck all others and check this one
                        const updatedAnswers = question.answers.map(
                          (ans, idx) => ({
                            ...ans,
                            isCorrect: idx === answerIndex,
                          })
                        );
                        updateQuestion("answers", updatedAnswers);
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-muted-foreground">
                    Correct Answer
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeAnswer(answerIndex)}
                className="text-destructive"
                // Disable remove button for true/false questions
                // disabled={question.type === "true_false"}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
