
import React from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { Card as C } from './Card';
import { flex, position } from '@Utils/Mixins';

const Card = styled(C)`
    ${ ({ maxWidth }):any => maxWidth ? `max-width: ${ maxWidth }px;` : '' }
`;


interface PictureCardProps extends MainInterface, ResponsiveInterface {
    image: any;
    tags: any;
    icon:StyledIcon;
}

export const PictureCard: React.FC<PictureCardProps> = ({
    children,
    image,
    tags,
    ...cardProps,
}): React.ReactElement => {
    return (
        <Card { ...cardProps }>
            <ImageWrapper>
                <Image src={ image }/>
                {
                    tags.length ? <Tags>
                        {
                            tags.map(({ icon, text }, key) => (
                                <Tag key={ key }>
                                    { icon && <Icon as={ icon } hasText={ text }/> }
                                    { text }
                                </Tag>
                            ))
                        }
                    </Tags> : null
                }
            </ImageWrapper>
            { !children ? null : (
                <Content>
                    { children }
                </Content>
            ) }
        </Card>
    );
};


const ImageWrapper = styled.div`
    position: relative;
    ${ flex('column') }
`;

const Image = styled.img`
    height: auto;
    width: 100%;
`;

const Tags = styled.div`
    ${ flex('row', 'flex-start', 'stretch') }
    ${ position('absolute', '0 0 10px 10px', 'auto', 'auto', 0, 0) }
    font-size: 0.75rem;
    font-weight: bold;
    color: #3c3c3c;
`;

const Tag = styled.span`
    ${ flex('row', 'center') }
    display: inline-flex;
    background-color: white;
    box-shadow: 0 0 3px rgba(0,0,0,0.3);
    border-radius: 999px;
    padding: 5px 10px;
    margin-right: 8px;
`;

const Icon = styled.svg`
    width: 10px;
    height: 10px;
    ${ ({ hasText }):any => hasText ? 'margin-right: 5px;' : '' }
`;

const Content = styled.div`
    padding: 8px 12px;
    > * {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;