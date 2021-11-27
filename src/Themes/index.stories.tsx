import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Themes from './index';


const stories = storiesOf('Components/Theme', module);

Object.entries(Themes).forEach(([key, value]) => {
    stories.add(`with ${key} returns ${value}`, () => (
        <span>To be automated</span>
    ));
});
