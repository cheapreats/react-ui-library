import React from 'react';
import { storiesOf } from '@storybook/react';
import { HeadingFive } from '../components/texts/HeadingFive';

storiesOf('HeadingFive', module)
    .add('with text', () => (
        <HeadingFive text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    })
    .add('with text and bold', () => (
        <HeadingFive bold text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    });