import React from 'react';
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
        Looks like there&apos;s no questions now. Try again later!
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
