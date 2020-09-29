import React from 'react';
import { QRScan, QRScanProps, PhoneBox, qrImgURL1 } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('QRScan'),
    component: QRScan,
} as Meta;

const defaultArgs = {
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

const Template: Story<QRScanProps> = (args) => <QRScan {...args}></QRScan>;

export const Basic = Template.bind({});

Basic.args = {
    ...defaultArgs,
};

export const NotIconInMiddleFooter = Template.bind({});

NotIconInMiddleFooter.args = {
    ...defaultArgs,
    contentRightBig: 31,
    MiddleFooterIcon: '',
    middleFooterIconWidth: 0,
};
