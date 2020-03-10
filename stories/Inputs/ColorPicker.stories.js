import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ColorPicker, Paragraph } from '../../src';

storiesOf('Color Picker', module)
    .addDecorator(withKnobs)
    .add('with default', () => {
        const [color, setColor] = useState('#ff0000');
        return (
            <>
                <ColorPicker
                    value={color}
                    onChange={e => setColor(e.target.value)}
                />
                <br></br>
                <Paragraph bold>The color you selected is: {color}</Paragraph>
            </>
        );
    })
    .add('with no value passed', () => {
        return <ColorPicker />;
    });
