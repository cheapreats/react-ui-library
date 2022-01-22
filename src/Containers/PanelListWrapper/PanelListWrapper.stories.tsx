import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MainTheme } from '@Themes/MainTheme';
import { PanelListWrapper, IPanelListWrapperProps } from './PanelListWrapper';
import {OperationState} from '../PanelCard/PanelCard';

export default {
    title: 'Components/PanelListWrapper',
    component: PanelListWrapper,
    args: {
    },
} as Meta;

export const Basic: Story<IPanelListWrapperProps> = (args) => (
    <PanelListWrapper {...args} />
);

export const WithSomePanels= Basic.bind({});
WithSomePanels.args={
    ...Basic.args,
    panels:[
        {
            name:'fileA.doc',
            operationState:OperationState.isLoading,
        },
        {
            name:'fileA.pdf',
            operationState:OperationState.isLoading,
        },
        {
            name:'fileB.pdf',
            operationState:OperationState.isSuccess,
        }
    ]
}

export const WithVerticalSpacingBetweenPanels= WithSomePanels.bind({});
WithVerticalSpacingBetweenPanels.args= {
    ...WithSomePanels.args,
    verticalSpacing:10,
}

export const WithStyle= WithVerticalSpacingBetweenPanels.bind({});
WithStyle.args= {
    ...WithVerticalSpacingBetweenPanels.args,
    style:{
        width:'250px',
        border:`2px solid ${MainTheme.colors.statusColors.red}`,
        borderRadius:MainTheme.dimensions.radius,
        padding:MainTheme.dimensions.padding.container,
        backgroundColor:MainTheme.colors.background,
    }
}