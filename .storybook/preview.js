export const parameters = {
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Design System'],
            locales: 'en-US',
        },
    },
};

import React  from 'react';
import { Global } from '../src';
import { addDecorator } from '@storybook/react';

// Global provider
const style = theme => `
    body {
        padding: 20px;
        box-sizing: border-box;
        min-height: 100vh;
    }
`;

addDecorator(story => {
    if (!document.querySelector('#modal')) {
        const modal = document.createElement('div');
        document.body.append(modal);
        modal.id = 'modal';
    }
    return <Global style={ style }>{ story() }</Global>;
});
