import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Textarea } from '../../src';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('ClientShowCase'), module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Textarea
            name="demo"
            label={text('Label', 'Label')}
            description={text('Description', 'Description')}
            placeholder={text('Placeholder', 'Placeholder')}
            rows={number('Rows', 4)}
        />
    ))
    .add('with success', () => (
        <Textarea
            name="demo"
            label="Label"
            description="This is an input with success state"
            placeholder="Placeholder"
            success={boolean('Success', true)}
        />
    ))
    .add('with error', () => (
        <Textarea
            name="demo"
            label="Label"
            description="This is an input with an error message"
            placeholder="Placeholder"
            error={text('Error Message', 'Error Message!')}
        />
    ))
    .add('with disabled', () => (
        <Textarea
            name="demo"
            label="Label"
            description="This is a disabled input"
            placeholder="Placeholder"
            error={text('Error Message')}
            disabled={boolean('Disabled', true)}
            success={boolean('Success', false)}
        />
    ));
