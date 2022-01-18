import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DropArea, IDropAreaProps } from './DropArea';

export default {
    title: 'Components/DropArea',
    component: DropArea,
    args: {},
    argTypes: {
        onDragLeave: { action: 'leaving drop are' },
        onDragEnter: { action: 'entering drop area' },
        onDropHandler: { action: 'files dropped' },
        onClick: { action: 'you clicked!' },
    },
} as Meta;

export const Basic: Story<IDropAreaProps> = (args) => <DropArea {...args} />;
export const BigWidth = Basic.bind({});
BigWidth.args = {
    ...Basic.args,
    width: 500,
};
export const IsDisabledTrue = Basic.bind({});
IsDisabledTrue.args = {
    ...Basic.args,
    isDisabled: true,
};
