import React from 'react';
import { storiesOf } from '@storybook/react';
import { HeadingFour } from '../components/texts/HeadingFour';

storiesOf('HeadingFour', module)
    .add('with text', () => (
        <HeadingFour text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    })
    .add('with text and bold', () => (
        <HeadingFour bold text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    });