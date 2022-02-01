import React from 'react';
import { Story, Meta } from '@storybook/react';
import { StatusWrapper, IStatusWrapperProps } from './StatusWrapper';

export default {
    title: 'Terminal/Inventory/StatusWrapper',
    component: StatusWrapper,
    args: {},
} as Meta;

export const Basic: Story<IStatusWrapperProps> = (args) => (
    <StatusWrapper {...args}>Test</StatusWrapper>
);

export const WithTextBold = Basic.bind({});
WithTextBold.args = {
    ...Basic.args,
    textProps: {
        bold: true,
    },
};
