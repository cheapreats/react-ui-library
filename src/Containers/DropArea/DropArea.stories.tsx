import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DropArea, IDropAreaProps } from './DropArea';

export default {
    title: 'Components/File Upload/DropArea',
    component: DropArea,
    args: {},
    argTypes: {
        onDragLeave: { action: 'leaving drop are' },
        onDragEnter: { action: 'entering drop area' },
        onDropHandler: { action: 'files dropped' },
        onClickHandler: { action: 'you clicked!' },
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
export const BigPadding = Basic.bind({});
BigPadding.args = {
    ...Basic.args,
    dropAreaProps: { padding: '20px' },
};
export const DoNotOpenFileDialogButDoThis = Basic.bind({});
DoNotOpenFileDialogButDoThis.args = {
    ...Basic.args,
    onClickHandler: (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('hey');
    },
};
