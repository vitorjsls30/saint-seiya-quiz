/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { WidgetFinished, WidgetLoading, WidgetMissing } from '../../components/Widget/helpers';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import WidgetQuestions from '../../components/Widget/WdgetQuestions';

import db from '../../../db.json';

const screenStates = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  MOUNTED: 'MOUNTED',
  FINISHED: 'FINISHED',
};

function QuizScreen({ externalDB, fetchError }) {
  const [state, setScreenState] = useState(screenStates.LOADING);

  const { questions, bg, theme } = Object.entries(externalDB).length ? externalDB : db;
  const total = questions.length;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (!questions.length || fetchError) {
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

  const handleNext = (selected) => {
    if (!(currentIdx < questions.length - 1)) {
      setScreenState(screenStates.FINISHED);
      return;
    }
    setCurrentIdx(currentIdx + 1);
    document.getElementById(`item__${selected}`).checked = false;
  };

  const handleAnswers = (answer) => {
    setAnswers([...answers, answer]);
  };

  // eslint-disable-next-line consistent-return
  return (
    <ThemeProvider theme={theme}>
      <QuizBackground backgroundImage={bg}>
        <QuizContainer>
          <Head>
            <title>Saint Seiya Quiz - Test you knowledge!</title>
          </Head>

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

          {state === screenStates.FINISHED && <WidgetFinished answers={answers} />}

        </QuizContainer>
      </QuizBackground>
    </ThemeProvider>
  );
}

QuizScreen.defaultProps = {
  externalDB: {},
  fetchError: false,
};

QuizScreen.propTypes = {
  externalDB: PropTypes.object,
  fetchError: PropTypes.bool,
};

export default QuizScreen;
