import React from 'react';
import { Meta, Story } from '@storybook/react';
import {Button} from '@Inputs/Button/Button';
import { PanelCard, IPanelCardProps,OperationState } from './PanelCard';

export default {
    title: 'Components/File Upload/PanelCard',
    component: PanelCard,
    args: {},
} as Meta;

export const Basic: Story<IPanelCardProps> = (args) => <PanelCard {...args} />;

export const IsLoadingPanel = Basic.bind({});
IsLoadingPanel.args = {
    ...Basic.args,
    operationState: OperationState.isLoading,
    name: 'Abcd.sdf sdf. sdf .sdf .pdf'
};

export const IsLoadingPanelBis = Basic.bind({});
IsLoadingPanelBis.args = {
    ...IsLoadingPanel.args,
    name: 'Abcd.sdf sdf. sdf .sdf .docx'
};

export const IsFailurePanel = Basic.bind({});
IsFailurePanel.args = {
    ...Basic.args,
    operationState: OperationState.isFailure,
    name: 'Abcd'
};

export const IsSuccessPanel = Basic.bind({});
IsSuccessPanel.args = {
    ...Basic.args,
    operationState: OperationState.isSuccess,
    name: 'Abcd'
};

export const IsLoadingPanelWithButton= IsLoadingPanel.bind({});
IsLoadingPanelWithButton.args={
    ...IsLoadingPanel.args,
    cancelButtonOnLoading:<Button onClick={()=>{console.log('cancelling...')}} margin='0 0 0 0px'>Cancel</Button>
}
export const IsFailurePanelWithButton= IsFailurePanel.bind({});
IsFailurePanelWithButton.args={
    ...IsFailurePanel.args,
    retryButtonOnFailure:<Button onClick={()=>{console.log('retrying...')}}>Retry</Button>
}
export const IsSuccessPanelWithButton= IsSuccessPanel.bind({});
IsSuccessPanelWithButton.args={
    ...IsSuccessPanel.args,
    dismissButtonOnSuccess:<Button onClick={()=>{console.log('dismissing...')}}>Dismiss</Button>
}