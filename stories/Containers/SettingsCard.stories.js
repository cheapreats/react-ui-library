import React from 'react';
import { storiesOf } from '@storybook/react';
import { SettingsCard } from '../../src';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import {createStoryTitle} from "../Constants";

storiesOf(createStoryTitle('Settings Card'), module)
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