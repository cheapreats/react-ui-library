import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DropArea, IDropAreaProps } from './DropArea';

export default {
    title: 'Components/DropArea',
    component: DropArea,
    args: {},
    argTypes: { onClick: { action: 'clickeddd!!!' } },
} as Meta;

export const Basic: Story<IDropAreaProps> = (args) => <DropArea {...args} />;
