import React from "react";
import QuestionItem from "./QuestionItem";

const QuestionList = ({ questions, handleOptionClick, selectedOptions }) => {
  return (
    <div className="space-y-8 ">
      {questions?.map((questionItem) => (
        <QuestionItem
          key={questionItem.id}
          questionItem={questionItem}
          handleOptionClick={handleOptionClick}
          selectedOptions={selectedOptions}
        />
      ))}
    </div>
  );
};

export default QuestionList;
