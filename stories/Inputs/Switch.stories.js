import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Switch, Mixins } from '../../src';

storiesOf('Switch', module)
    .addDecorator(withKnobs)
    .add('with default', () => (
        <Switch
            label="Label"
            value={boolean('value', true)}
            description="Description"
        />
    ))
    .add('with tags', () => (
        <Switch label="Label" tags={['On', 'Off']} description="Description" />
    ))
    .add('with disabled', () => (
        <Switch
            label="Label"
            tags={['On', 'Off']}
            description="Description"
            disabled
        />
    ))
    .add('with switchStyle', () => {
        const style = () => `
            ${Mixins.transition(['background-color'])}
            background-color: blue;
        `;
        return (
            <Switch
                label="Label"
                switchStyle={style}
                description="Description"
            />
        );
    })
    .add('with activeStyle', () => {
        const style = () => `
            ${Mixins.transition(['background-color'])}
        `;
        const active = () => `
            background-color: green;
        `;

        return (
            <Switch
                label="Label"
                switchStyle={style}
                activeStyle={active}
                description="Description"
            />
        );
    });
