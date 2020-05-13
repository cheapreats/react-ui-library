import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { HorizontalScrollList } from '../../src';

storiesOf('HorizontalScrollList', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <HorizontalScrollList
            labelArray={[
                'fruit',
                'burgers',
                'drinks',
                'steak',
                'pizza',
                'desserts',
                'appetizers',
                'entrées',
            ]}
            menuName={text('Name of Menu', 'Menu')}
        />
    ));
