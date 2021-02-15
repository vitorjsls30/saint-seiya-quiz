/* eslint-disable react/no-array-index-key */
import React from 'react';

import Widget from '../index';

function WidgetAlternatives({
  alternatives,
  questionIdx,
  questionAnswer,
  handleSelected,
  isSubmited,
  selectedValue,
}) {
  const shoulddFill = (selected, itemIdx, answer) => {
    const isCorrect = itemIdx === answer;
    const isSelected = selected === itemIdx;

    if (isCorrect) return isCorrect;

    if (isSelected) {
      return isCorrect;
    }

    return undefined;
  };

  const items = alternatives.map((item, idx) => (
    <Widget.Topic
      as="label"
      htmlFor={`item__${idx}`}
      key={`item__${idx}`}
      data-iscorrect={shoulddFill(selectedValue, idx, questionAnswer)}
      data-issubmited={isSubmited}
    >
      <input
        type="radio"
        id={`item__${idx}`}
        name={`question_${questionIdx}`}
        onClick={() => handleSelected(idx)}
      />
      {`  ${item}`}
    </Widget.Topic>
  ));
  return items;
}

export default WidgetAlternatives;
