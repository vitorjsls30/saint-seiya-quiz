import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Widget from '../index';
import WidgetAlternatives from '../WidgetAlterrnatives';
import Button from '../../Button';
import BackLinkArrow from '../../BackLinkArrow';

function WidgetQuestions({
  question, index, total, handleNext, handleAnswers,
}) {
  const [isSubmited, setIsSubmited] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const [selected, setSelected] = useState();
  const questionAnswer = question.answer;

  useEffect(() => {
    let match = false;
    if (selected === questionAnswer) {
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

  return (
    <Widget>

      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Question ${index + 1} of ${total}`}</h3>
      </Widget.Header>

      <img
        alt="description"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>{ question.title }</h2>
        <Widget.Form
          onSubmit={handleSubmit}
        >
          <p>
            <WidgetAlternatives
              alternatives={question.alternatives}
              handleSelected={setSelected}
              questionIdx={index}
              questionAnswer={questionAnswer}
              isSubmited={isSubmited}
              selectedValue={selected}
            />
          </p>
          <Button type="submit" disabled={typeof selected === 'undefined'}> Confirm </Button>
        </Widget.Form>
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
