import React from 'react';
import { storiesOf } from '@storybook/react';
import { NavigationFootnote } from '../../src/Containers';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Navigation Footnote'), module).add('with default', () => (
    <NavigationFootnote text="Link To Somewhere" />
));
