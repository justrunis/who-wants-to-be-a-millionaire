import React from "react";
import { moneyLevels } from "../../data/money";
import HintContainer from "./HintContainer";

export default function Pyramid({ currentQuestion, onHintSelect }) {
  return (
    <div className="flex flex-col justify-start gap-5 bg-base-100 text-base-content w-full h-full p-8">
      <HintContainer onHintSelect={(hint) => onHintSelect(hint)} />
      <div className="flex flex-col gap-2">
        {moneyLevels
          .slice(0)
          .reverse()
          .map((level) => (
            <div key={level.level} className="flex justify-between">
              <span
                className={`level${level.level} ${
                  level.level === currentQuestion ? "text-yellow-500" : ""
                }`}
              >
                {level.level}
              </span>
              <span
                className={`amount${level.level} ${
                  level.level === currentQuestion ? "text-yellow-500" : ""
                }`}
              >
                {level.amount}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
