// SkillEditor.jsx
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import StoryEditor from "./StoryEditor";

export default function SkillEditor({ skillIndex }) {
  const { register, control, watch } = useFormContext();
  const {
    fields: storyFields,
    append: appendStory,
    remove: removeStory,
  } = useFieldArray({
    control,
    name: `skills.${skillIndex}.stories`,
  });

  return (
    <div className="border rounded p-3">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex-1">
          <input
            {...register(`skills.${skillIndex}.name`)}
            placeholder="Skill name"
            className="input"
          />
          <input
            {...register(`skills.${skillIndex}.audioUrl`)}
            className="input mt-2"
            placeholder="Audio URL (optional)"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => appendStory({ title: "", questions: [] })}
          >
            + Story
          </button>
          <button
            type="button"
            onClick={() => {
              /* remove skill logic: use top-level field array remove */
            }}
          >
            Remove Skill
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {storyFields.map((story, sIndex) => (
          <StoryEditor
            key={story.id ?? sIndex}
            skillIndex={skillIndex}
            storyIndex={sIndex}
            removeStory={() => removeStory(sIndex)}
          />
        ))}
      </div>
    </div>
  );
}
