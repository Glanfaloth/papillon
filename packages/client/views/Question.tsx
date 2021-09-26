import { QUESTION_DURATION_SECONDS } from "@papillon/helpers/lib/const";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ColyseusContext, useColyseus } from "../colyseus/use-room";
import { Button, ButtonVariant } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { WriteDescriptionData } from "@papillon/helpers/lib/types";

export default function Question() {
  const [answer, setAnswer] = useState("");
  const disabled = !answer;

  const state: any = useContext(ColyseusContext);

  const question = state.step.properties.userToQuestionData[
    state.username
  ] as WriteDescriptionData;

  const similarWordList = [question.word, ...question.similarWords];
  const regexFromWordList = new RegExp(similarWordList.join("|"), "gi");

  const matchingSimilarWordCount =
    answer.match(regexFromWordList) != null
      ? answer.match(regexFromWordList).length
      : 0;

  const wordCount = answer.split(/s+/).length;

  const score = 10 / (1 + 5 * Math.sqrt(matchingSimilarWordCount / (wordCount + 1)));

  const [submitted, setSubmitted] = useState(false);

  const { sendMessage } = useColyseus();

  function applyHighlights(text: string) {
    text = text
      .replace(/\n$/g, "\n\n")
      .replace(regexFromWordList, "<mark>$&</mark>");

    return text;
  }

  const submitDescription = () => {
    if (!submitted) {
      setSubmitted(true);
      sendMessage({
        type: "submit-description",
        properties: {
          username: state.username ?? 0,
          word: question.word,
          score,
          description: answer,
        },
      });
    }
  };

  const progressPercentage =
    100 -
    Math.floor(
      (100 * (QUESTION_DURATION_SECONDS - (state.step?.remainingTime ?? 0))) /
        QUESTION_DURATION_SECONDS
    );
  const widthPercentage = (progressPercentage - 1) / 100 > 0 ? 100 : 0;

  useEffect(() => {
    if (progressPercentage === 0 && !submitted) submitDescription();
  }, [progressPercentage, submitted]);

  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      {widthPercentage != 0 && (
        <ProgressBar
          progressPercentage={widthPercentage}
          isDanger={progressPercentage < 20}
        />
      )}

      {widthPercentage != 0 && (
        <div>
          <h3 className="text-gray-600 pt-8">
            Versuche, das Wort zu beschreiben. Benütze nicht: {question.similarWords.join(', ')}.
          </h3>
          <div className="has-tooltip">
            <span className="tooltip rounded shadow-lg p-3 bg-gray-100 text-red-500 -mt-16">
              {question.englishSynonyms.join(', ')}
            </span>
            <div className="flex flex-row content-center">
              <h2 className="mr-2">{question.word}</h2>
              <h2>
                <AiOutlineQuestionCircle className="text-blue-500" />
              </h2>
            </div>
          </div>
          <div className="container ">
            <div className="backdrop">
              <span
                dangerouslySetInnerHTML={{ __html: applyHighlights(answer) }}
                className="highlights mt-0 mb-auto ml-0 mr-auto"
              ></span>
            </div>
            <textarea
              className={`border-gray-400 border-2 w-full ${
                submitted && "text-gray-500"
              }`}
              name="description"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            ></textarea>
          </div>
          {/* {matchingSimilarWordCount > 0 && (
            <h2 className="text-red-600">
              {matchingSimilarWordCount} words too similar, you'll be penalized.
            </h2>
          )} */}
          <div className="mt-10">
            {progressPercentage < 20 && !submitted && (
              <Button
                className={progressPercentage < 20 && "animate-weakPing"}
                variant={
                  submitted ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY
                }
              >
                Bestätigen
              </Button>
            )}
            <div className={progressPercentage < 20 && "absolute"}>
              <Button
                variant={
                  submitted ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
                }
                onClick={submitDescription}
              >
                Bestätigen
              </Button>
            </div>
          </div>
        </div>
      )}
      {widthPercentage == 0 && (
        <div>
          <h2 className="mr-2">
            Grossartig!
            <br />
            <br />
          </h2>
          <h1 className="text-4xl animate-bounce">😊</h1>
          <h3 className="text-gray-600 pt-8">
            Kannst du erraten, was die anderen beschreiben?
          </h3>
        </div>
      )}
    </div>
  );
}
