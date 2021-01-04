import React from 'react';
import { Meta, Story } from '@storybook/react';
import { QRScan, QRScanProps, PhoneBox, qrImgURL1 } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('QRScan'),
    component: QRScan,
    args: {
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
    },
} as Meta;

export const Basic: Story<QRScanProps> = (args) => <QRScan {...args} />;

export const NotIconInMiddleFooter = Basic.bind({});

NotIconInMiddleFooter.args = {
    ...NotIconInMiddleFooter.args,
    contentRightBig: 31,
    MiddleFooterIcon: undefined,
    middleFooterIconWidth: 0,
};
