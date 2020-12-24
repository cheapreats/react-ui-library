import React from 'react';
import styled from 'styled-components';

export interface ClientProps {
    src: string;
    imgHeight: number;
}

export const ClientImg: React.FC<ClientProps> = ({
    src,
    imgHeight,
}): React.ReactElement => (
    <IconListItem key={src}>
        <IconImg imgHeight={imgHeight} src={src} />
    </IconListItem>
);

const IconListItem = styled.li`
    display: inline-block;
    padding: 2%;
    vertical-align: middle;
    width: auto;
`;

const IconImg = styled.img<ImgProps>`
    height: ${({ imgHeight }): number => imgHeight}px;
    max-width: 100%;
`;

interface ImgProps {
    imgHeight: number;
}
