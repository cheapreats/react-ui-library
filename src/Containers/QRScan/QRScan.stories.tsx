import React from 'react';
import { Meta, Story } from '@storybook/react';
import styled from 'styled-components';
import { PhoneFill } from '@styled-icons/bootstrap/PhoneFill';
import { SmallText } from '@Text/SmallText';
import { QRScan, QRScanProps } from '../../index';
import { QRIconWithText } from './QRIconWithText';


const qrImgURL1 =
    'https://storage.googleapis.com/support-forums-api/attachment/thread-13090132-506909745012483037.png';
const QRImg = styled.img`
    width: 150px;
`;

const footerItems = [
    <QRIconWithText
        subTextSize="0.4rem"
        headingTextSize="0.6rem"
        textWidth="50px"
        margin="5px 5px 5px 5px"
        iconSize="30px"
        headingText="QR code with"
        subText="your phones camera"
        icon={PhoneFill}
    />,
    <QRIconWithText
        subTextSize="0.4rem"
        headingTextSize="0.6rem"
        textWidth="50px"
        margin="5px 5px 5px 0"
        iconSize="30px"
        headingText="Pick up"
        subText="or ..."
        icon={PhoneFill}
    />,
    <QRIconWithText
        subTextSize="0.4rem"
        headingTextSize="0.6rem"
        textWidth="50px"
        margin="5px 5px 5px 0"
        iconSize="30px"
        headingText="Order and Pay"
        subText="in your browser"
        icon={PhoneFill}
    />,
];

export default {
    title: 'Components/Other/QRScan',
    component: QRScan,
    args: {
        title: 'COVID Contact Tracing',
        qrDisplay: <QRImg src={qrImgURL1} />,
        footerItems,
        middleItems: (
            <SmallText color="white" margin="10px auto">
                Get Updates from the store
            </SmallText>
        ),
        qrRightContent: (
            <SmallText color="black" margin="10px auto">
                Get Updates from the store
            </SmallText>
        ),
    },
} as Meta;

export const Basic: Story<QRScanProps> = (args) => <QRScan {...args} />;
