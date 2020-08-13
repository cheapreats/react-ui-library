import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text} from '@storybook/addon-knobs';
import { HeaderRow, Status } from '../../src';


storiesOf('HeaderRow', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <HeaderRow  
            label={text("Label", "This is a Label")}
            display={text("Display", "space-between")}
            type={text("Type", "h4")}
            padding={text("Padding", "10px 10px")}
            width={300}
        >
            <Status status="preparing">Item</Status>
        </HeaderRow>
    ))