import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PanelCard } from './Panel';
import { IPanelProps, OperationState } from '../FileUploadV2/FileUploadV2';

export default {
    title: 'Components/PanelCard',
    component: PanelCard,
    args: {},
} as Meta;

export const Basic: Story<IPanelProps> = (args) => <PanelCard {...args} />;

export const FileIsLoading = Basic.bind({});
FileIsLoading.args = {
    ...Basic.args,
    name: 'file Aaaaaaakjsdkfj aksdjf laj h lkjh ljh',
    operationState: OperationState.isLoading,
};

export const FileIsFailure = Basic.bind({});
FileIsFailure.args = {
    ...Basic.args,
    name: 'file A',
    operationState: OperationState.isFailure,
};

export const FileIsSuccess = Basic.bind({});
FileIsSuccess.args = {
    ...Basic.args,
    name: 'file A',
    operationState: OperationState.isSuccess,
};

export const WithStyleAndPadding = Basic.bind({});
WithStyleAndPadding.args = {
    ...Basic.args,
    padding:'10px',
    style: {
        maxWidth:366,
        boxSizing:'border-box'
    },
};
