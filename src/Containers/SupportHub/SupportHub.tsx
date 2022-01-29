import React from "react";
import { QuestionCircle } from '@styled-icons/fa-solid/QuestionCircle';
import { Wrench } from '@styled-icons/fa-solid/Wrench';
import { Book } from '@styled-icons/fa-solid/Book';
import styled from "styled-components";
import { InfoCircle } from '@styled-icons/fa-solid/InfoCircle';
import {Button} from '../../Inputs';
import { SettingsCard } from "..";
import { Mixins } from '../../Utils';
import { SmallText } from "../../Text";

export interface ISupportHub {
    onSecretMenuPress: () => void,
    onFAQPress: () => void,
    onTechnicalSupportPress: () => void,
    onPrivacyPolicyPress: () => void,
    faqText: string,
    technicalSupportText: string,
    privacyPolicyText: string,
    headerLabel: string,
}

export const SupportHub: React.FC<ISupportHub> = ({
    headerLabel,
    onSecretMenuPress,
    onFAQPress,
    onTechnicalSupportPress,
    onPrivacyPolicyPress,
    faqText,
    technicalSupportText,
    privacyPolicyText,
    ...props
}) => (
    <SettingsCard
        heading={headerLabel}
        icon={InfoCircle}
        onClick={onSecretMenuPress}
        data-cy="additionalInformationSection"
        {...props}
    >
        <Buttons>
            <FAQButton
                icon={QuestionCircle}
                data-cy="openTerminalFAQPageButton"
                onClick={onFAQPress}
            >
                {faqText}
            </FAQButton>
            <TechnicalButton
                icon={Wrench}
                data-cy="openTechincalSupportModalButton"
                onClick={onTechnicalSupportPress}
            >
                {technicalSupportText}
            </TechnicalButton>
            <PrivacyButton
                icon={Book}
                data-cy="openTerminalFAQPageButton"
                onClick={onPrivacyPolicyPress}
            >
                {privacyPolicyText}
            </PrivacyButton>
        </Buttons>
        <Copyright margin="auto 0 0" />
    </SettingsCard>
)

const Buttons = styled.div`
    ${Mixins.flex()}
    margin: 0 -5px 10px;
    flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
    margin: 5px;
`

const FAQButton = styled(StyledButton)``;
const TechnicalButton = styled(StyledButton)``;
const PrivacyButton = styled(StyledButton)``;

const Copyright = styled(SmallText).attrs(() => ({
    color: 'secondary',
    bold: true
}))`
    margin: 20px 0 0;
`;