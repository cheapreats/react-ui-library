import React from 'react';
import { storiesOf } from '@storybook/react';
import { HeadingThree } from '../components/texts/HeadingTwo';

storiesOf('HeadingThree', module)
    .add('with text', () => (
        <HeadingThree text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    })
    .add('with text and bold', () => (
        <HeadingThree bold text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    });