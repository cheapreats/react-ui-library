import React from 'react';
export interface InviteProps {
    title: string;
    heading: string;
    description: string;
    footer: string;
    buttonText: string;
    inviteArgs: InputFieldsProps[];
}
interface InputFieldsProps {
    label: string;
    subLabel?: string;
    name: string;
    type: string;
    placeholder: string;
}
export declare const Invite: React.FC<InviteProps>;
export {};
