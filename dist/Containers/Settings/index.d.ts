import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { AccountProps } from './AccountCard';
import { InfoProps } from './InfoCard';
export interface SettingsProps extends React.HTMLAttributes<HTMLDivElement>, MainInterface, ResponsiveInterface, InfoProps, AccountProps {
    loading: boolean;
    store?: React.ReactElement;
    terminal?: React.ReactElement;
    title?: string;
    companyPrivacyURL: string;
    companySupportEmail: string;
    companyPhoneNumberDigits: string;
    closeButton: string;
    techSupportButton: string;
    privacyPolicyButton: string;
    accountInfo: string;
    userName: string;
    accountID: string;
    logoutButton: string;
    role: string;
    nonEmergencyLabel: string;
    assistanceLabel: string;
}
export declare const Settings: React.FC<SettingsProps>;
