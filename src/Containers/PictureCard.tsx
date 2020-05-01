import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { flex, position } from '@Utils/Mixins';
import { Card as C } from './Card';

interface TagProps {
    icon: StyledIcon;
    text: string;
}

interface PictureCardProps extends MainInterface, ResponsiveInterface {
    image: string;
    tags?: TagProps[];
    alt?: string;
    height?: string;
    width?: string;
    borderradiustop?: string;
    borderradiusbottom?: string;
}

export const PictureCard: React.FC<PictureCardProps> = ({
    children,
    image,
    tags,
    alt,
    height,
    width,
    borderradiustop,
    borderradiusbottom,
    ...cardProps
}): React.ReactElement => {
    return (
        <Card
            width={width}
            height={height}
            borderradiustop={borderradiustop}
            borderradiusbottom={borderradiusbottom}
            {...cardProps}
        >
            <ImageWrapper>
                <Image
                    src={image}
                    alt={alt}
                    height={height}
                    borderradiustop={borderradiustop}
                    borderradiusbottom={borderradiusbottom}
                />
                {tags && (
                    <Tags>
                        {tags.map(
                            ({ icon, text }): React.ReactElement => (
                                <Tag>
                                    {icon && <Icon as={icon} hasText={text} />}
                                    {text}
                                </Tag>
                            ),
                        )}
                    </Tags>
                )}
            </ImageWrapper>
            {children && <Content>{children}</Content>}
        </Card>
    );
};

interface CardProps {
    width?: string;
    height?: string;
    borderradiustop?: string;
    borderradiusbottom?: string;
}

const Card = styled(C)<CardProps>`
    width: ${({ width }) => (width ? width : 'auto')};
    height: ${({ height }) => (height ? height : 'auto')};
    padding: 0px; //overriding styles
    ${({ borderradiustop, borderradiusbottom }): string => `
        border-top-left-radius:     ${borderradiustop};
        border-top-right-radius:    ${borderradiustop};
        border-bottom-left-radius:  ${borderradiusbottom};
        border-bottom-right-radius: ${borderradiusbottom};
    `}
`;

const ImageWrapper = styled.div`
    position: relative;
    ${flex('column')}
`;

const Image = styled.img<CardProps>`
    width: 100%;
    height: ${({ height }) => (height ? height : 'auto')};
    ${({ borderradiustop, borderradiusbottom }): string => `
        border-top-left-radius:     ${borderradiustop};
        border-top-right-radius:    ${borderradiustop};
        border-bottom-left-radius:  ${borderradiusbottom};
        border-bottom-right-radius: ${borderradiusbottom};
`}
`;

const Tags = styled.div`
    ${flex('row', 'flex-start', 'stretch')}
    ${position('absolute', '0 0 10px 10px', 'auto', 'auto', 0, 0)}
    ${({ theme }): string => `
        color:${theme.colors.text};
    `}
    font-size: 0.75rem;
    font-weight: bold;
`;

const Tag = styled.span`
    ${flex('row', 'center')}
    display: inline-flex;
    background-color: white;
    ${({ theme }): string => `
    box-shadow: ${theme.depth[1]};
    `}
    border-radius: 999px;
    padding: 5px 10px;
    margin-right: 8px;
`;

interface Iconprops {
    hasText: string;
}

const Icon = styled.svg<Iconprops>`
    width: 10px;
    height: 10px;
    ${({ hasText }): string => (hasText ? 'margin-right: 5px;' : '')}
`;

const Content = styled.div`
    padding: 8px 12px;
    > * {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;
