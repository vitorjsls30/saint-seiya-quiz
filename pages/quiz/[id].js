/* eslint-disable arrow-body-style */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import QuizScreen from '../../src/screens/Quiz';

function ExternalQuiz({ externalDB }) {
  const { error } = externalDB;

  return (
    <QuizScreen externalDB={externalDB} fetchError={error} />
  );
}

ExternalQuiz.propTypes = {
  externalDB: PropTypes.object.isRequired,
};

export async function getServerSideProps(context) {
  const [name, author] = context.query.id.split('.');

  const externalDB = await fetch(`https://${name}.${author}.vercel.app/api/db`)
    .then((response) => {
      if (response.ok) {
        return response ? response.json() : null;
      }
      throw new Error('Could not retrieve api/db data');
    })
    .catch((err) => {
      console.error('Could not retrieve quiz data: ', err);
      return { error: true };
    });
  return { props: { externalDB } };
}

export default ExternalQuiz;
