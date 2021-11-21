import React from 'react';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
export interface InfoProps extends React.HTMLAttributes<HTMLDivElement>, MainInterface, ResponsiveInterface {
    faqName: string;
    faqLink: string;
    version: string | number;
    companyPrivacyURL: string;
    companySupportEmail: string;
    closeButton: string;
    companyPhoneNumberDigits: string;
    techSupportButton: string;
    privacyPolicyButton: string;
    nonEmergencyLabel: string;
    assistanceLabel: string;
}
export declare const InfoCard: React.FC<InfoProps>;
