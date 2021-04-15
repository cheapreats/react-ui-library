import React from 'react';
import { SmallText } from '@Text';
import styled from 'styled-components';
import { flex, media } from '@Utils/Mixins';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { ShowChart } from '@styled-icons/material/ShowChart';
import { Card } from '../Card/Card';

export interface IFeatureDisplayProps {
    featureTitle: string;
    featureSubTitle: string;
    featureImage: string;
    imageTitle: string;
    imageTags: string[];
    imageTagColors: string[];
    highlightTexts: string[];
    featureFooter: string;
    linkHref?: string;
}

export const FeatureDisplay: React.FC<IFeatureDisplayProps> = ({
    featureTitle,
    featureSubTitle,
    featureImage,
    imageTitle,
    imageTags,
    imageTagColors,
    highlightTexts,
    featureFooter,
    linkHref,
}) => {
    /**
     * Returns a JSX element array containing the highlightText
     */
    const getHighlightText = () =>
        highlightTexts.map((highlightText: string) => (
            <SmallText size="h7" key={highlightText}>
                <Tick /> 
                {' '}
                {highlightText}
                <div />
            </SmallText>
        ));
    /**
     * Returns a JSX element array containing the imageTag and corresponding iconColor
     */
    const getImageTags = () =>
        imageTags.map((imageTag: string, index: number) => (
            <GridItem key={imageTag}>
                <ChartDesc color={imageTagColors[index]} />
                {' '}
                <SmallText>{imageTag}</SmallText>
            </GridItem>
        ));

    return (
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
                    <SmallText type="div" size="h6" lineHeight="false">
                        {featureSubTitle}
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
                            {imageTitle}
                        </SmallText>
                        <img src={featureImage} alt={featureTitle} />
                        <Section>
                            <Grid>{getImageTags()}</Grid>
                        </Section>
                    </Card>
                </Section>
                <Section>{getHighlightText()}</Section>
                <Section>
                    <Link href={linkHref}>
                        <SmallText color="#9966ff" size="h7" bold>
                            {featureFooter}
                        </SmallText>
                    </Link>
                </Section>
            </Card>
        </Container>
    );
};

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

const Grid = styled.div`
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

const Link = styled.a`
    text-decoration: none;
`;

const bottomStyles = `
    padding-bottom: 10px;
`;
