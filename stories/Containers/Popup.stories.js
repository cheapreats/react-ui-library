import React from 'react';
import { storiesOf } from '@storybook/react';
import { Popup } from '../../src';

storiesOf('Popup', module)
    .add('with nothing', () => (
            <Popup left={0}
                    top={0}
                    width={0}
                    height={0}
                    popup={ true}
                    >
                <p >Wow</p>
            </Popup>
    ), {
    })
;