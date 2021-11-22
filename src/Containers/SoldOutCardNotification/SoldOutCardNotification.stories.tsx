import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Paragraph, SmallText } from '@Text';
import {
    SoldOutCardNotification,
    ISoldOutCardNotificationProps,
} from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('SoldOutCardNotification'),
    component: SoldOutCardNotification,
    args: {
        imgSrc: 'https://vuejobs.com/storage/avatars/GWnaVkQSwifU9Zn36Qzif4GQ38lMSWxLs9NgPaM4.png',
        header: <SmallText color="grey">Selling Fast</SmallText>,
        content: (
            <Paragraph>
                This product is likely to be &nbsp;
                <strong>sold out</strong>
                &nbsp; in &nbsp;
                <strong>
                    <span style={{ color: 'orange' }}>3 days</span>
                </strong>
            </Paragraph>
        ),
        footer: (
            <SmallText color="grey">
                Verified by &nbsp;
                <strong>Nudgify</strong>
            </SmallText>
        ),
    },
} as Meta;

export const Basic: Story<ISoldOutCardNotificationProps> = (args) => (
    <SoldOutCardNotification {...args} />
);
