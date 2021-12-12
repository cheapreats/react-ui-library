import { Meta, Story } from '@storybook/react';
import React from 'react';
import { StoreSelector, StoreSelectorProps } from '../../index';

export default {
    title: 'Components/Store Selector',
    component: StoreSelector,
    argTypes: {
        onClickArrows: { action: 'An arrow was clicked' },
        onClickUp: { action: 'Index has moved up ' },
        onClickDown: { action: 'Index has moved down' },
    },
} as Meta;
const Template: Story<StoreSelectorProps> = (args) => <StoreSelector {...args} />

export const StoreSelectorBasic = Template.bind({});
StoreSelectorBasic.args = {
    upArrowEnabled: true,
    downArrowEnabled: true, 
    storeProfileData: [
        { storeSelectorName: 'Jack\'s Store', storeSelectorId: 0, storeStatus: 2 },
        { storeSelectorName: 'Pizza the Hutt', storeSelectorId: 1, storeStatus: 1 },
        { storeSelectorName: 'Bread Pitt', storeSelectorId: 2, storeStatus: 0 },
        { storeSelectorName: 'The Codfather', storeSelectorId: 3, storeStatus: 2 },
    ],
};

export const StoreSelectorPending = Template.bind({});
StoreSelectorPending.args = {
    upArrowEnabled: false,
    downArrowEnabled: false,
    storeProfileData: [
        { storeSelectorName: 'The Grillenium Falcon', storeSelectorId: 0, storeStatus: 1 },
    ],
};

export const StoreSelectorDenied = Template.bind({});
StoreSelectorDenied.args = {
    upArrowEnabled: false,
    downArrowEnabled: false,
    storeProfileData: [
        { storeSelectorName: 'The Brewseum', storeSelectorId: 0, storeStatus: 0 },
    ],
};

export const StoreSelectorVerbose = Template.bind({});
StoreSelectorVerbose.args = {
    upArrowEnabled: false,
    downArrowEnabled: false,
    storeProfileData: [
        { storeSelectorName: 'The Grillenium Falcon episode 6: return of the jedfry', storeSelectorId: 0, storeStatus: 2 }
    ],
};

export const StoreSelectorEmpty = Template.bind({});
StoreSelectorEmpty.args = {
    upArrowEnabled: false,
    downArrowEnabled: false,
    storeProfileData: [
        { storeSelectorName: '', storeSelectorId: 0, storeStatus: NaN}
    ]
}