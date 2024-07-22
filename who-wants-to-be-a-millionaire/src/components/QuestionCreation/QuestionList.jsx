import { Droppable, Draggable } from "react-beautiful-dnd";
import QuestionItem from "./QuestionItem";

export default function QuestionList({
  questions,
  handleInputChange,
  removeQuestion,
  handleDragEnd,
}) {
  return (
    <Droppable droppableId="questions">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {questions.map((q, questionIndex) => (
            <Draggable
              key={questionIndex}
              draggableId={`question-${questionIndex}`}
              index={questionIndex}
            >
              {(provided) => (
                <QuestionItem
                  provided={provided}
                  question={q}
                  questionIndex={questionIndex}
                  handleInputChange={handleInputChange}
                  removeQuestion={removeQuestion}
                  delay={questionIndex * 0.4}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
