import React, { Fragment } from 'react';
import { Global } from '../src';
import { configure, addDecorator } from '@storybook/react';
import {withInfo} from "@storybook/addon-info";

// Just so we can control the order easily
const Stories = [
    'Overview',
    'Containers',
    'Inputs',
    'Text',
    'Themes'
];

const getRootFolderName = file => {
    const [start, end] = [...file.matchAll(/\/*\//g)];
    return file.slice(start.index + 1, end.index);
}

// Sort files by their root folder name's occurence index in Stories
const sortFiles = (f1, f2) => {
    return Stories.indexOf(getRootFolderName(f1)) - Stories.indexOf(getRootFolderName(f2));
}

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
    req.keys().sort(sortFiles).forEach(filename => req(filename));
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
