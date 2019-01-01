import React from 'react';
import { storiesOf } from '@storybook/react';
import { Paragraph } from '../components/texts';

storiesOf('Paragraph', module)
    .add('with text', () => (
        <Paragraph>Heading Text</Paragraph>
    ), {
        notes: `Standard Paragraph Text Sizes`
    });