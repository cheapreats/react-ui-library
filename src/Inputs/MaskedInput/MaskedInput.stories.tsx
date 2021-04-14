import React from 'react';
import { MaskedInput, MaskedInputProps, MaskedInputPreset } from '@Inputs';
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
        mask :{
            defaultValue: MaskedInputPreset.PHONE,
            control: {
                type: 'radio',
                options: MaskedInputPreset
            }
        }
    },
    args: {
        realValue: '12345678901',
        name: 'demo',
        label: 'Enter a value',
        placeholder: 'Enter a value',
        description: 'Enter a value',
        error: '',
    },
} as Meta;

export const Basic: Story<MaskedInputProps> = (args) => {
    const [, updateArgs] = useArgs();
    const onChange = ({target}: any) =>
        updateArgs({ realValue: target.value });
    return <MaskedInput {...args} onInputChange={onChange} />;
};
