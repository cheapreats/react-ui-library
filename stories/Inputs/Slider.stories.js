import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Slider } from '../../src';

storiesOf('Slider', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Slider
            max={number('max', 10)}
            min={number('min', 0)}
            step={number('step', 1)}
            disabled={boolean('disabled', false)}
            value={number('value', 3)}
            trackColor={text('trackColor', '#010101')}
            buttonColor={text('buttonColor', 'White')}
        />
    ));
