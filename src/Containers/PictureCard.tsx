import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { flex, position } from '@Utils/Mixins';
import { Card as C } from './Card';

const Card = styled(C)`
    max-width: 300px;
`;

interface TagProps {
    icon: StyledIcon;
    text: string;
}

interface PictureCardProps extends MainInterface, ResponsiveInterface {
    image: string;
    tags: TagProps[];
}

export const PictureCard: React.FC<PictureCardProps> = ({
    children,
    image,
    tags,
    ...cardProps
}): React.ReactElement => {
    return (
        <Card {...cardProps}>
            <ImageWrapper>
                <Image src={image} />
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

const ImageWrapper = styled.div`
    position: relative;
    ${flex('column')}
`;

const Image = styled.img`
    height: auto;
    width: 100%;
`;

const Tags = styled.div`
    ${flex('row', 'flex-start', 'stretch')}
    ${position(
        'absolute',
        '0 0 10px 10px',
        'auto',
        'auto',
        0,
        0,
    )}
    font-size: 0.75rem;
    font-weight: bold;
    color: #3c3c3c;
`;

const Tag = styled.span`
    ${flex('row', 'center')}
    display: inline-flex;
    background-color: white;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
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
