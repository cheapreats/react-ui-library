import React from 'react';
import { storiesOf } from '@storybook/react';
import { Heading1 } from '../components/texts';

storiesOf('Heading1', module)
    .add('with text', () => (
        <Heading1>Heading Text</Heading1>
    ), {
        notes: `Standard Heading Text Sizes`
    });