import React from 'react';
import {
    MaskedInputPreset,
    MaskedInput,
    MaskedInputProps,
} from '@Inputs';
import { Meta, Story } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('MaskedInput'),
    component: MaskedInput,
    argTypes: {
        mask: {
            control: {
                type: 'select',
                options: MaskedInputPreset,
            },
        },
        realValue: {
            defaultValue: '1',
            control: {
                type: 'text',
            },
        },
    },
    args: {
        name: 'demo',
        mask: MaskedInputPreset.DOLLAR,
        label: 'Enter a value',
        placeholder: 'Enter a value',
        description: 'Enter a value',
        min: 1,
        max: 100,
    },
} as Meta;

export const Basic: Story<MaskedInputProps> = (args) => {
    const [{ realValue }, updateArgs] = useArgs();
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        updateArgs({ realValue: event.target.value });
    return <MaskedInput onChange={onChange} {...args} />;
};
