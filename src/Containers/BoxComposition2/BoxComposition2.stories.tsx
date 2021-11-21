import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BoxComposition2, IBoxComposition2Props } from '@Containers';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('BoxComposition2'),
    component: BoxComposition2,
    args: {
        desktopBox: {
            imgSrc: 'https://www.fcbarcelona.com/fcbarcelona/photo/2019/11/15/a88146ca-3960-42f5-bb09-93d5e5173b6a/comunicacio-institucional.jpg',
            top: 50,
            left: 50,
            width: 350,
            height: 350,
            borderRadius: 5,
        },
        mobileBox: {
            imgSrc: 'https://media-exp1.licdn.com/dms/image/C4E0BAQEjJXZVIngBgg/company-logo_200_200/0/1585038272876?e=2159024400&v=beta&t=oyTZ3tMJ1UgV4nlD_GyjBflxAf9SQJLZt2HBDAje3Vc',
            top: 0,
            left: 200,
            width: 100,
            height: 500,
            borderRadius: 10,
        },
        notificationBox: {
            imgSrc: 'https://www.fcbarcelona.com/fcbarcelona/photo/2020/07/22/d71b7f7a-cc23-4e5c-bab5-fc781ab6c3db/Canon-Medical-partnership-FC-Barcelona.jpg',
            top: 100,
            left: 0,
            width: 300,
            height: 40,
            borderRadius: 5,
        },
    },
} as Meta;

export const Basic: Story<IBoxComposition2Props> = (args) => (
    <BoxComposition2 {...args} />
);
