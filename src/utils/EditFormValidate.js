import toast from "react-hot-toast";

export default function validateExam(formData) {
  if (formData.title.trim() === "") {
    toast.error("Please enter a title for the exam.");
    return false;
  }

  if (formData.skills.length === 0) {
    toast.error("Please add at least one skill to the exam.");
    return false;
  }

  for (let index = 0; index < formData.skills.length; index++) {
    const skill = formData.skills[index];
    if (skill.name.trim() === "") {
      console.log("skill name error");
      toast.error(`Please enter a type for skill number ${index + 1}.`);
      return false;
    }

    if (skill.name === "Listening" && !skill.audioUrl) {
      toast.error(
        `Please enter an audio URL for skill : (${skill.name}) number ${
          index + 1
        }.`
      );
      return false;
    }

    if (skill.stories.length === 0) {
      toast.error(
        `Please enter a story for skill : (${skill.name}) number ${index + 1}.`
      );
      return false;
    }

    for (let storyIndex = 0; storyIndex < skill.stories.length; storyIndex++) {
      const story = skill.stories[storyIndex];
      if (story.title.trim() === "") {
        toast.error(
          `Please enter a title for story : (${story.title}) number ${
            storyIndex + 1
          } in skill : (${skill.name}) number ${index + 1}.`
        );
        return false;
      }
      if (story.questions.length === 0) {
        toast.error(
          `Please enter a question for story : (${story.title}) number ${
            storyIndex + 1
          } in skill : (${skill.name}) number ${index + 1}.`
        );
        return false;
      }

      for (
        let questionIndex = 0;
        questionIndex < story.questions.length;
        questionIndex++
      ) {
        const question = story.questions[questionIndex];
        if (question.text.trim() === "") {
          toast.error(
            `Please enter a question text for question number ${
              questionIndex + 1
            } in story : (${story.title}) number ${storyIndex + 1} in skill : ${
              skill.name
            } number ${index + 1}.`
          );
          return false;
        }
        // if (question.answers.length === 0) {
        //   toast.error(
        //     `Please enter answers for question : (${question.text}) number ${
        //       questionIndex + 1
        //     } in story : (${story.title}) number ${storyIndex + 1} in skill : ${
        //       skill.name
        //     } number ${index + 1}.`
        //   );
        //   return false;
        // }

        if (question.type === "true_false" && question.answers.length !== 2) {
          toast.error(
            `Please enter two answers for question : (${
              question.text
            }) number ${questionIndex + 1} in story : (${story.title}) number ${
              storyIndex + 1
            } in skill : ${skill.name} number ${index + 1}.`
          );
          return false;
        }

        if (question.answers.length < 2) {
          toast.error(
            `Please enter at least two answers for question : (${
              question.text
            }) number ${questionIndex + 1} in story : (${story.title}) number ${
              storyIndex + 1
            } in skill : (${skill.name}) number ${index + 1}.`
          );
          return false;
        }

        for (
          let answerIndex = 0;
          answerIndex < question.answers.length;
          answerIndex++
        ) {
          const answer = question.answers[answerIndex];
          if (answer.questionText.trim() === "") {
            toast.error(
              `Please enter a text for answer number ${
                answerIndex + 1
              } in question : (${question.text}) number ${
                questionIndex + 1
              } in story : (${story.title}) number ${
                storyIndex + 1
              } in skill : ${skill.name} number ${index + 1}.`
            );
            return false;
          }
        }
      }
    }
  }

  return true;
}
