import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DropArea, IDropAreaProps } from './DropArea';

export default {
    title: 'Components/DropArea',
    component: DropArea,
    args: {},
} as Meta;

export const Basic: Story<IDropAreaProps> = (args) => <DropArea {...args} />;

export const WithIsDragEnterTrue = Basic.bind({});
WithIsDragEnterTrue.args = {
    ...Basic.args,
    isDragEnter: true,
};

export const WithLotOfPaddingAndMargin = Basic.bind({});
WithLotOfPaddingAndMargin.args = {
    ...Basic.args,
    padding: '40px',
    margin: '40px',
};

export const WithPersonalizedMessage = Basic.bind({});
WithPersonalizedMessage.args = {
    ...Basic.args,
    message: 'hey, you can drag and drop or select by clicking!',
};
