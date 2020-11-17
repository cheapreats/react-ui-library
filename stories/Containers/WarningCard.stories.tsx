import React from 'react';
import { WarningCard, IWarningCardProps, SmallText } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('WarningCard'),
    component: WarningCard,
    argTypes: {
        onClick: { action: 'Clicked!' },
    },
    args: {
        headerText: 'Danger',
        buttonText: 'Delete',
        loading: false,
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
