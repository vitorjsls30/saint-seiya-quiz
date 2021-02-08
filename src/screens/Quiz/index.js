/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { WidgetFinished, WidgetLoading, WidgetMissing } from '../../components/Widget/helpers';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import WidgetQuestions from '../../components/Widget/WdgetQuestions';

import db from '../../../db.json';

const screenStates = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  MOUNTED: 'MOUNTED',
  FINISHED: 'FINISHED',
};

function QuizScreen({ externalDB }) {
  const [state, setScreenState] = useState(screenStates.LOADING);

  const { questions } = externalDB.questions ? externalDB : db;
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
    document.getElementById(`item__${currentIdx}`).checked = false;
    if (!(currentIdx < questions.length - 1)) {
      setScreenState(screenStates.FINISHED);
      return;
    }
    setCurrentIdx(currentIdx + 1);
  };

  const handleAnswers = (answer) => {
    setAnswers([...answers, answer]);
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

QuizScreen.defaultProps = {
  externalDB: {},
};

QuizScreen.propTypes = {
  externalDB: PropTypes.object,
};

export default QuizScreen;
