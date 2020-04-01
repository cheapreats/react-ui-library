import React, { useState, useRef } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { InfoCircle } from 'styled-icons/fa-solid/InfoCircle';
import { Wrench } from 'styled-icons/fa-solid/Wrench';
import { Book } from 'styled-icons/fa-solid/Book';
import { Mixins } from '@Utils';
import { Heading, Paragraph } from '../Text';
import { Loading } from './Loading';
import { SettingsCard } from './SettingsCard';
import { Button } from '../Inputs/Button';
import { Modal } from './Modal';

const loadingStyle = `
    ${Mixins.flex('column', 'flex-start', 'stretch')}
    ${Mixins.scroll}
    overflow: auto;
    width: 100%;
`;

interface SettingsProps extends MainInterface, ResponsiveInterface {
    loading: boolean;
    cardOne?: React.ReactElement;
    cardTwo?: React.ReactElement;
    cardThree?: React.ReactElement;
}

const Info = () => {
    const state = useState(false);
    const anchorLink = useRef(null);
    return (
        <SettingsCard heading="Additional Information" icon={InfoCircle}>
            <Button
                margin="5px"
                icon={Book}
                href="https://legal.cheapreats.com/privacy-policy.html"
            >
                <a
                    ref={anchorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://legal.cheapreats.com/privacy-policy.html"
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    Privacy Policy
                </a>
            </Button>
            <Button margin="5px" icon={Wrench} onClick={() => state[1](true)}>
                Technical Support
            </Button>
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
const Account = () => {
    return <div>Account</div>;
};

export const Settings: React.FC<SettingsProps> = ({
    loading,
    cardOne,
    cardTwo,
    cardThree,
    ...props
}): React.ReactElement => {
    return (
        <>
            <Loading loading={loading} inlineStyle={loadingStyle}>
                <div>
                    <Heading type="h1" bold lineHeight="1.2" margin="0 0 10px">
                        Terminal Settings
                    </Heading>
                    {!loading && (
                        <Cards>
                            <Account />
                            {cardOne && cardOne}
                            {cardTwo && cardTwo}
                            <Info />
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
