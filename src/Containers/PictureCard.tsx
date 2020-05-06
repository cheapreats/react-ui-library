import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { flex, position } from '@Utils/Mixins';
import { Card as C } from './Card';
import { Tag as T } from './Tag';

interface TagProps {
    icon: StyledIcon;
    text: string;
}

interface PictureCardProps
    extends MainInterface,
        ResponsiveInterface,
        CardProps {
    image: string;
    tags?: TagProps[];
    alt?: string;
    height?: string;
    width?: string;
    borderRadiusTop?: string;
    borderRadiusBottom?: string;
}

export const PictureCard: React.FC<PictureCardProps> = ({
    children,
    image,
    tags,
    alt,
    height,
    width,
    borderRadiusTop,
    borderRadiusBottom,
    ...cardProps
}): React.ReactElement => {
    return (
        <Card
            width={width}
            height={height}
            borderRadiusTop={borderRadiusTop}
            borderRadiusBottom={borderRadiusBottom}
            {...cardProps}
        >
            <ImageWrapper>
                <Image
                    src={image}
                    alt={alt}
                    height={height}
                    borderRadiusTop={borderRadiusTop}
                    borderRadiusBottom={borderRadiusBottom}
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
    borderRadiusTop?: string;
    borderRadiusBottom?: string;
}

const Card = styled(C)<CardProps>`
    width: ${({ width }): string => width || 'auto'};
    height: ${({ height }): string => height || 'auto'};
    padding: 0px; //overriding styles
    ${({ borderRadiusTop, borderRadiusBottom }): string => `
        border-top-left-radius: ${borderRadiusTop || '0px'} ;
        border-top-right-radius:${borderRadiusTop || '0px'} ;
        border-bottom-left-radius: ${borderRadiusBottom || '0px'} ;
        border-bottom-right-radius: ${borderRadiusBottom || '0px'} ;
`}
`;

const ImageWrapper = styled.div`
    position: relative;
    ${flex('column')}
`;

const Image = styled.img<CardProps>`
    width: 100%;
    height: ${({ height }): string => height || 'auto'};
    ${({ borderRadiusTop, borderRadiusBottom }): string => `
        border-top-left-radius: ${borderRadiusTop || '0px'} ;
        border-top-right-radius:${borderRadiusTop || '0px'} ;
        border-bottom-left-radius: ${borderRadiusBottom || '0px'} ;
        border-bottom-right-radius: ${borderRadiusBottom || '0px'} ;
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

const Tag = styled(T)`
    background-color: white;
    color: black;
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
