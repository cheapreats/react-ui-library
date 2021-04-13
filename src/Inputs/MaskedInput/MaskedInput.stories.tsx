import React from 'react';
import { MaskedInput, MaskedInputProps } from '@Inputs';
import { Meta, Story } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('MaskedInput'),
    component: MaskedInput,
    argTypes: {
        realValue: {
            defaultValue: '1',
            control: {
                type: 'text',
            },
        },
    },
    args: {
        realValue: "100",
        name: 'demo',
        label: 'Enter a value',
        placeholder: 'Enter a value',
        description: 'Enter a value',
        error: '',
        isInputValueNumber: false
    },
} as Meta;

export const Basic: Story<MaskedInputProps> = (args) => {
    const [, updateArgs] = useArgs();
    const onChange = (value: number | string) =>
        updateArgs({ realValue: value });
    return <MaskedInput {...args} onInputChange={onChange} />;
};
