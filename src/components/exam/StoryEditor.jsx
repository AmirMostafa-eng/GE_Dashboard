// StoryEditor.jsx (simplified)
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import QuestionEditor from "./QuestionEditor";

export default function StoryEditor({ skillIndex, storyIndex, removeStory }) {
  const { register, control } = useFormContext();
  const qArrName = `skills.${skillIndex}.stories.${storyIndex}.questions`;
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: qArrName,
  });

  return (
    <div className="border p-2 rounded bg-white">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <input
            {...register(`skills.${skillIndex}.stories.${storyIndex}.title`)}
            placeholder="Story title"
            className="input"
          />
          <input
            {...register(`skills.${skillIndex}.stories.${storyIndex}.audioUrl`)}
            placeholder="Story audioUrl"
            className="input mt-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() =>
              appendQuestion({
                type: "single_choice",
                text: "",
                answers: [{ questionText: "", isCorrect: false }],
              })
            }
          >
            + Question
          </button>
          <button type="button" onClick={removeStory}>
            Remove Story
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {questionFields.map((q, qIdx) => (
          <QuestionEditor
            key={q.id ?? qIdx}
            skillIndex={skillIndex}
            storyIndex={storyIndex}
            questionIndex={qIdx}
            remove={() => removeQuestion(qIdx)}
          />
        ))}
      </div>
    </div>
  );
}
