import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import EditQuestionForm from "./EditQuestionForm";

export default function EditStoryForm({ story, onChange, onDelete }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const updateStory = (field, value) => {
    onChange({ ...story, [field]: value });
  };

  const addQuestion = () => {
    const newQuestion = {
      type: "single_choice",
      text: "",
      explanation: "",
      score: 1,
      answers: [],
      isNew: true, // Flag to indicate this is a newly added question
    };
    updateStory("questions", [...(story.questions || []), newQuestion]);
  };

  const updateQuestion = (questionIndex, updatedQuestion) => {
    const updatedQuestions = story.questions.map((question, index) =>
      index === questionIndex ? updatedQuestion : question
    );
    updateStory("questions", updatedQuestions);
  };

  const removeQuestion = (questionIndex) => {
    const updatedQuestions = story.questions.filter(
      (_, index) => index !== questionIndex
    );
    updateStory("questions", updatedQuestions);
  };

  return (
    <Card className="mb-4">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 py-3 mb-3 bg-secondary/20 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          {isCollapsed ? (
            <ChevronRight size={20} className="text-secondary-foreground" />
          ) : (
            <ChevronDown size={20} className="text-secondary-foreground" />
          )}
          <CardTitle className="text-sm font-bold text-secondary-foreground">
            Story: {story.title || "Untitled"}
          </CardTitle>
        </div>
        {story.isNew && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent collapse toggle when clicking delete
              onDelete();
            }}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 size={14} />
          </Button>
        )}
      </CardHeader>
      <CardContent className={`space-y-4 ${isCollapsed ? "hidden" : ""}`}>
        {/* Story Title */}
        <div className="space-y-2">
          <Label>Story Title</Label>
          <Input
            value={story.title || ""}
            onChange={(e) => updateStory("title", e.target.value)}
            placeholder="Story title..."
            className="bg-white"
          />
        </div>

        {/* Story Description */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={story.description || ""}
            onChange={(e) => updateStory("description", e.target.value)}
            placeholder="Story description..."
            className="bg-white resize-none"
            rows={3}
          />
        </div>

        {/* Questions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Questions ({story.questions?.length || 0})</Label>
            <Button size="sm" onClick={addQuestion}>
              <Plus size={14} className="mr-1" />
              Add Question
            </Button>
          </div>

          {story.questions?.map((question, questionIndex) => (
            <EditQuestionForm
              key={question.id || questionIndex}
              question={question}
              onChange={(updatedQuestion) =>
                updateQuestion(questionIndex, updatedQuestion)
              }
              onDelete={() => removeQuestion(questionIndex)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
