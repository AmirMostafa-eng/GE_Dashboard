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
import EditStoryForm from "./EditStoryForm";

// Skill type options
const SKILL_TYPES = [
  { value: "Listening", label: "Listening" },
  { value: "Reading", label: "Reading" },
  { value: "Writing", label: "Writing" },
];

export default function EditSkillForm({ skill, onChange, onDelete }) {
  const updateSkill = (field, value) => {
    onChange({ ...skill, [field]: value });
  };

  const addStory = () => {
    const newStory = {
      title: "",
      description: "",
      questions: [],
    };
    updateSkill("stories", [...(skill.stories || []), newStory]);
  };

  const updateStory = (storyIndex, updatedStory) => {
    const updatedStories = skill.stories.map((story, index) =>
      index === storyIndex ? updatedStory : story
    );
    updateSkill("stories", updatedStories);
  };

  const removeStory = (storyIndex) => {
    const updatedStories = skill.stories.filter(
      (_, index) => index !== storyIndex
    );
    updateSkill("stories", updatedStories);
  };

  return (
    <Card className="mb-6 border-2 border-secondary">
      <CardHeader className="bg-secondary/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-secondary-foreground">
            Skill: {skill.name || "Select skill type"}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {/* Skill Name - Changed to Select */}
        <div className="space-y-2">
          <Label>Skill Type</Label>
          <Select
            value={skill.name || ""}
            onValueChange={(value) => updateSkill("name", value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select skill type..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {SKILL_TYPES.map((skillType) => (
                <SelectItem
                  key={skillType.value}
                  value={skillType.value}
                  className="bg-white"
                >
                  {skillType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skill Description */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={skill.description || ""}
            onChange={(e) => updateSkill("description", e.target.value)}
            placeholder="Skill description..."
            rows={3}
            className="bg-white resize-none"
          />
        </div>

        {/* Audio URL - Show only for Listening skills */}
        {skill.name === "Listening" && (
          <div className="space-y-2">
            <Label>Audio URL (Required for Listening skills)</Label>
            <Input
              value={skill.audioUrl || ""}
              onChange={(e) => updateSkill("audioUrl", e.target.value)}
              placeholder="https://example.com/audio.mp3"
              className="bg-white"
            />
          </div>
        )}

        {/* Stories */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Stories ({skill.stories?.length || 0})</Label>
            <Button size="sm" onClick={addStory}>
              <Plus size={14} className="mr-1" />
              Add Story
            </Button>
          </div>

          {skill.stories?.map((story, storyIndex) => (
            <EditStoryForm
              key={story.id || storyIndex}
              story={story}
              onChange={(updatedStory) => updateStory(storyIndex, updatedStory)}
              onDelete={() => removeStory(storyIndex)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
