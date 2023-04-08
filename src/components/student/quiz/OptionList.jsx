import React from "react";
import OptionItem from "./OptionItem";

const OptionList = ({ options, qId, handleOptionClick, selectedOptions }) => {
  return (
    <div>
      <form className="quizOptions">
        {options?.map((singleOption) => (
          <OptionItem
            singleOption={singleOption}
            qId={qId}
            handleOptionClick={handleOptionClick}
            selectedOptions={selectedOptions}
          />
        ))}
      </form>
    </div>
  );
};

export default OptionList;
