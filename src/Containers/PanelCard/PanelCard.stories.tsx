import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PanelCard, IPanelCardProps } from './PanelCard';

export default {
    title: 'Components/PanelCard',
    component: PanelCard,
    args: {},
    argTypes: { onCancelLoading: { action: 'clicked' } },
} as Meta;

export const Basic: Story<IPanelCardProps> = (args) => <PanelCard {...args} />;

export const PanelIsLoading = Basic.bind({});
PanelIsLoading.args = {
    ...Basic.args,
    name: 'file A',
    operationState: { isLoading: true, isFailure: false, isSuccess: false },
};

export const PanelIsFailure = Basic.bind({});
PanelIsFailure.args = {
    ...Basic.args,
    name: 'file A',
    operationState: { isLoading: false, isFailure: true, isSuccess: false },
};

export const PanelIsSuccess = Basic.bind({});
PanelIsSuccess.args = {
    ...Basic.args,
    name: 'file A',
    operationState: { isLoading: false, isFailure: false, isSuccess: true },
};
