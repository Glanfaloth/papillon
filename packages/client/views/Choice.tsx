import React, { useState } from "react";
import { Button } from "../components/Button";
import MultipleChoice from "../components/MultipleChoice";
import { ProgressBar } from "../components/ProgressBar";

export default function Choice() {
  const words = ["Sprechen", "Apfel", "Honig", "Tomate"];
  const [selected, setSelected] = useState<null | string>(null);

  return (
      <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
        <ProgressBar progressPercentage={80} isDanger={false} />
        <h3 className="pt-8 text-gray-600">
          Which word is does the following describe?
        </h3>
        <h1 className="pb-4">
          Es ist deine Mutter! Meine ist es jedoch nicht.
        </h1>

        <MultipleChoice
          options={words}
          onSelect={(o) => {
            setSelected(o);
          }}
          selected={selected}
          correctOption={words[0]}
          showFeedback={false}
        />
    </div>
  );
}
