import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { SelectBox } from '../../src';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('SelectBox', module)
    .addDecorator(withKnobs)
    .add('with default', () =>{ 
        const [selected, setSelected] = useState(false);
        const setSelectedFunction = () => setSelected(!selected);
        return (
            <SelectBox selected={selected} onSelect={setSelectedFunction}>
                Hello
            </SelectBox>
        );     
    });