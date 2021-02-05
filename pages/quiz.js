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

const screenStates = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  MOUNTED: 'MOUNTED',
  FINISHED: 'FINISHED',
};

function WidgetQuestions({
  question, index, total, handleNext, handleAnswers,
}) {
  const [isSubmited, setIsSubmited] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const itemAnswer = question.answer;

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmited(true);
    handleAnswers(isCorrect);

    setTimeout(() => {
      setIsSubmited(false);
      handleNext();
    }, 2500);
  };

  const handleSelected = (selected) => {
    let match = false;
    if (selected === itemAnswer) {
      match = true;
    }
    setIsCorrect(match);
    console.log('handling selected', match);
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
          onClick={() => handleSelected(idx)}
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
          <Button type="submit"> Confirm </Button>
        </form>

        <Widget.AnswerFeedback>
          { isSubmited && isCorrect && <p className="matched">That&apos;s it!!</p> }
          { isSubmited && !isCorrect && <p className="wrong">Ops! Wrong!</p> }
        </Widget.AnswerFeedback>

      </Widget.Content>

    </Widget>
  );
}

function Quiz() {
  const [state, setScreenState] = useState(screenStates.LOADING);

  const { questions } = db;
  const total = questions.length;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

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
    const current = questions[currentIdx];
    setQuestion(current);
  }, [currentIdx]);

  const handleNext = () => {
    if (!(currentIdx < questions.length - 1)) {
      setScreenState(screenStates.FINISHED);
      return;
    }
    setCurrentIdx(currentIdx + 1);
  };

  const handleAnswers = (answer) => {
    setAnswers([...answers, answer]);
    console.log('ANSWERS', answers);
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
            handleAnswers={handleAnswers}
          />
          )}

        {state === screenStates.FINISHED && <WidgetFinished />}

      </QuizContainer>
    </QuizBackground>
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

export default Quiz;
