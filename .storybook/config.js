import { configure, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
    require('../src/stories/Button.js');
    require('../src/stories/Input.js');
    require('../src/stories/Heading1.js');
    require('../src/stories/Paragraph.js');
    // You can require as many stories as you need.
}

configure(loadStories, module);