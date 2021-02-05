import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { WidgetFinished, WidgetLoading, WidgetMissing } from '../src/components/Widget/helpers';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import WidgetQuestions from '../src/components/Widget/WdgetQuestions';

import db from '../db.json';

const screenStates = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  MOUNTED: 'MOUNTED',
  FINISHED: 'FINISHED',
};

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

export default Quiz;
