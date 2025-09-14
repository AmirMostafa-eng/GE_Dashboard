import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronDown, ChevronRight } from "lucide-react";
import QuestionDetails from "./QuestionDetails";

function getLevelBadge(level) {
  const levelColors = {
    A1: "bg-green-100 text-green-800 border-green-200",
    A2: "bg-blue-100 text-blue-800 border-blue-200",
    B1: "bg-yellow-100 text-yellow-800 border-yellow-200",
    B2: "bg-orange-100 text-orange-800 border-orange-200",
    C1: "bg-purple-100 text-purple-800 border-purple-200",
    C2: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Badge
      className={`${
        levelColors[level] || "bg-gray-100 text-gray-800"
      } border font-medium`}
    >
      {level}
    </Badge>
  );
}

function ViewExamDialog({ isOpen, onClose, exam }) {
  const [expandedStories, setExpandedStories] = useState(new Set());

  if (!exam) return null;

  const getTotalQuestions = () => {
    return (
      exam.skills?.reduce((total, skill) => {
        return (
          total +
          (skill.stories?.reduce((storyTotal, story) => {
            return storyTotal + (story.questions?.length || 0);
          }, 0) || 0)
        );
      }, 0) || 0
    );
  };

  const toggleStoryExpansion = (skillIndex, storyIndex) => {
    const storyKey = `${skillIndex}-${storyIndex}`;
    const newExpanded = new Set(expandedStories);

    if (newExpanded.has(storyKey)) {
      newExpanded.delete(storyKey);
    } else {
      newExpanded.add(storyKey);
    }

    setExpandedStories(newExpanded);
  };

  const isStoryExpanded = (skillIndex, storyIndex) => {
    return expandedStories.has(`${skillIndex}-${storyIndex}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Eye size={20} />
            <DialogTitle>View Exam - {exam.title}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Exam Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Level</div>
              {/* <Badge className="bg-primary text-primary-foreground">
                {exam.level}
              </Badge> */}
              {getLevelBadge(exam.level)}
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Total Questions
              </div>
              <div className="font-semibold">{getTotalQuestions()}</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg col-span-2">
              <div className="text-sm text-muted-foreground mb-1">
                Description
              </div>
              <div className="font-semibold">
                {exam.description || "No description"}
              </div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Created At
              </div>
              <div className="font-semibold">
                {exam.createdAt
                  ? new Date(exam.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Skills Count
              </div>
              <div className="font-semibold">{exam.skills?.length || 0}</div>
            </div>
          </div>

          {/* Skills */}
          {exam.skills?.map((skill, skillIndex) => (
            <Card
              key={skill.id || skillIndex}
              className="border-2 border-secondary"
            >
              <CardHeader className="bg-secondary/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {skill.name} ({skill.stories?.length || 0} stories)
                  </CardTitle>
                  {skill.audioUrl && (
                    <Badge variant="outline" className="text-xs">
                      🎵 Audio Available
                    </Badge>
                  )}
                </div>
                {skill.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {skill.description}
                  </p>
                )}
              </CardHeader>
              <CardContent className="pt-4">
                {skill.stories?.map((story, storyIndex) => {
                  const isExpanded = isStoryExpanded(skillIndex, storyIndex);
                  const questionCount = story.questions?.length || 0;

                  return (
                    <div
                      key={story.id || storyIndex}
                      className="mb-4 rounded-lg overflow-hidden border-2 border-secondary"
                    >
                      {/* Story Header - Clickable */}
                      <Button
                        variant="ghost"
                        className="w-full p-3 text-left bg-primary hover:bg-primary/70 justify-start"
                        onClick={() =>
                          toggleStoryExpansion(skillIndex, storyIndex)
                        }
                      >
                        <div className="flex items-center justify-between w-full ">
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                            <h4 className="font-medium">{story.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {questionCount} question
                              {questionCount !== 1 ? "s" : ""}
                            </Badge>
                          </div>
                        </div>
                      </Button>

                      {/* Story Content - Expandable */}
                      {isExpanded && (
                        <div className="px-3 pb-3 border-t bg-white">
                          {/* Story Description */}
                          {story.description && (
                            <div className="mb-3 pt-3 flex gap-2">
                              <div className="text-xs font-medium text-muted-foreground mb-1">
                                Story Description:
                              </div>
                              <div
                                className="text-sm text-foreground prose prose-sm max-w-none "
                                dangerouslySetInnerHTML={{
                                  __html: story.description,
                                }}
                              />
                            </div>
                          )}

                          {/* Questions */}
                          {story.questions?.length > 0 ? (
                            <div className="space-y-3">
                              <div className="text-sm font-medium text-foreground">
                                Questions ({story.questions.length}):
                              </div>
                              {story.questions.map(
                                (question, questionIndex) => (
                                  <QuestionDetails
                                    key={question.id || questionIndex}
                                    question={question}
                                    questionIndex={questionIndex}
                                  />
                                )
                              )}
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground italic pt-3">
                              No questions available for this story.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* No stories message */}
                {(!skill.stories || skill.stories.length === 0) && (
                  <div className="text-sm text-muted-foreground italic">
                    No stories available for this skill.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewExamDialog;
