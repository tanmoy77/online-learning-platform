import React from "react";
import OptionList from "./OptionList";

const QuestionItem = ({ questionItem, handleOptionClick, selectedOptions }) => {
  const { id, question, options } = questionItem || {};
  return (
    <div className="quiz">
      <h4 className="question">
        Quiz {id} - {question}
      </h4>
      {/* form */}
      <OptionList
        options={options}
        qId={id}
        handleOptionClick={handleOptionClick}
        selectedOptions={selectedOptions}
      />
    </div>
  );
};

export default QuestionItem;
