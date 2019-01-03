import { configure, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
    // automatically import all story js files that end with *.js
    const req = require.context('../src/stories', true, /\.js$/);
    req.keys().forEach(filename => req(filename));
  }

configure(loadStories, module);