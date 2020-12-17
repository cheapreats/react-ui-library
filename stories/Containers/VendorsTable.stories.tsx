import React from 'react';
import { VendorsTable, IVendorsTableProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Vendors Table'),
    component: VendorsTable,
} as Meta;

const getVendorsTableProps = () => ({
    data: [
        {
            key: 1,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
        },
        {
            key: 2,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com'
        }
    ]
});

const Template: Story<IVendorsTableProps> = (args) => (
    <VendorsTable {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorsTableProps();