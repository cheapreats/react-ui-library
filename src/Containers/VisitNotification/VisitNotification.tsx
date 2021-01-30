import { MainInterface } from '@Utils/BaseStyles';
import React from 'react';
import styled from 'styled-components';

export interface IVisitNotificationProps {
    maxWidth?: number;
    imgSrc: string;
    header: React.ReactElement;
    body: React.ReactElement;
    footer: React.ReactElement;
}

interface INotificationContainerProps extends MainInterface,React.HTMLAttributes<HTMLDivElement> {
maxWidth?: number
}

const CONTAINER_HEIGHT = 90;

export const VisitNotification: React.FC<IVisitNotificationProps> = ({
    maxWidth,
    imgSrc,
    header,
    body,
    footer
}): React.ReactElement => (
    <NotificationContainer maxWidth={maxWidth}>
        <Img src={imgSrc} />
        <ContentContainer>
            {header}
            {body}
            {footer}
        </ContentContainer>
    </NotificationContainer>
);

const NotificationContainer = styled.div<INotificationContainerProps>`
    ${({ theme }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    padding: ${theme.dimensions.padding.container};
    `};
    max-width: ${({ maxWidth }) => maxWidth ? `${maxWidth}px` : "fit-content"};
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding-right: 19px;
    border-radius: 80px;
    box-shadow: ${({ theme }): string => theme.depth[1]};
    grid-column-gap: 15px;
    width: 100%;
    height: ${CONTAINER_HEIGHT}px;
    background-color: white;
`;

const ContentContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
`;

const Img = styled.img`
border-radius: 50px;
justify-self: center;
align-self: center;
height: 80px;
width: 80px;
overflow: hidden;
`;
