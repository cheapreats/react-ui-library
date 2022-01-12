import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DropArea,IDropAreaProps } from './DropArea';

export default {
    title: 'Components/DropArea',
    component: DropArea,
    args: {
    },
} as Meta;

export const Basic: Story<IDropAreaProps> = (args) => (
    <DropArea {...args} />
);

export const IsDragEnterTrue = Basic.bind({});
IsDragEnterTrue.args={
    ...Basic.args,
    isDragEnter:true
}