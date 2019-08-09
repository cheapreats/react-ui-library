import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Slider } from '../../src';

storiesOf('Slider', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Slider
            max={number('Max', 5)}
            min={number('Min', 0)}
            step={number('Step', 1)}
            disabled={boolean('Disabled', false)}
            value={number('Value', 3)}
        />
    ));
    // .add('with success', () => (
    //     <Slider
    //         name="demo"
    //         label="Label"
    //         description="This is an Slider with success state"
    //         placeholder="Placeholder"
    //         success={boolean('Success', true)}
    //     />
    // ))
    // .add('with error', () => (
    //     <Slider
    //         name="demo"
    //         label="Label"
    //         description="This is an Slider with an error message"
    //         placeholder="Placeholder"
    //         error={text('Error Message', 'Error Message!')}
    //     />
    // ))
    // .add('with disabled', () => (
    //     <Slider
    //         name="demo"
    //         label="Label"
    //         description="This is a disabled Slider"
    //         placeholder="Placeholder"
    //         error={text('Error Message')}
    //         disabled={boolean('Disabled', true)}
    //         success={boolean('Success', false)}
    //     />
    // ));
