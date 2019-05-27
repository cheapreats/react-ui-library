import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Save } from 'styled-icons/fa-solid/Save';
import { Button } from '../../src';

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('with text', () => (
        <Button>Normal Button</Button>
    ))
    .add('with primary', () => (
        <Button primary>Primary Button</Button>
    ))
    .add('with icon', () => (
        <Button icon={ Save }>Icon Button</Button>
    ))
    .add('with full', () => (
        <Button full>Icon Button</Button>
    ))
    .add('with disabled', () => (
        <Button
            disabled={boolean('Disabled', true)}
            primary={boolean('Primary', true)}
        >
            Disabled Button
        </Button>
    ))
    .add('with loading', () => (
        <Button
            loading={boolean('Loading', true)}
            primary={boolean('Primary', true)}
        >
            Action Button
        </Button>
    ))
;
