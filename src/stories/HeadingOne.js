import React from 'react';
import { storiesOf } from '@storybook/react';
import { HeadingOne } from '../components/texts/HeadingOne';

storiesOf('HeadingOne', module)
    .add('with text', () => (
        <HeadingOne text="Heading Text" />
    ), {
        notes: `Standard Heading Text Sizes`
    });