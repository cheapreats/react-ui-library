import React from 'react';
import { storiesOf } from '@storybook/react';
import { Paragraph } from '../components/texts/Paragraph';

storiesOf('Paragraph', module)
    .add('with text', () => (
        <Paragraph text="Paragraph Text" />
    ), {
        notes: `Standard Paragraph Text Sizes`
    })
    .add('with text and bold', () => (
        <Paragraph bold text="Paragraph Text" />
    ), {
        notes: `Standard Paragraph Text Sizes`
    });