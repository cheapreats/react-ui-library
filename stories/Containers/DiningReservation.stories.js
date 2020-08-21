import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { mockElement } from '../Tools';

import { DiningReservation } from '../../src/Containers/DiningReservation';

storiesOf('DiningReservation', module)
    .addDecorator(withKnobs)
    .add(
        'with default',
        mockElement(modal1 => <DiningReservation modalState={modal1} />, false),
    );
