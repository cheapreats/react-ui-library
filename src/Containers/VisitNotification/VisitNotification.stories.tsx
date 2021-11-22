import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Paragraph, SmallText } from '@Text';
import { IVisitNotificationProps, VisitNotification } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('VisitNotification'),
    component: VisitNotification,
    args: {
        imgSrc: 'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
        header: (
            <Paragraph bold color="black">
                79 People
            </Paragraph>
        ),
        body: (
            <Paragraph color="gray" bold>
                Are viewing this page
            </Paragraph>
        ),
        footer: (
            <SmallText bold color="orange">
                Verified by Nudgify
            </SmallText>
        ),
    },
} as Meta;

export const Basic: Story<IVisitNotificationProps> = (args) => (
    <VisitNotification {...args} />
);
