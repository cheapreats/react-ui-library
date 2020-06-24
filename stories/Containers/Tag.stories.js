import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Save } from '@styled-icons/fa-solid/Save';
import { Tag } from '../../src';

storiesOf('Tag', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Tag onClick={() => console.log(':)')}>{text('Text', 'Click me')}</Tag>
    ));
