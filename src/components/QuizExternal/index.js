/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';

import Widget from '../Widget';

function QuizExternal({ externals }) {
  let externalQuizes = null;

  externalQuizes = externals.map((item, idx) => {
    return (
      <li key={`quiz__${idx}`}>
        <a href={item}>
          { item }
        </a>
      </li>
    );
  });

  if (!externals.length) {
    externalQuizes = <li>Uops! No quizes to show :´( ...</li>;
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
