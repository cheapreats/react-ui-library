import React from 'react';
import { QRScan, QRScanProps, PhoneBox, qrImgURL1 } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

import { MainTheme } from '../../src/Themes';

export default {
    title: createStoryTitle('QRScan'),
    component: QRScan,
} as Meta;

const Template: Story<QRScanProps> = (args) => <QRScan {...args}></QRScan>;

export const Basic = Template.bind({});

Basic.args = {
    title: 'ORDER HERE',
    qrImgURL: qrImgURL1,
    contentRightTitle: 'TABLE',
    contentRightBig: 32,
    middleFooterText: 'Snackpass',
    MiddleFooterIcon: <PhoneBox inverted />,
    middleFooterIconWidth: 10,
    FooterIcon1: <PhoneBox />,
    footerIcon1width: 10,
    FooterIcon2: <PhoneBox />,
    footerIcon2width: 10,
    FooterIcon3: <PhoneBox />,
    footerIcon3width: 10,
    footer1header: 'QR code with',
    footer1body: "your phone's camera",
    footer2header: 'Order & Pay',
    footer2body: 'in your browser',
    footer3header: 'Pick up',
    footer3body: 'or ...',
};

export const NotIconInMiddleFooter = Template.bind({});

NotIconInMiddleFooter.args = {
    title: 'ORDER HERE',
    qrImgURL: qrImgURL1,
    contentRightTitle: 'TABLE',
    contentRightBig: 31,
    middleFooterText: 'Snackpass',
    MiddleFooterIcon: '',
    middleFooterIconWidth: 0,
    FooterIcon1: <PhoneBox />,
    footerIcon1width: 10,
    FooterIcon2: <PhoneBox />,
    footerIcon2width: 10,
    FooterIcon3: <PhoneBox />,
    footerIcon3width: 10,
    footer1header: 'QR code with',
    footer1body: "your phone's camera",
    footer2header: 'Order & Pay',
    footer2body: 'in your browser',
    footer3header: 'Pick up',
    footer3body: 'or ...',
};
