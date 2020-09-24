import React from 'react';
import {
    QRScan,
    QRScanProps,
    PhoneBox,
    Snackpass,
    TableNumberComp,
    QRURL1,
} from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('QRScan'),
    component: QRScan,
    args: {
        Icon: PhoneBox,
        title: 'ORDER HERE',
        InFooter: Snackpass,
        ContentRight: TableNumberComp,
        QRURL: QRURL1,
    },
} as Meta;

export const Basic: Story<QRScanProps> = (args) => <QRScan {...args}></QRScan>;
