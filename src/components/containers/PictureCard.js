import React from 'react';
import styled from 'styled-components';
import { Card as C } from './Card';
import { flex, position } from '../mixins';

const Card = styled(C)`
    ${ ({ maxWidth }) => maxWidth ? `max-width: ${ maxWidth }px;` : '' }
`;

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
    ${ ({ hasText }) => hasText ? 'margin-right: 5px;' : '' }
`;

const Content = styled.div`
    padding: 8px 12px;
    > * {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

export const PictureCard = ({
    children,
    image,
    tags,
    ...cardProps
}) => {
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

PictureCard.defaultProps = {
    padding: 0,
    radius: 12,
    maxWidth: 300,
    tags: []
}