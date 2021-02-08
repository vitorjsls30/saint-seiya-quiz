/* eslint-disable arrow-body-style */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import QuizScreen from '../../src/screens/Quiz';

function ExternalQuiz({ externalDB }) {
  const router = useRouter();
  if (!externalDB) router.push('');

  return (
    <QuizScreen externalDB={externalDB} />
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
      return {
        redirect: {
          destination: '/quiz',
          permanent: false,
        }
      };
    });
  return { props: { externalDB } };
}

export default ExternalQuiz;
