import React from 'react';
import { storiesOf } from '@storybook/react';
import { BasicSlider } from '../components/sliders/sliders';

storiesOf('BasicSlider', module)
    .add('Basic slider', () => (
        <BasicSlider/>
    ), {
        notes: `Basic Slider`
    });