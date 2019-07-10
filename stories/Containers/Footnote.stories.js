import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Footnote } from '../../src';

storiesOf('Footnote', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Footnote show>
            Toggle the show prop to hide me!
        </Footnote>
    ))
;
