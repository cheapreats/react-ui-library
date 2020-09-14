import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { SelectBox } from '../../src';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('SelectBox', module)
    .addDecorator(withKnobs)
    .add('with default', () =>{ 
        const [isSelected, setSelected] = useState(false);
        const setSelectedFunction = () => setSelected(!isSelected);
        return (
            <SelectBox isSelected={isSelected} onSelect={setSelectedFunction}>
                Hello
            </SelectBox>
        );     
    });
