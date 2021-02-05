import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Widget from '../index';
import Button from '../../Button';

function WidgetQuestions({
  question, index, total, handleNext, handleAnswers,
}) {
  const [isSubmited, setIsSubmited] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const [selected, setSelected] = useState();
  const itemAnswer = question.answer;

  useEffect(() => {
    let match = false;
    if (selected === itemAnswer) {
      match = true;
    }
    setIsCorrect(match);
  }, [selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmited(true);
    handleAnswers(isCorrect);

    setTimeout(() => {
      setIsSubmited(false);
      handleNext();
    }, 2500);
  };

  // eslint-disable-next-line arrow-body-style
  const alternatives = question.alternatives.map((item, idx) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Widget.Topic as="label" htmlFor={`item_${idx}`} key={`item_${idx}`}>
        <input
          type="radio"
          id={`item_${idx}`}
          name={`qestion_${index}`}
          onClick={() => setSelected(idx)}
        />
        {item}
      </Widget.Topic>
    );
  });

  return (
    <Widget>

      <Widget.Header>
        <h3>{`Question ${index + 1} of ${total}`}</h3>
      </Widget.Header>

      <img
        alt="description"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src="https://placehold.it/400x400"
      />

      <Widget.Content>
        <h2>{ question.title }</h2>
        <form onSubmit={handleSubmit}>
          <p>{ alternatives }</p>
          <Button type="submit" disabled={typeof selected === 'undefined'}> Confirm </Button>
        </form>

        <Widget.AnswerFeedback>
          { isSubmited && isCorrect && <p className="matched">That&apos;s it!!</p> }
          { isSubmited && !isCorrect && <p className="wrong">Ops! Wrong!</p> }
        </Widget.AnswerFeedback>

      </Widget.Content>

    </Widget>
  );
}

WidgetQuestions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleAnswers: PropTypes.func.isRequired,
};

export default WidgetQuestions;
