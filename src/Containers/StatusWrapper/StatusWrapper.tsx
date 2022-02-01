import React from 'react';
import styled from 'styled-components';
import { TextLayout as TL, TextLayoutProps } from '@Layouts/TextLayout';
import { flex } from '@Utils/Mixins';
import { Status, StatusProps, StatusColors } from '../Status/Status';

export interface IStatusWrapperProps
    extends React.HTMLAttributes<HTMLDivElement> {
    statusProps?: StatusProps;
    textProps?: TextLayoutProps;
    /** separation in px between two adjacent elements, status and text */
    separation?: number;
}

/**
 * puts a text next to status with a separation capability
 */
export const StatusWrapper: React.FC<IStatusWrapperProps> = ({
    statusProps = { statusColor: StatusColors.green },
    children,
    textProps = {},
    separation,
    ...props
}) => (
    <StatusWrapperBox {...props}>
        <Status {...statusProps} />
        <TextLayout {...textProps} separation={separation}>
            {children}
        </TextLayout>
    </StatusWrapperBox>
);

const StatusWrapperBox = styled.div`
    ${flex('flex-start', 'center')}
`;

const TextLayout = styled(TL)<{ separation?: number }>`
    ${({ separation }) => `
${separation ? `margin-left:${separation}px` : ''}
`}
`;
