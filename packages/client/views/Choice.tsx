import React, { useContext, useState } from "react";
import { QUESTION_DURATION_SECONDS } from "../../helpers/lib/const";
import { ColyseusContext, useColyseus } from "../colyseus/use-room";
import { Button } from "../components/Button";
import MultipleChoice from "../components/MultipleChoice";
import { ProgressBar } from "../components/ProgressBar";

export default function Choice() {
  const words = ["Sprechen", "Apfel", "Honig", "Tomate"];
  const [selected, setSelected] = useState<null | string>(null);

  const state = useContext(ColyseusContext);

  const { sendMessage } = useColyseus();

  const progressPercentage =
    100 -
    Math.floor(
      (100 * (QUESTION_DURATION_SECONDS - (state.step?.remainingTime ?? 0))) /
        QUESTION_DURATION_SECONDS
    );

  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <ProgressBar progressPercentage={progressPercentage} isDanger={false} />
      <h3 className="pt-8 text-gray-600">
        Which word corresponds to the following description?
      </h3>
      <h1 className="pb-4">Es ist deine Mutter! Meine ist es jedoch nicht.</h1>
      <MultipleChoice
        options={words}
        onSelect={(o) => {
          setSelected(o);
          // sendMessage({
          //   type: "choose-word",
          //   properties: {
          //     username: state.username ?? 0,
          //     descriptionAuthorUsername: 0,
          //     // word: string,
          //     description: state.step.properties.userToWordAndDescription[],
          //     score: 10,
          //   },
          // });
        }}
        selected={selected}
        correctOption={words[0]}
        showFeedback={false}
      />
    </div>
  );
}
