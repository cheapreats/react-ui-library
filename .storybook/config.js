import React, { Fragment } from 'react';
import { Global } from '../src';
import { configure, addDecorator } from '@storybook/react';
import {withInfo} from "@storybook/addon-info";

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

// Global provider
const style = theme => `
    body {
        padding: 20px;
        box-sizing: border-box;
        min-height: 100vh;
    }
`;

addDecorator(withInfo);
addDecorator(story => {
    if (!document.querySelector('#modal')) {
        const modal = document.createElement('div');
        document.body.append(modal);
        modal.id = 'modal';
    }
    return <Global style={ style }>{ story() }</Global>;
});
configure(loadStories, module);
