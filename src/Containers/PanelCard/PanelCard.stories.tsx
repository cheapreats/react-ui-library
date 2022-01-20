import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PanelCard, IPanelCardProps,OperationState } from './PanelCard';

export default {
    title: 'Components/PanelCard',
    component: PanelCard,
    args: {},
    argTypes: { onCancelLoading: { action: 'clickeddd!!!' } },
} as Meta;

export const Basic: Story<IPanelCardProps> = (args) => <PanelCard {...args} />;

export const PanelIsLoading = Basic.bind({});
PanelIsLoading.args = {
    ...Basic.args,
    operationState: OperationState.isLoading,
    name: 'Abcd'
};

export const PanelIsFailure = Basic.bind({});
PanelIsFailure.args = {
    ...Basic.args,
    operationState: OperationState.isFailure,
    name: 'Abcd'
};

export const PanelIsSuccess = Basic.bind({});
PanelIsSuccess.args = {
    ...Basic.args,
    operationState: OperationState.isSuccess,
    name: 'Abcd'
};
