import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { mockElement } from '../Tools';
import { Button } from '../../src';

import { DiningReservation } from '../../src/Containers/DiningReservation';

storiesOf('DiningReservation', module)
    .addDecorator(withKnobs)
    .add(
        'with default',
        mockElement(
            modal1 => (
                <>
                    <Button
                        style={{
                            position: 'fixed',
                            bottom: '0',
                            right: '0',
                            marginRight: '20px',
                            marginBottom: '20px',
                        }}
                        onClick={() => modal1[1](true)}
                    >
                        Open
                    </Button>
                    <DiningReservation modalState={modal1} />
                </>
            ),
            false,
        ),
    );
