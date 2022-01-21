import React from 'react';
import { Meta, Story } from '@storybook/react';
import { WarningCard, IWarningCardProps, SmallText } from '../../index';


export default {
    title: 'Components/Warning Card',
    component: WarningCard,
    argTypes: {
        action: { action: 'Clicked!' },
    },
    args: {
        headerText: 'Warning',
        buttonText: 'Delete',
        buttonMargin: '10px auto 10px 0',
        flexDirection: 'column',
        animated: true,
        flat: true,
        iconSize: '30px',
    },
} as Meta;

export const Basic: Story<IWarningCardProps> = (args) => (
    <WarningCard {...args}>
        <SmallText color="primary" type="p" bold>
            Delete Item
        </SmallText>
        <SmallText type="p" bold>
            Are you sure you want to delete
        </SmallText>
    </WarningCard>
);
