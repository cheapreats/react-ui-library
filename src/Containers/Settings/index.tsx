import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';
import { Heading } from '../../Text';
import { Loading } from '../Loading';
import { AccountCard, AccountProps } from './AccountCard';
import { InfoCard, InfoProps } from './InfoCard';

const loadingStyle = `
    ${Mixins.flex('column', 'flex-start', 'stretch')}
    ${Mixins.scroll}
    overflow: auto;
    width: 100%;
`;

interface SettingsProps
    extends React.HTMLAttributes<HTMLDivElement>,
        MainInterface,
        ResponsiveInterface,
        InfoProps,
        AccountProps {
    loading: boolean;
    store?: React.ReactElement;
    terminal?: React.ReactElement;
    title?: string;
}

export const Settings: React.FC<SettingsProps> = ({
    loading,
    store,
    terminal,
    faqName = 'FAQ',
    faqLink,
    version,
    employee = { username: '', role: '', _id: '' },
    logout,
    title,
    ...props
}): React.ReactElement => {
    return (
        <Loading loading={loading} inlineStyle={loadingStyle} {...props}>
            <div>
                <Heading type="h1" bold lineHeight="1.2" margin="0 0 10px">
                    {title}
                </Heading>
                {!loading && (
                    <Cards>
                        <AccountCard employee={employee} logout={logout} />
                        {store}
                        {terminal}
                        <InfoCard
                            faqLink={faqLink}
                            faqName={faqName}
                            version={version}
                        />
                    </Cards>
                )}
            </div>
        </Loading>
    );
};
const Cards = styled.div`
    ${Mixins.flex()}
    flex-wrap: wrap;
    margin: 0 5px;
    max-width: 1000px;
    ${Mixins.media(
        'tablet',
        `
        max-width: 450px;
        margin: 0 5px;
    `,
    )}
`;
