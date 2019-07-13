import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Footnote } from '../../src';

storiesOf('Footnote', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Footnote show={boolean('Show', true)}>
            {text('Footnote Text', 'Toggle the show knob to hide me!')}
        </Footnote>
    ))
;
