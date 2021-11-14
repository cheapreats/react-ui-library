import React, { useState, useEffect } from 'react';
import { TextLayout } from '@Layouts';
import { StyledIcon } from '@styled-icons/styled-icon';
import { Container, Icon } from './StyledComponents';

interface IIsFailureIsSuccessPanelProps {
    IconToShow: StyledIcon;
    iconColor: string;
    message: string;
}

export const IsFailureIsSuccessPanel: React.FC<IIsFailureIsSuccessPanelProps> =
    ({ IconToShow, iconColor, message }): React.ReactElement => {
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
