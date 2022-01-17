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
    },
} as Meta;

export const Basic: Story<IDropAreaProps> = (args) => <DropArea {...args} />;
export const IsDragEnterTrue = Basic.bind({});
IsDragEnterTrue.args = {
    ...Basic.args,
    isDragEnter: true,
};
