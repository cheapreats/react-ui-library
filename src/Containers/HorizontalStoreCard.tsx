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

interface HorizontalStoreCardProps extends MainInterface, ResponsiveInterface {
    image: string;
    pictureTags?: TagProps[];
    headerTags?: string[];
    tags?: string[];
    alt?: string;
    height?: string;
    width?: string;
    rating?: string;
    heading?: string;
    description: string;
}

export const HorizontalStoreCard: React.FC<HorizontalStoreCardProps> = ({
    image,
    pictureTags,
    headerTags,
    tags,
    alt,
    height,
    width,
    rating,
    heading,
    description,
    ...cardProps
}): React.ReactElement => {
    return (
        <Card width={width} {...cardProps}>
            <PictureCard
                image={image}
                tags={pictureTags}
                alt={alt}
                width="45%"
                height={height}
                borderRadiusBottom="8px"
                borderRadiusTop="8px"
            />
            <ContentCard>
                <RowContainer>
                    <Paragraph bold>{heading}</Paragraph>
                    <RatingContainer>{rating}</RatingContainer>
                </RowContainer>
                <HeaderTags>{headerTags?.join(' • ')}</HeaderTags>
                <RowContainer>
                    <SmallText bold>{description}</SmallText>
                </RowContainer>
                {tags && (
                    <TagRowContainer>
                        {tags.map(
                            (tag): React.ReactElement => (
                                <Tag>{tag}</Tag>
                            ),
                        )}
                    </TagRowContainer>
                )}
            </ContentCard>
        </Card>
    );
};

interface CardProps {
    width?: string;
    height?: string;
}

const ContentCard = styled(C)`
    box-shadow: none;
    width: 65%;
    display: flex;
    flex-direction: column;
`;

const Card = styled(C)<CardProps>`
    width: ${({ width }): string => width || 'auto'};
    height: ${({ height }): string => height || 'auto'};
    padding: 10px; //override the property
    display: flex;
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

const HeaderTags = styled.div`
    font-size: 0.65em;
    position: relative;
    top: -7px;
    color: #ccc;
    font-weight: bold;
`;

const Tag = styled.div`
    border-radius: 19px;
    border-style: solid;
    border-color: red;
    border-width: 2px;
    text-align: center;
    color: red;
    font-weight: bold;
    font-size: 0.7em;
    min-width: 24px;
    padding: 3px 10px;
`;

const TagRowContainer = styled.div`
    position: relative;
    margin-top: auto;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    top: 10%;
`;
