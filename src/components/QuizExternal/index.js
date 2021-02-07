/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';

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
    return (
      <li key={`quiz__${idx}`}>
        <a href={item}>
          { `${name}/${author}` }
        </a>
      </li>
    );
  });

  if (!externals.length) {
    externalQuizes = <li>{'> < no other quizes...'}</li>;
  }

  return (
    <Widget>
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
