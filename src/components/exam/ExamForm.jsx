// ExamForm.jsx (simplified)
import React from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExamSchema } from "@/schemas/examSchema";
import SkillEditor from "./SkillEditor";

export default function ExamForm({ defaultValues = null, onSubmit }) {
  const methods = useForm({
    resolver: zodResolver(ExamSchema),
    defaultValues: defaultValues ?? {
      title: "",
      level: "B2",
      description: "",
      skills: [],
    },
    mode: "onBlur",
  });

  const { handleSubmit, control } = methods;
  const { fields: skillFields, append } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input {...methods.register("title")} className="input" />
        </div>

        <div>
          <label>Level</label>
          <select {...methods.register("level")} className="input">
            {["A1", "A2", "B1", "B2", "C1", "C2"].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Description</label>
          <textarea {...methods.register("description")} className="input" />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg">Skills</h3>
            <button
              type="button"
              onClick={() => append({ name: "", stories: [] })}
            >
              + Add Skill
            </button>
          </div>

          <div className="space-y-4">
            {skillFields.map((skill, index) => (
              <SkillEditor
                key={skill.id ?? skill._id ?? index}
                skillIndex={index}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn-primary">
            Save Exam
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
