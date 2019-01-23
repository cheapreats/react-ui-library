import { configure, addDecorator } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(withNotes);

// Just so we can control the order easily
const Stories = [
    'Overview',
    'HeadingOne',
    'HeadingTwo',
    'HeadingThree',
    'HeadingFour',
    'HeadingFive',
    'Paragraph',
    'Link',
    'Input',
    'Select',
    'Switch',
    'Radio',
    'Checkbox',
    'Button',
    'TransactionStatusTag'
];

function loadStories() {
    // automatically import all story js files that end with *.js
    // const req = require.context('../src/stories', true, /\.js$/);
    // req.keys().forEach(filename => req(filename));
    Stories.forEach(story => require(`../src/stories/${story}`));
}

configure(loadStories, module);