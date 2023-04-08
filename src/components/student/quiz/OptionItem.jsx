import React from "react";

const OptionItem = ({
  singleOption,
  qId,
  handleOptionClick,
  selectedOptions,
}) => {
  const { id, option, isCorrect } = singleOption || {};

  return (
    <label for={`option${id}_q${qId}`}>
      <input
        type="checkbox"
        id={`option${id}_q${qId}`}
        onChange={() => handleOptionClick(qId, id)}
        checked={selectedOptions[qId] && selectedOptions[qId][id]}
      />
      {option}
    </label>
  );
};

export default OptionItem;
