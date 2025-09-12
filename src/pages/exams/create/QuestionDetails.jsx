import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

function getQuestionTypeBadge(type) {
  const typeColors = {
    single_choice: "bg-blue-100 text-blue-800",
    multi_choice: "bg-green-100 text-green-800",
    true_false: "bg-purple-100 text-purple-800",
    matching: "bg-orange-100 text-orange-800",
  };

  const typeLabels = {
    single_choice: "Single Choice",
    multi_choice: "Multiple Choice",
    true_false: "True/False",
    matching: "Matching",
  };

  return (
    <Badge
      className={`${
        typeColors[type] || "bg-gray-100 text-gray-800"
      } border font-medium text-xs`}
    >
      {typeLabels[type] || type}
    </Badge>
  );
}

export default function QuestionDetails({ question, questionIndex }) {
  return (
    <div className="ml-4 mt-2 p-3 bg-muted/20 rounded-lg border-l-4 border-primary">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">Q{questionIndex + 1}:</span>
          {getQuestionTypeBadge(question.type)}
          {question.score > 0 && (
            <Badge variant="outline" className="text-xs">
              {question.score} pts
            </Badge>
          )}
        </div>
      </div>

      {/* Question Text */}
      <div
        className="text-sm mb-3 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html: question.text || "No question text",
        }}
      />

      {/* Answers */}
      <div className="space-y-1">
        <div className="text-xs font-medium text-muted-foreground mb-2">
          Answers:
        </div>
        {question.answers?.map((answer, answerIndex) => (
          <div
            key={answer.id || answerIndex}
            className={`flex items-start gap-2 text-sm p-2 rounded ${
              answer.isCorrect
                ? "bg-success/10 border border-success/20"
                : "bg-white border border-border"
            }`}
          >
            <div className="mt-0.5">
              {answer.isCorrect ? (
                <CheckCircle size={14} className="text-success" />
              ) : (
                <XCircle size={14} className="text-muted-foreground" />
              )}
            </div>
            <span
              className={
                answer.isCorrect
                  ? "font-medium text-foreground"
                  : "text-foreground"
              }
            >
              {answer.questionText}
            </span>
          </div>
        ))}
      </div>

      {/* Explanation if available */}
      {question.explanation && (
        <div className="mt-3 pt-2 border-t border-border">
          <div className="text-xs font-medium text-muted-foreground mb-1">
            Explanation:
          </div>
          <div
            className="text-xs text-muted-foreground italic prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: question.explanation }}
          />
        </div>
      )}
    </div>
  );
}
