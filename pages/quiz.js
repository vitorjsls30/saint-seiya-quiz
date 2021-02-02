import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Widget from '../src/components/Widget';
import { WidgetFinished, WidgetLoading, WidgetMissing } from '../src/components/Widget/helpers';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

import db from '../db.json';

function WidgetQuestions({
  question, index, total, handleNext,
}) {
  // eslint-disable-next-line arrow-body-style
  const alternatives = question.alternatives.map((item, idx) => {
    return (
      <Widget.Topic
        as="label"
        htmlFor={`item_${idx}`}
        // eslint-disable-next-line react/no-array-index-key
        key={`item_${idx}`}
      >
        <input
          style={{
            display: 'none',
          }}
          type="radio"
          id={`item_${idx}`}
          name={`qestion_${index}`}
        />
        {item}
      </Widget.Topic>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

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
          <Button
            type="submit"
          >
            Confirm
          </Button>
        </form>
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
};

const screenStates = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  MOUNTED: 'MOUNTED',
  FINISHED: 'FINISHED',
};

export default function Quiz() {
  const [state, setScreenState] = useState(screenStates.LOADING);

  const { questions } = db;
  const total = questions.length;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    setTimeout(() => {
      if (!questions.length) {
        setScreenState(screenStates.ERROR);
        return;
      }
      setScreenState(screenStates.MOUNTED);
    }, 1000);
  }, []);

  useEffect(() => {
    setQuestion(questions[currentIdx]);
  }, [currentIdx]);

  const handleNext = () => {
    if (!(currentIdx < questions.length - 1)) {
      setScreenState(screenStates.FINISHED);
      return;
    }
    setCurrentIdx(currentIdx + 1);
  };

  // eslint-disable-next-line consistent-return
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Head>
          <title>Saint Seiya Quiz - Test you knowledge!</title>
        </Head>
        <QuizLogo />

        {state === screenStates.ERROR && <WidgetMissing />}

        {state === screenStates.LOADING && <WidgetLoading />}

        {state === screenStates.MOUNTED && questions.length
          && (
          <WidgetQuestions
            question={question}
            index={currentIdx}
            total={total}
            handleNext={handleNext}
          />
          )}

        {state === screenStates.FINISHED && <WidgetFinished />}

      </QuizContainer>
    </QuizBackground>
  );
}
