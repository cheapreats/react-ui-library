import React from 'react';
import { storiesOf } from '@storybook/react';
import { Footnote } from '../components';

storiesOf('Footnote', module)
    .add('with nothing', () => (
        <Footnote show>
            Toggle the show prop to hide me!
        </Footnote>
    ))
;