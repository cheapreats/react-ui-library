import React from 'react';
import { storiesOf } from '@storybook/react';
import { SettingsCard } from '../../src';
import { Plus } from '@styled-icons/boxicons-regular/Plus';

storiesOf('SettingsCard', module)
    .add('with default', () => (
        <SettingsCard
            heading="SettingsCard"
            icon={Plus}
        />
    ))
    .add('with onClick', () => (
        <SettingsCard
            heading="SettingsCard"
            icon={Plus}
            onClick={() => alert("clicked")}
        />
    ))