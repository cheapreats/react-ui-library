import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled, { DefaultTheme } from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { Card as C } from './Card';
import {PictureCard} from './PictureCard';
import {Paragraph} from '../Text/Paragraph';
import {SmallText} from '../Text/SmallText';




interface TagProps {
    icon: StyledIcon;
    text: string;
}

interface StoreFeatureCardProps extends MainInterface, ResponsiveInterface {
    image: string;
    tags?: TagProps[];
    theme: DefaultTheme;
    alt?:  string;
    height?: string;
    width?:  string;
    rating?: string;
    heading?: string;
    description:string;
}

export const StoreFeatureCard: React.FC<StoreFeatureCardProps> = ({
    image,
    tags,
    theme,
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
                tags={tags}
                alt={alt}
                width={width}
                height={height}
                borderradiusbottom="0px"
                borderradiustop="8px"
            />
            <ContentCard>
                <RowContainer>
                    <Paragraph bold>
                        {heading}
                    </Paragraph>
                    <RatingContainer>
                        {rating}
                    </RatingContainer>
                </RowContainer>
                <RowContainer>
                    <SmallText bold>
                        {description}
                    </SmallText>
                </RowContainer>
            </ContentCard>
        </Card>
    );
};

interface CardProps{
    width?:string;
    height?:string;
}

const ContentCard = styled(C)<CardProps>`
    border-radius:0px
`;

const Card = styled(C)<CardProps>`
    width: ${({width}) => width ? width : 'auto'};
    height:${({height}) => height ? height : 'auto'};
    padding:0px;
`;

const RatingContainer = styled.div`
    width:10px;
    background-color:pink;
    ${({ theme }): string => `
        color:${theme.colors.primary};
        font-size:${theme.font.size};
    `}
    padding:5px 11px;
    font-weight:bold;
    text-align:center;
    border-radius:50%;
`;

const RowContainer=styled.div`
    display:flex;
    justify-content:space-between;
    padding:0px;
`;