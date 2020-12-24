import React from 'react';
import styled from 'styled-components';
import { Heading, SmallText as S } from '@Text';
import { flex, media, scroll } from '@Utils/Mixins';
import { Loading } from '../Loading/Loading';
import { Card, CardProps } from '../Card/Card';
import { Copyright } from '../Copyright/Copyright';

export interface ILandingProps extends CardProps {
    children: React.ReactNode;
    label?: string;
    description?: string;
    loading?: boolean;
    version: string | number;
    logo?: string;
}

export const Landing: React.FC<ILandingProps> = ({
    children,
    label,
    description,
    loading,
    version,
    logo,
    ...props
}): React.ReactElement => (
    <Loading loading={loading} inlineStyle={loadingStyles}>
        <Container>
            <Card {...props} inlineStyle={cardStyles}>
                <Header>
                    {!!logo && <Logo width="60" src={logo} />}
                    {!!label && (
                        <Heading margin="10px 0 0" lineHeight="1.2" bold>
                            {label}
                        </Heading>
                    )}
                </Header>
                {!!description && (
                    <SmallText margin="5px 0 20px" bold>
                        {description}
                    </SmallText>
                )}
                {children}
                <Copyright margin="20px 0 0" version={version} />
            </Card>
        </Container>
    </Loading>
);

const Container = styled.main`
    ${flex('column', 'flex-start', 'center')}
    background-color: ${({ theme }) => theme.colors.input.default};
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 120px 0 40px;
    ${media(
        'tablet',
        `
        padding: 60px 0;
    `,
    )}
`;

const Header = styled.div`
    ${flex('flex-start', 'center')}
`;

const Logo = styled.img`
    margin-left: -8px;
    height: 100%;
`;

const loadingStyles = `
    ${flex('center', 'flex-start')}
    ${scroll}
    flex-grow: 1;
    overflow: auto;
    min-height: 100vh;
    height: 100vh;
`;

const cardStyles = `
    ${flex('column')}
    box-sizing: border-box;
    padding: 25px 30px;
    max-width: 600px;
    width: 100%;
    height: 100%;
`;

const SmallText = styled(S)`
    opacity: 0.7;
`;
