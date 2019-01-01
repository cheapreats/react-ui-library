import { configure, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
    require('../src/stories/button.js');
    require('../src/stories/input.js');
    require('../src/stories/h1.js');
    require('../src/stories/p.js');
    // You can require as many stories as you need.
}

configure(loadStories, module);