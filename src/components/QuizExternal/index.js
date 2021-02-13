/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Widget from '../Widget';
import Link from '../Link';

function extractURL(url) {
  const replaced = url.replace(/\//g, '')
    .replace('https:', '')
    .split('.');
  const [name, author] = replaced;
  return { name, author };
}

function QuizExternal({ externals }) {
  let externalQuizes = null;

  externalQuizes = externals.map((item, idx) => {
    const { name, author } = extractURL(item);
    const redirectLink = `${name}.${author}`;
    return (
      <li key={`quiz__${idx}`}>
        <Widget.Topic
          as={Link}
          href={`/quiz/${redirectLink}`}
        >
          { redirectLink }
        </Widget.Topic>
      </li>
    );
  });

  if (!externals.length) {
    externalQuizes = <li>{'> < no other quizes...'}</li>;
  }

  return (
    <Widget
      as={motion.section}
      transition={{ delay: 1, duration: 0.5 }}
      variants={{
        show: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Content>
        <p>Quizes da Galera</p>
        <ul>
          {externalQuizes}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

QuizExternal.propTypes = {
  externals: PropTypes.array.isRequired,
};

export default QuizExternal;
