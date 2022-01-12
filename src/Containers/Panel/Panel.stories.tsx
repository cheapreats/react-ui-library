import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Panel} from './Panel';
import {IPanelProps,OperationState} from '../FileUploadV2/FileUploadV2';

export default {
    title: 'Components/Panel',
    component: Panel,
    args: {
    },
} as Meta;

export const Basic: Story<IPanelProps> = (args) => (
    <Panel {...args} />
);

export const FileIsLoading = Basic.bind({});
FileIsLoading.args={
    ...Basic.args,
    name:'file A',
    operationState:OperationState.isLoading
}

export const FileIsFailure = Basic.bind({});
FileIsFailure.args={
    ...Basic.args,
    name:'file A',
    operationState:OperationState.isFailure
}

export const FileIsSuccess = Basic.bind({});
FileIsSuccess.args={
    ...Basic.args,
    name:'file A',
    operationState:OperationState.isSuccess
}

