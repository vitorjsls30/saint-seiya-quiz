import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

import db from '../db.json';

function WidgetLoading() {
  return (
    <Widget>
      <Widget.Header>
        Loading...
      </Widget.Header>
      <Widget.Content>
        [Some random description...]
      </Widget.Content>
    </Widget>
  );
}

function WidgetQuestions({ question, index, total }) {
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
        <p>{ alternatives }</p>
        <Button
          type="button"
        >
          Confirm
        </Button>
      </Widget.Content>
    </Widget>
  );
}

WidgetQuestions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default function Quiz() {
  const { questions } = db;
  const idx = 0;
  const total = questions.length;

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Head>
          <title>Saint Seiya Quiz - Test you knowledge!</title>
        </Head>
        <QuizLogo />

        <WidgetQuestions question={questions[0]} index={idx} total={total} />

        <WidgetLoading />

      </QuizContainer>
    </QuizBackground>
  );
}
