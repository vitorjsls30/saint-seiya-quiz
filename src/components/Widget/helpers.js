/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Widget from './index';

function WidgetLoading() {
  return (
    <Widget>
      <Widget.Header>
        Loading...
      </Widget.Header>
      <Widget.Content>
        Trying to fetch the questions...
      </Widget.Content>
    </Widget>
  );
}

function WidgetMissing() {
  return (
    <Widget>
      <Widget.Header>
        Uops!!
      </Widget.Header>
      <Widget.Content>
        <p>Looks like there&apos;s no questions on this Quiz.</p>
        <p>Try again later!</p>
        <p><Link href="/">Click here to Restart</Link></p>
      </Widget.Content>
    </Widget>
  );
}

// TODO - Show the user score here...
function WidgetFinished({ answers }) {
  const matches = answers.filter((item) => item).length;
  const errors = answers.filter((item) => !item).length;
  return (
    <Widget>
      <Widget.Header>
        Quiz Finished!
      </Widget.Header>
      <Widget.Content>
        <p>Your Score:</p>
        <p>
          <ul>
            <li>{`Scored: ${matches}`}</li>
            <li>{`Missed: ${errors}`}</li>
          </ul>
        </p>
        <p><Link href="/">Play again!</Link></p>
      </Widget.Content>
    </Widget>
  );
}

WidgetFinished.propTypes = {
  answers: PropTypes.array.isRequired,
};

export {
  WidgetFinished,
  WidgetLoading,
  WidgetMissing,
};
