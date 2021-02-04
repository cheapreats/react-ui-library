import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Themes from './index';
import { createStoryTitle } from '../Constants';

const stories = storiesOf(createStoryTitle('Theme'), module);

Object.entries(Themes).forEach(([key, value]) => {
    stories.add(`with ${key} returns ${value}`, () => (
        <span>To be automated</span>
    ));
});
