import React, { useState } from 'react';
import styled from 'styled-components';
import { InfoCircle } from '@styled-icons/fa-solid/InfoCircle';
import { Wrench } from '@styled-icons/fa-solid/Wrench';
import { Book } from '@styled-icons/fa-solid/Book';
import { QuestionCircle } from '@styled-icons/fa-solid/QuestionCircle';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';
import { Heading, Paragraph } from '../../Text';
import { SettingsCard } from '../SettingsCard/SettingsCard';
import { Button } from '../../Inputs/Button/Button';
import { Modal } from '../Modal/Modal';
import { Copyright } from '../Copyright/Copyright';

export interface InfoProps
    extends React.HTMLAttributes<HTMLDivElement>,
        MainInterface,
        ResponsiveInterface {
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

export const InfoCard: React.FC<InfoProps> = ({
    faqName,
    faqLink,
    version,
    companyPrivacyURL = 'https://legal.cheapreats.com/privacy-policy.html',
    companySupportEmail = 'support@cheapreats.com',
    companyPhoneNumberDigits = '13063411035',
    closeButton = 'Close',
    techSupportButton = 'Technical Support',
    privacyPolicyButton = 'Privacy Policy',
    nonEmergencyLabel = `For non-emergency inquiries, shoot us an email at `,
    assistanceLabel = `If you require immediate assistance, please call/text: `,
}): React.ReactElement => {
    const state = useState(false);
    function formatPhoneNumber(
        companyPhoneNumberDigitString: string,
    ): string | null {
        const cleaned = `${companyPhoneNumberDigitString}`.replace(/\D/g, '');
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const intlCode = match[1] ? '+1 ' : '';
            return [
                intlCode,
                '(',
                match[2],
                ') ',
                match[3],
                '-',
                match[4],
            ].join('');
        }
        return null;
    }
    return (
        <SettingsCard heading="Additional Information" icon={InfoCircle}>
            <Buttons>
                <Button
                    margin="5px"
                    icon={Book}
                    onClick={(): null | Window =>
                        window.open(companyPrivacyURL, '_blank')
                    }
                >
                    {privacyPolicyButton}
                </Button>
                <Button
                    margin="5px"
                    icon={Wrench}
                    onClick={(): void => state[1](true)}
                >
                    {techSupportButton}
                </Button>
                <Button
                    margin="5px"
                    icon={QuestionCircle}
                    onClick={(): Window | null =>
                        window.open(faqLink, '_blank')
                    }
                >
                    {faqName}
                </Button>
            </Buttons>
            <Copyright margin="auto 0 0" version={version} />

            <Modal padding="25px 35px" state={state} width="small">
                <Heading type="h3" margin="0 0 10px" bold>
                    {techSupportButton}
                </Heading>
                <Paragraph bold>
                    {nonEmergencyLabel}
                    <a href={`mailto:${companySupportEmail}`}>
                        {companySupportEmail}
                    </a>
                    .
                </Paragraph>
                <Paragraph margin="15px 0" bold>
                    {assistanceLabel}
                    <a href={`tel:${companyPhoneNumberDigits}`}>
                        {formatPhoneNumber(companyPhoneNumberDigits)}
                    </a>
                </Paragraph>
                <Button onClick={(): void => state[1](false)}>
                    {closeButton}
                </Button>
            </Modal>
        </SettingsCard>
    );
};

const Buttons = styled.div`
    ${Mixins.flex()}
    margin: 0 -5px 10px;
    flex-wrap: wrap;
`;
