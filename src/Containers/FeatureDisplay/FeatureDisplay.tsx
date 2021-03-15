import React from 'react';
import SmallText from '@Text/SmallText';
import styled from 'styled-components';
import { Card } from '../Card/Card';
import { flex, media } from '@Utils/Mixins';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { ShowChart } from '@styled-icons/material/ShowChart';
import { Triangle } from '@styled-icons/bootstrap/Triangle';

export interface IFeatureDisplayProps {
    featureTitle: string;
    featureImage: string;
    featureImageTitle: string;
    highlightTexts: string[];
    featureFooter: string;
}

export const FeatureDisplay: React.FC<IFeatureDisplayProps> = ({
    featureTitle: featureTitle,
    featureImage: featureImage,
    featureImageTitle: featureImageTitle,
    highlightTexts,
    featureFooter: featureFooter,
    ...cardProps
}): React.ReactElement => (
    <Container>
        <Card inlineStyle={cardStyles}>
            <Section>
                <SmallText
                    type="div"
                    size="h1"
                    color="#9966ff"
                    bold
                    lineHeight="false"
                    inlineStyle={bottomStyles}
                >
                    {featureTitle}
                </SmallText>
            </Section>
            <Section>
                <SmallText size="h6">
                    Stripe Radar uses sophisticated{' '}
                    <Link href="#">
                        <SmallText color="#9966ff" size="h6" bold>
                            machine learning
                        </SmallText>
                    </Link>{' '}
                    trained daily on data from millions of global businesses to
                    protect you from fraudsters.
                </SmallText>
            </Section>
            <Section>
                <Card inlineStyle={cardStyles}>
                    <SmallText
                        type="div"
                        size="h7"
                        color="text"
                        lineHeight="false"
                        bold
                        inlineStyle={bottomStyles}
                    >
                        {featureImageTitle}
                    </SmallText>
                    <img src={featureImage} />
                    <Section>
                        <GridContainer>
                            <GridItem>
                                <ChartDesc color="#0073e6" />{' '}
                                <SmallText>Blocked</SmallText>
                            </GridItem>
                            <GridItem>
                                <ChartDesc color="#00d924" />{' '}
                                <SmallText>Allowed</SmallText>
                            </GridItem>
                            <GridItem>
                                <ChartDesc color="#9966ff" />{' '}
                                <SmallText>
                                    Requested 3D Secure authentication
                                </SmallText>
                            </GridItem>
                            <GridItem>
                                <ChartDesc color="#80e9ff" />{' '}
                                <SmallText>Sent to manual review</SmallText>
                            </GridItem>
                            <GridItem>
                                <ChartWarning color="#c2ccd9" />{' '}
                                <SmallText>Rule changes</SmallText>
                            </GridItem>
                        </GridContainer>
                    </Section>
                </Card>
            </Section>
            <Section>
                {highlightTexts.map(
                    (highlightText): React.ReactElement => (
                        <SmallText size="h6" key={highlightText}>
                            <Tick /> {highlightText}
                            <div />
                        </SmallText>
                    ),
                )}
            </Section>
            <Section>
                <Link href="#">
                    <SmallText color="#9966ff" size="h6" bold>
                        {featureFooter}
                    </SmallText>
                </Link>
            </Section>
        </Card>
    </Container>
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

const cardStyles = `
    ${flex('column')}
    box-sizing: border-box;
    padding: 25px 30px;
    max-width: 600px;
    width: 100%;
    height: 100%;
`;
const Section = styled.div`
    margin: 10px 0px 10px 0px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
`;
const GridItem = styled.div`
    text-align: Left;
`;
const Tick = styled(Check)`
    color: #96f;
    width: 15px;
    background: #efe7ff;
    padding: 1px;
    border-radius: 50%;
`;
const ChartDesc = styled(ShowChart)`
    width: 15px;
`;
const ChartWarning = styled(Triangle)`
    width: 15px;
`;
const Link = styled.a`
    text-decoration: none;
`;

const bottomStyles = `
    padding-bottom: 10px;
`;
