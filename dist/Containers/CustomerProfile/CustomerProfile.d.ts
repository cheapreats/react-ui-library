import React from 'react';
export interface CustomerProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    profileName: string;
    profileImage: string;
}
export declare const CustomerProfile: React.FC<CustomerProfileProps>;
