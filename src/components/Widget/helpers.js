/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Widget from './index';
import Button from '../Button';

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
  const router = useRouter();
  let userName = '';

  const { name } = router.query;
  if (name) userName = ` ${name}`;

  const matches = answers.filter((item) => item).length;
  const errors = answers.filter((item) => !item).length;
  return (
    <Widget>
      <Widget.Header>
        {`Hi${userName}! Thanks for Playing!`}
      </Widget.Header>
      <Widget.Content>
        <p>That&apos;s Your Score:</p>
        <ul>
          <li>{`Scored: ${matches}`}</li>
          <li>{`Missed: ${errors}`}</li>
        </ul>
        <Link
          href="/"
          style={{
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          <Button
            type="button"
            value="Play Again!"
          >
            Play Again!
          </Button>
        </Link>
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
