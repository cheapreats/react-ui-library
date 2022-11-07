import React, { useState, useEffect } from 'react';
import { TextLayout } from '@Layouts';
import { StyledIcon } from '@styled-icons/styled-icon';
import { Container, Icon, IContainerProps } from './StyledComponents';

export interface IIsFailureIsSuccessPanelProps extends IContainerProps{
    IconToShow: StyledIcon;
    iconColor: string;
    message: string;
}

export const IsFailureIsSuccessPanel: React.FC<IIsFailureIsSuccessPanelProps> =
    ({ IconToShow, iconColor, message,...props }): React.ReactElement => {
        const [opacity, setOpacity] = useState(0);
        useEffect(() => {
            setOpacity(1);
        }, []);
        return (
            <Container
                withFlexSpaceBetween
                flexGrow
                margin="10px"
                opacity={opacity}
                {...props}
            >
                <TextLayout bold color="DarkBlue">
                    {message}
                </TextLayout>
                <Icon
                    as={IconToShow}
                    color={iconColor}
                    width={35}
                    height={35}
                />
            </Container>
        );
    };
