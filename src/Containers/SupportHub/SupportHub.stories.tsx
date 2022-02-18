import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SupportHub, ISupportHub } from './SupportHub';


export default {
    title: 'Terminal/Settings/SupportHub',
    component: SupportHub,
    argTypes: {
        onSecretMenuPress: {action: 'Opening Secret Diagonitics Menu'},
        onTechnicalSupportPress: {action: 'Opening Technical Support Menu'},
        onFAQPress: {action: 'Opening FAW Menu'},
        onPrivacyPolicyPress: {action: 'Opening Privacy Policy Menu'},
    },
    args: {
        headerLabel: 'Support Hub',
        faqText: 'FAQ',
        technicalSupportText: 'Technical Support',
        privacyPolicyText: 'Privacy Policy',
    },
} as Meta;

export const Basic: Story<ISupportHub> = (args) => (
    <SupportHub {...args}/>
);
