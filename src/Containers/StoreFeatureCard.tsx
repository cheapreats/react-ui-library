import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { Card as C } from './Card';
import { PictureCard } from './PictureCard';
import { Paragraph } from '../Text/Paragraph';
import { SmallText } from '../Text/SmallText';

interface TagProps {
    icon: StyledIcon;
    text: string;
}

interface StoreFeatureCardProps extends MainInterface, ResponsiveInterface {
    image: string;
    tags?: TagProps[];
    alt?: string;
    height?: string;
    width?: string;
    rating?: string;
    heading?: string;
    description: string;
    linktitle?: string;
}

export const StoreFeatureCard: React.FC<StoreFeatureCardProps> = ({
    image,
    tags,
    alt,
    height,
    width,
    rating,
    heading,
    description,
    linktitle,
    ...cardProps
}): React.ReactElement => {
    return (
        <Card width={width} {...cardProps}>
            <PictureCard
                image={image}
                tags={tags}
                alt={alt}
                width={width}
                height={height}
                borderRadiusBottom="0px"
                borderRadiusTop="8px"
            />
            <ContentCard linktitle={linktitle}>
                <RowContainer>
                    <Paragraph bold>{heading}</Paragraph>
                    <RatingContainer>{rating}</RatingContainer>
                </RowContainer>
                <RowContainer>
                    <SmallText bold>{description}</SmallText>
                </RowContainer>
            </ContentCard>
            {linktitle && <LinkCard>{linktitle}</LinkCard>}
        </Card>
    );
};

interface CardProps {
    width?: string;
    height?: string;
    linktitle?: string;
}

const ContentCard = styled(C)<CardProps>`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: ${({ linktitle }) =>
        linktitle ? '0px' : '8px'};
    border-bottom-right-radius: ${({ linktitle }) =>
        linktitle ? '0px' : '8px'};
`;

const LinkCard = styled(C)<CardProps>`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    text-align: center;
    color: #b3aeae;
    font-weight: bold;
    cursor: pointer;
`;

const Card = styled(C)<CardProps>`
    width: ${({ width }) => (width ? width : 'auto')};
    height: ${({ height }) => (height ? height : 'auto')};
    padding: 0px;
`;

const RatingContainer = styled.div`
    width: 10px;
    background-color: pink;
    ${({ theme }): string => `
        color:${theme.colors.primary};
        font-size:${theme.font.size};
    `}
    padding:5px 11px;
    font-weight: bold;
    text-align: center;
    border-radius: 50%;
`;

const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
