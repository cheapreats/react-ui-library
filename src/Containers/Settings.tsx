import React, { useState } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { InfoCircle } from 'styled-icons/fa-solid/InfoCircle';
import { Wrench } from 'styled-icons/fa-solid/Wrench';
import { Book } from 'styled-icons/fa-solid/Book';
import { QuestionCircle } from 'styled-icons/fa-solid/QuestionCircle';
import { Mixins, BaseStyles } from '@Utils';

import { SignOutAlt } from 'styled-icons/fa-solid/SignOutAlt';
import { UserCircle } from 'styled-icons/fa-solid/UserCircle';
import { Heading, Paragraph, SmallText } from '../Text';
import { Loading } from './Loading';
import { SettingsCard } from './SettingsCard';
import { Button } from '../Inputs/Button';
import { Modal } from './Modal';
import { Copyright } from './Copyright';

const loadingStyle = `
    ${Mixins.flex('column', 'flex-start', 'stretch')}
    ${Mixins.scroll}
    overflow: auto;
    width: 100%;
`;

interface SettingsProps
    extends MainInterface,
        ResponsiveInterface,
        InfoProps,
        AccountProps {
    loading: boolean;
    cardOne?: React.ReactElement;
    cardTwo?: React.ReactElement;
    cardThree?: React.ReactElement;
}
interface InfoProps extends MainInterface, ResponsiveInterface {
    faqName: string;
    faqLink: string;
    version: string | number;
}
interface AccountProps extends MainInterface, ResponsiveInterface {
    employee: { username: string; role: string; _id: string };
    logout: Function;
}
interface DisplayItemProps extends MainInterface, ResponsiveInterface {
    label: string;
    value: string;
}

const Info: React.FC<InfoProps> = ({ faqName, faqLink, version }) => {
    const state = useState(false);
    return (
        <SettingsCard heading="Additional Information" icon={InfoCircle}>
            <Buttons>
                <Button
                    margin="5px"
                    icon={Book}
                    onClick={() =>
                        window.open(
                            'https://legal.cheapreats.com/privacy-policy.html',
                            '_blank',
                        )
                    }
                >
                    Privacy Policy
                </Button>
                <Button
                    margin="5px"
                    icon={Wrench}
                    onClick={() => state[1](true)}
                >
                    Technical Support
                </Button>
                <Button
                    margin="5px"
                    icon={QuestionCircle}
                    onClick={() => window.open(faqLink, '_blank')}
                >
                    {faqName}
                </Button>
            </Buttons>
            <Copyright margin="auto 0 0" version={version} />

            <Modal padding="25px 35px" state={state} width="small">
                <Heading type="h3" margin="0 0 10px" bold>
                    Technical Support
                </Heading>
                <Paragraph bold>
                    {'For non-emergency inquiries, shoot us an email at '}
                    <a href="mailto:support@cheapreats.com">
                        support@cheapreats.com
                    </a>
                    .
                </Paragraph>
                <Paragraph margin="15px 0" bold>
                    {'If you require immediate assistance, please call/text: '}
                    <a href="tel:13063411035">+1 (306) 341-1035</a>
                </Paragraph>
                <Button onClick={() => state[1](false)}>Close</Button>
            </Modal>
        </SettingsCard>
    );
};
const Account: React.FC<AccountProps> = ({ employee, logout }) => {
    return (
        <SettingsCard heading="Account Information" icon={UserCircle}>
            <DisplayItem label="Username" value={employee.username} />
            <DisplayItem
                label="Role"
                value={
                    employee.role.charAt(0).toUpperCase() +
                    employee.role.slice(1)
                }
            />
            <DisplayItem
                label="Account Id"
                value={employee._id}
                margin="2px 0 auto"
            />
            <Button
                margin="20px 0 0"
                onClick={() => logout()}
                icon={SignOutAlt}
            >
                Logout
            </Button>
        </SettingsCard>
    );
};
const DisplayItem: React.FC<DisplayItemProps> = ({
    label,
    value,
    ...props
}): React.ReactElement => (
    <Item {...props}>
        <SmallText lineHeight="1" size="0.9rem" bold>
            {label}
        </SmallText>
        <Text color="grey" bold>
            {value}
        </Text>
    </Item>
);

export const Settings: React.FC<SettingsProps> = ({
    loading,
    cardOne,
    cardTwo,
    cardThree,
    faqName = 'FAQ',
    faqLink,
    version,
    employee = { username: '', role: '', _id: '' },
    logout,
    ...props
}): React.ReactElement => {
    return (
        <>
            <Loading loading={loading} inlineStyle={loadingStyle} {...props}>
                <div>
                    <Heading type="h1" bold lineHeight="1.2" margin="0 0 10px">
                        Terminal Settings
                    </Heading>
                    {!loading && (
                        <Cards>
                            <Account employee={employee} logout={logout} />
                            {cardTwo && cardTwo}
                            {cardThree && cardThree}
                            <Info
                                faqLink={faqLink}
                                faqName={faqName}
                                version={version}
                            />
                        </Cards>
                    )}
                </div>
            </Loading>
        </>
    );
};
const Cards = styled.div`
    ${Mixins.flex()}
    flex-wrap: wrap;
    margin: 0 -10px;
    max-width: 1000px;
    ${Mixins.media(
        'tablet',
        `
        max-width: 450px;
        margin: 0;
    `,
    )}
`;
const Buttons = styled.div`
    ${Mixins.flex()}
    margin: 0 -5px 10px;
    flex-wrap: wrap;
`;
const Item = styled.div`
    ${props => BaseStyles.Main({ margin: '2px 0', ...props })}
`;

const Text = styled(Paragraph)`
    overflow-wrap: break-word;
`;
