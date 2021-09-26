import React, { useContext, useMemo, useState } from "react";
import { QUESTION_DURATION_SECONDS } from "../../helpers/lib/const";
import { ColyseusContext, useColyseus } from "../colyseus/use-room";
import { Button } from "../components/Button";
import MultipleChoice from "../components/MultipleChoice";
import { ProgressBar } from "../components/ProgressBar";
import { ChooseWordData } from "../../helpers/lib/types";
import _ from "lodash";

export default function Choice() {
  const words = ["Sprechen", "Apfel", "Honig", "Tomate"];
  const [selected, setSelected] = useState<null | string>(null);

  const state: any = useContext(ColyseusContext);

  const { sendMessage } = useColyseus();

  const progressPercentage =
    100 -
    Math.floor(
      (100 * (QUESTION_DURATION_SECONDS - (state.step?.remainingTime ?? 0))) /
        QUESTION_DURATION_SECONDS
    );

  const chooseWordData: ChooseWordData =
    state.step.properties.userToWordAndDescription[state.username];

  const options: string[] = useMemo(
    () =>
      _.shuffle([
        ...chooseWordData.confusingWords,
        chooseWordData.word,
      ]),
    []
  );
  // .push(chooseWordData.word);

  const widthPercentage = (progressPercentage - 1) / 100 > 0 ? 100 : 0;

  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <ProgressBar progressPercentage={widthPercentage} isDanger={progressPercentage < 20} />
      <h3 className="pt-8 text-gray-600">
        Welches Wort entspricht der Beschreibung?
      </h3>
      {/* <h1 className="pb-4">Es ist deine Mutter! Meine ist es jedoch nicht.</h1> */}
      <h1>{chooseWordData.userDescription}</h1>
      <MultipleChoice
        options={options}
        onSelect={(o) => {
          setSelected(o);
          sendMessage({
            type: "choose-word",
            properties: {
              username: state.username ?? 0,
              authorUsername: chooseWordData.authorUsername,
              authorScore: chooseWordData.word === o ? 5 : 0,
              word: o,
              description: chooseWordData.userDescription,
              score: chooseWordData.word === o ? 10 : 0,
            },
          });
        }}
        selected={selected}
        correctOption={words[0]}
        showFeedback={false}
      />
    </div>
  );
}
