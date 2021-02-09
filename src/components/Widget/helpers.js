import React from 'react';
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
function WidgetFinished() {
  return (
    <Widget>
      <Widget.Header>
        Quiz Finished!
      </Widget.Header>
      <Widget.Content>
        The Quiz has ended! Thanks for playing!
      </Widget.Content>
    </Widget>
  );
}

export {
  WidgetFinished,
  WidgetLoading,
  WidgetMissing,
};
