import { configure, addDecorator, addParameters } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';
import brandImage from './logo.png';

addDecorator(withInfo);
addDecorator(withNotes);
addParameters({
    options: {
        showPanel: false,
        theme: {
            base: 'light',
            brandTitle: 'Cheapreats',
            brandUrl: 'https://cheapreats.com',
            brandImage,
        }
    }
})

// Just so we can control the order easily
const Stories = [
    'Test',
    'Overview',
    'Grid',
    'Heading',
    'Paragraph',
    'SmallText',
    'Link',
    'Input',
    'Select',
    'Switch',
    'Radio',
    'DatePicker',
    'TimePicker',
    'Tag',
    'Checkbox',
    'Button',
    'Card',
    'Popup',
    'Modal',
    'Draggable',
    'Footnote',
    'TransactionStatusTag',
    'sliders'
];

function loadStories() {
    // automatically import all Capitalized story js files that end with *.js
    // const req = require.context('../src/stories', true, /\.js$/);
    // req.keys().forEach(filename => req(filename));
    Stories.forEach(story => require(`../src/stories/${story}`));
}

configure(loadStories, module);