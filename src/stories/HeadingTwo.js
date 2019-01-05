import React from 'react';
import { storiesOf } from '@storybook/react';
import { HeadingTwo } from '../components/texts/HeadingTwo';

storiesOf('HeadingTwo', module)
    .add('with text', () => (
        <HeadingTwo text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    })
    .add('with text and bold', () => (
        <HeadingTwo bold text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    });