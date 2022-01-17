import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PanelCard, IPanelCardProps } from './PanelCard';

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
    isLoadingMessage: 'loading file A ...',
};

export const PanelIsFailure = Basic.bind({});
PanelIsFailure.args = {
    ...Basic.args,
    isFailureMessage: 'Something went wrong',
};

export const PanelIsSuccess = Basic.bind({});
PanelIsSuccess.args = {
    ...Basic.args,
    isSuccessMessage: 'Completed',
};
