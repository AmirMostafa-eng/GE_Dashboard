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
import { BookOpen, Plus, Save } from "lucide-react";
import validateExam from "@/utils/EditFormValidate";
import EditSkillForm from "./EditSkillForm";

const GERMAN_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function EditExamDialog({ isOpen, onClose, exam, onSave }) {
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
    }
  }, [exam, isOpen]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    const newSkill = {
      name: "",
      description: "",
      audioUrl: "",
      stories: [],
      isNew: true, // Flag to indicate this is a newly added skill
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

  const cleanIsNewFlags = (obj) => {
    if (!obj || typeof obj !== "object") return obj;

    const cleaned = { ...obj };
    if ("isNew" in cleaned) {
      delete cleaned.isNew;
    }

    // Clean arrays
    Object.keys(cleaned).forEach((key) => {
      if (Array.isArray(cleaned[key])) {
        cleaned[key] = cleaned[key].map((item) => cleanIsNewFlags(item));
      } else if (typeof cleaned[key] === "object") {
        cleaned[key] = cleanIsNewFlags(cleaned[key]);
      }
    });

    return cleaned;
  };

  const handleSave = () => {
    if (validateExam(formData) === false) return;

    // Clean up isNew flags from the entire data structure
    const cleanedData = cleanIsNewFlags(formData);

    const examData = {
      ...cleanedData,
      id: exam.id,
    };
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
              Edit Exam {formData.title && `- ${formData.title}`}
            </DialogTitle>
          </div>
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
              <EditSkillForm
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
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditExamDialog;
