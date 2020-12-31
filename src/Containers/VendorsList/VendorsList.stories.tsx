import React from 'react';
import { Story, Meta } from '@storybook/react';
import { VendorsList, IVendorsListProps } from './VendorsList';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Vendors List'),
    component: VendorsList,
} as Meta;

const getVendorsListProps = (): IVendorsListProps => ({
    
});

const Template: Story<IVendorsListProps> = (args) => (
    <VendorsList {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorsListProps();
