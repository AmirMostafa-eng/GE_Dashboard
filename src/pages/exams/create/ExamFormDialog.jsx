import { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Plus, Save, BookOpen } from "lucide-react";
import SkillForm from "./SkillForm";
// import toast from "react-hot-toast";
import validateExam from "@/utils/ExamFormValidate";

const GERMAN_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
function ExamFormDialog({ isOpen, onClose, exam, onSave, mode = "add" }) {
  const [formData, setFormData] = useState({
    title: "",
    level: "A1",
    description: "",
    skills: [],
  });

  useEffect(() => {
    if (exam) {
      setFormData({
        title: exam.title || "",
        level: exam.level || "A1",
        description: exam.description || "",
        skills: exam.skills || [],
      });
    } else {
      // Reset for "add" mode
      setFormData({
        title: "",
        level: "A1",
        description: "",
        skills: [],
      });
    }
  }, [exam, mode, isOpen]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const newSkill = {
      // id: Date.now(),
      name: "",
      description: "",
      audioUrl: "",
      stories: [],
    };
    updateFormData("skills", [...formData.skills, newSkill]);
  };

  const updateSkill = (skillIndex, updatedSkill) => {
    const updatedSkills = formData.skills.map((skill, index) =>
      index === skillIndex ? updatedSkill : skill
    );
    updateFormData("skills", updatedSkills);
  };

  const removeSkill = (skillIndex) => {
    const updatedSkills = formData.skills.filter(
      (_, index) => index !== skillIndex
    );
    updateFormData("skills", updatedSkills);
  };

  const handleSave = () => {
    // checking data validation before sending
    if (validateExam(formData) === false) return;
    console.log(formData);

    let examData;
    if (mode === "edit" && exam) {
      examData = {
        ...formData,
        id: exam.id,
      };
    } else {
      examData = { ...formData };
    }
    onSave(examData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95%] xl:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={20} />
            <DialogTitle>
              {mode === "edit" ? "Edit" : "Add New"} Exam{" "}
              {formData.title && `- ${formData.title}`}
            </DialogTitle>
          </div>
          {/* <button onClick={onClose}>
            <X className="h-4 w-4" />
          </button> */}
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Exam Title</Label>
              <Input
                className="bg-white"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="Enter exam title..."
                // required
              />
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => updateFormData("level", value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {GERMAN_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                rows={4}
                className="resize-none bg-white"
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Exam description..."
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Skills ({formData.skills.length})
              </h3>
              <Button onClick={addSkill}>
                <Plus size={14} className="mr-1" />
                Add Skill
              </Button>
            </div>

            {formData.skills.map((skill, skillIndex) => (
              <SkillForm
                key={skill.id || skillIndex}
                skill={skill}
                onChange={(updatedSkill) =>
                  updateSkill(skillIndex, updatedSkill)
                }
                onDelete={() => removeSkill(skillIndex)}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save size={14} className="mr-1" />
              {mode === "edit" ? "Save Changes" : "Create Exam"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ExamFormDialog;
