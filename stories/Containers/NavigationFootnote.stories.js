import React from 'react';
import { storiesOf } from '@storybook/react';
import { NavigationFootnote } from '../../src/Containers';

storiesOf('NavigationFootnote', module).add('with default', () => (
    <NavigationFootnote text="Link To Somewhere" />
));
