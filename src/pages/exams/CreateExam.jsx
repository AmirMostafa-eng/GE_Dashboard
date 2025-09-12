import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Plus, Minus, Trash2 } from "lucide-react";
import axios from "axios";

const QUESTION_TYPES = {
  SINGLE_CHOICE: "single_choice",
  MULTI_CHOICE: "multi_choice",
  TRUE_FALSE: "true_false",
  MATCHING: "matching",
};

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const SKILLS = [
  { id: "listening", name: "Listening" },
  { id: "reading", name: "Reading" },
  { id: "writing", name: "Writing" },
];

export default function CreateExam({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    level: "",
    description: "",
    skills: [
      {
        name: "",
        audioUrl: "",
        stories: [
          {
            title: "",
            description: "",
            questions: [
              {
                type: QUESTION_TYPES.SINGLE_CHOICE,
                text: "",
                explanation: "",
                answers: [
                  { questionText: "", isCorrect: false },
                  { questionText: "", isCorrect: false },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/exam/create", formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating exam:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          name: "",
          audioUrl: "",
          stories: [
            {
              title: "",
              description: "",
              questions: [
                {
                  type: QUESTION_TYPES.SINGLE_CHOICE,
                  text: "",
                  explanation: "",
                  answers: [
                    { questionText: "", isCorrect: false },
                    { questionText: "", isCorrect: false },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }));
  };

  const addStory = (skillIndex) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[skillIndex].stories.push({
        title: "",
        description: "",
        questions: [
          {
            type: QUESTION_TYPES.SINGLE_CHOICE,
            text: "",
            explanation: "",
            answers: [
              { questionText: "", isCorrect: false },
              { questionText: "", isCorrect: false },
            ],
          },
        ],
      });
      return { ...prev, skills: newSkills };
    });
  };

  const addQuestion = (skillIndex, storyIndex) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[skillIndex].stories[storyIndex].questions.push({
        type: QUESTION_TYPES.SINGLE_CHOICE,
        text: "",
        explanation: "",
        answers: [
          { questionText: "", isCorrect: false },
          { questionText: "", isCorrect: false },
        ],
      });
      return { ...prev, skills: newSkills };
    });
  };

  const handleSkillChange = (skillIndex, field, value) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[skillIndex][field] = value;
      return { ...prev, skills: newSkills };
    });
  };

  const handleStoryChange = (skillIndex, storyIndex, field, value) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[skillIndex].stories[storyIndex][field] = value;
      return { ...prev, skills: newSkills };
    });
  };

  const handleQuestionChange = (
    skillIndex,
    storyIndex,
    questionIndex,
    field,
    value
  ) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[skillIndex].stories[storyIndex].questions[questionIndex][
        field
      ] = value;
      return { ...prev, skills: newSkills };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Exam</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Exam Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, level: value }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Skills</h3>
              <button
                type="button"
                onClick={addSkill}
                className="text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Plus size={16} /> Add Skill
              </button>
            </div>

            {formData.skills.map((skill, skillIndex) => (
              <SkillSection
                key={skillIndex}
                skill={skill}
                skillIndex={skillIndex}
                onSkillChange={handleSkillChange}
                onAddStory={() => addStory(skillIndex)}
                onStoryChange={handleStoryChange}
                onAddQuestion={addQuestion}
                onQuestionChange={handleQuestionChange}
              />
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Exam"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SkillSection({
  skill,
  skillIndex,
  onSkillChange,
  onAddStory,
  onStoryChange,
  onAddQuestion,
  onQuestionChange,
}) {
  return (
    <div className="border border-border rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Skill Name</Label>
          <Select
            value={skill.name}
            onValueChange={(value) => onSkillChange(skillIndex, "name", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent>
              {SKILLS.map((s) => (
                <SelectItem key={s.id} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {skill.name === "Listening" && (
          <div className="space-y-2">
            <Label>Audio URL</Label>
            <Input
              value={skill.audioUrl || ""}
              onChange={(e) =>
                onSkillChange(skillIndex, "audioUrl", e.target.value)
              }
              placeholder="https://example.com/audio.mp3"
            />
          </div>
        )}
      </div>

      {/* Stories */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Stories</h4>
          <button
            type="button"
            onClick={onAddStory}
            className="text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <Plus size={16} /> Add Story
          </button>
        </div>

        {skill.stories.map((story, storyIndex) => (
          <StorySection
            key={storyIndex}
            story={story}
            skillIndex={skillIndex}
            storyIndex={storyIndex}
            onStoryChange={onStoryChange}
            onAddQuestion={() => onAddQuestion(skillIndex, storyIndex)}
            onQuestionChange={onQuestionChange}
          />
        ))}
      </div>
    </div>
  );
}

function StorySection({
  story,
  skillIndex,
  storyIndex,
  onStoryChange,
  onAddQuestion,
  onQuestionChange,
}) {
  return (
    <div className="border border-border rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Story Title</Label>
          <Input
            value={story.title}
            onChange={(e) =>
              onStoryChange(skillIndex, storyIndex, "title", e.target.value)
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={story.description || ""}
            onChange={(e) =>
              onStoryChange(
                skillIndex,
                storyIndex,
                "description",
                e.target.value
              )
            }
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h5 className="font-medium">Questions</h5>
          <button
            type="button"
            onClick={onAddQuestion}
            className="text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <Plus size={16} /> Add Question
          </button>
        </div>

        {story.questions.map((question, questionIndex) => (
          <QuestionSection
            key={questionIndex}
            question={question}
            skillIndex={skillIndex}
            storyIndex={storyIndex}
            questionIndex={questionIndex}
            onQuestionChange={onQuestionChange}
          />
        ))}
      </div>
    </div>
  );
}

function QuestionSection({
  question,
  skillIndex,
  storyIndex,
  questionIndex,
  onQuestionChange,
}) {
  return (
    <div className="border border-border rounded-lg p-4 space-y-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Question Type</Label>
            <Select
              value={question.type}
              onValueChange={(value) =>
                onQuestionChange(
                  skillIndex,
                  storyIndex,
                  questionIndex,
                  "type",
                  value
                )
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={QUESTION_TYPES.SINGLE_CHOICE}>
                  Single Choice
                </SelectItem>
                <SelectItem value={QUESTION_TYPES.MULTI_CHOICE}>
                  Multiple Choice
                </SelectItem>
                <SelectItem value={QUESTION_TYPES.TRUE_FALSE}>
                  True/False
                </SelectItem>
                <SelectItem value={QUESTION_TYPES.MATCHING}>
                  Matching
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Question Text</Label>
          <Textarea
            value={question.text}
            onChange={(e) =>
              onQuestionChange(
                skillIndex,
                storyIndex,
                questionIndex,
                "text",
                e.target.value
              )
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Explanation (Optional)</Label>
          <Textarea
            value={question.explanation || ""}
            onChange={(e) =>
              onQuestionChange(
                skillIndex,
                storyIndex,
                questionIndex,
                "explanation",
                e.target.value
              )
            }
          />
        </div>

        <AnswerSection
          question={question}
          skillIndex={skillIndex}
          storyIndex={storyIndex}
          questionIndex={questionIndex}
          onQuestionChange={onQuestionChange}
        />
      </div>
    </div>
  );
}

function AnswerSection({
  question,
  skillIndex,
  storyIndex,
  questionIndex,
  onQuestionChange,
}) {
  const addAnswer = () => {
    const newAnswers = [
      ...question.answers,
      { questionText: "", isCorrect: false },
    ];
    onQuestionChange(
      skillIndex,
      storyIndex,
      questionIndex,
      "answers",
      newAnswers
    );
  };

  const removeAnswer = (answerIndex) => {
    const newAnswers = question.answers.filter(
      (_, index) => index !== answerIndex
    );
    onQuestionChange(
      skillIndex,
      storyIndex,
      questionIndex,
      "answers",
      newAnswers
    );
  };

  const updateAnswer = (answerIndex, field, value) => {
    const newAnswers = [...question.answers];
    newAnswers[answerIndex][field] = value;
    onQuestionChange(
      skillIndex,
      storyIndex,
      questionIndex,
      "answers",
      newAnswers
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Answers</Label>
        <button
          type="button"
          onClick={addAnswer}
          className="text-primary hover:text-primary/80 flex items-center gap-1"
        >
          <Plus size={16} /> Add Answer
        </button>
      </div>

      {question.answers.map((answer, answerIndex) => (
        <div key={answerIndex} className="flex gap-4 items-start">
          <div className="flex-1">
            <Input
              value={answer.questionText}
              onChange={(e) =>
                updateAnswer(answerIndex, "questionText", e.target.value)
              }
              placeholder="Answer text"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type={
                question.type === QUESTION_TYPES.MULTI_CHOICE
                  ? "checkbox"
                  : "radio"
              }
              name={`correct-${questionIndex}`}
              checked={answer.isCorrect}
              onChange={(e) =>
                updateAnswer(answerIndex, "isCorrect", e.target.checked)
              }
              className="w-4 h-4"
            />
            <button
              type="button"
              onClick={() => removeAnswer(answerIndex)}
              className="text-destructive hover:text-destructive/80"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
