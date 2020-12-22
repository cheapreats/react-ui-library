import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MiddleCanvas, MiddleCanvasProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Middle Canvas'),
    component: MiddleCanvas,
    args: {
        firstCaption: 'Before Receipt Prints',
        secondCaption: 'After Receipt Prints',
        leftSelectOption: 'Design',
        rightSelectOption: 'Preview',
        printerOptions: {
            LIGHT: {
                title: 'Light',
                labels: ['Flash Once', 'Flash Twice'],
            },
            SOUND: {
                title: 'Sound',
                labels: ['Beep Once', 'Beep Twice'],
            },
        },
        templatePrefills: {
            BUSINESS_INFORMATION: {
                title: 'Business Information',
                labels: [
                    ['Upload Logo Image'],
                    ["Nasir's Gourmet Hot Dogs"],
                    ['7818 Edgewater Lane, St. Martins, NB E5R 4K3t'],
                    ['615-555-0190'],
                    ['www.NasirsHotDogs.com'],
                ],
            },
            ORDER_DETAILS: {
                title: 'Order Details',
                labels: [
                    ['Time: 3:23pm', 'Date: 01/23/21'],
                    ['Order transaction #', '3249244'],
                    ['Station #', '34'],
                    ['Status', 'Dine Out'],
                    ['Sales Associate', 'Cassandra'],
                ],
            },
            MENU_ITEMS: {
                title: 'Menu Items',
                labels: [
                    ['Qty', 'Product(UPC)', 'Price'],
                    ['Add item'],
                    ['Specific item instructions'],
                    ['...'],
                ],
                componentType: 'table',
            },
            PRICE_AND_PAYMENT: {
                title: 'Price & Payment',
                labels: [
                    ['Total Price', '$13.99'],
                    ['Rates of Sales Tax', '1.23%'],
                    ['Amount of Tax', '$2.13'],
                    ['Total Price with tax included', '$15.12'],
                    ['Payment Method', '***********2143'],
                ],
            },
            CODE: {
                title: 'Code',
                labels: [['Insert qr code here']],
            },
            SIGNATURE: {
                title: 'Signature',
                labels: [['Insert signature here']],
            },
        },
    },
} as Meta;

export const Basic: Story<MiddleCanvasProps> = (args) => (
    <MiddleCanvas {...args} />
);
