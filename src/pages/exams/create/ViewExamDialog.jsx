import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Eye } from "lucide-react";

function ViewExamDialog({ isOpen, onClose, exam }) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Eye size={20} />
            <DialogTitle>View Exam - {exam.title}</DialogTitle>
          </div>
          <button onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Exam Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Level</div>
              <Badge className="bg-primary text-primary-foreground">
                {exam.level}
              </Badge>
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
          </div>

          {/* Skills */}
          {exam.skills?.map((skill, skillIndex) => (
            <Card
              key={skill.id || skillIndex}
              className="border-2 border-secondary"
            >
              <CardHeader className="bg-secondary/20">
                <CardTitle className="text-lg">
                  {skill.name} ({skill.stories?.length || 0} stories)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {skill.stories?.map((story, storyIndex) => (
                  <div
                    key={story.id || storyIndex}
                    className="mb-4 p-3 border rounded-lg"
                  >
                    <h4 className="font-medium mb-2">{story.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {story.description}
                    </p>
                    <div className="text-sm">
                      <strong>Questions:</strong> {story.questions?.length || 0}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewExamDialog;
