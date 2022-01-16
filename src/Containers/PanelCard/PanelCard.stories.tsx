import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PanelCard, IPanelCardProps, OperationState } from './PanelCard';

export default {
    title: 'Components/PanelCard',
    component: PanelCard,
    args: {},
} as Meta;

export const Basic: Story<IPanelCardProps> = (args) => <PanelCard {...args} />;

export const PanelIsLoading = Basic.bind({});
PanelIsLoading.args = {
    ...Basic.args,
    name: 'file A',
    operationState: OperationState.isLoading,
};

export const PanelIsFailure = Basic.bind({});
PanelIsFailure.args = {
    ...Basic.args,
    name: 'file A',
    operationState: OperationState.isFailure,
};

export const PanelIsSuccess = Basic.bind({});
PanelIsSuccess.args = {
    ...Basic.args,
    name: 'file A',
    operationState: OperationState.isSuccess,
};
