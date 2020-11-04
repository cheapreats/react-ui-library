import React from 'react';
import { MiddleCanvas, MiddleCanvasProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Middle Canvas'),
    component: MiddleCanvas,
    argTypes: { onDragEnd: { action: 'I have been dragged!' } },
    args: {
        firstCaption: 'Before Receipt Prints',
        secondCaption: 'After Receipt Prints',
        leftSelectOption: 'Design',
        rightSelectOption: 'Preview',
        printerOptions: {
            LIGHT: {
                title: 'Light',
                labels: ['Flash Once', 'Flash Twice']
            },
            SOUND: {
                title: 'Sound',
                labels: ['Beep Once', 'Beep Twice']
            }
        },
        templatePrefills: {
            BUSINESS_INFORMATION: {
                title: 'Business Information',
                labels: [['Upload Logo Image'], ["Nasir's Gourmet Hot Dogs"], ['7818 Edgewater Lane', 'St. Martins, NB E5R 4K3t'], ['615-555-0190'], ['www.NasirsHotDogs.com']],
                display: 'center',
                column: true,
            },
            ORDER_DETAILS: {
                title: 'Order Details',
                labels: [['Time: 3:23pm', 'Date: 01/23/21'], ['Order transaction #', '3249244'], ['Station #', '34'], ['Status', 'Dine Out'], ['Sales Associate', 'Cassandra']],
                display: 'space-between',
                column: false,
            },
            MENU_ITEMS: {
                title: 'Menu Items',
                labels: [[]],
                display: '',
                column: false,
            },
            PRICE_AND_PAYMENT: {
                title: 'Price & Payment',
                labels: [['Total Price', '$13.99'], ['Rates of Sales Tax', '1.23%'], ['Amount of Tax', '$2.13'], ['Total Price with tax included', '$15.12'], ['Payment Method', '***********2143']],
                display: 'space-between',
                column: false
            },
            CODE: {
                title: 'Code',
                labels: [[]],
                display: '',
                column: false
            },
            SIGNATURE: {
                title: 'Signature',
                labels: [[]],
                display: '',
                column: false
            }
        };
        
    }
} as Meta;

export const Basic: Story<MiddleCanvasProps> = (args) => (
    <MiddleCanvas {...args} />
);