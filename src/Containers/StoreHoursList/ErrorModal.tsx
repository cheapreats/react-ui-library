import React from 'react';
import styled from 'styled-components';
import { CircleWithCross } from '@styled-icons/entypo/CircleWithCross';
import { Modal } from '../Modal/Modal';
import { Heading } from '../../Text';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface ErrorModalProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    errorMessage?: string;
    icon?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
    modalState,
    errorMessage,
    icon = CircleWithCross,
    children,
    ...props
}): React.ReactElement => {
    const [, setErrorModalState] = modalState;
    return (
        <StyledModal state={modalState} {...props}>
            <StyledHeading type="h6" onClick={() => setErrorModalState(false)}>
                <Icon as={icon} />
                {errorMessage}
            </StyledHeading>
            {children}
        </StyledModal>
    );
};

const StyledModal = styled(Modal)`
    max-height: 70%;
    margin: auto;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
`;
const StyledHeading = styled(Heading)`
    font-weight: bold;
    flex-wrap: wrap;
    text-align: center;
    margin: 10px;
    cursor: pointer;
`;

const Icon = styled.svg`
    width: 30px;
    flex-shrink: 0;
    margin: 5px 12px;
    cursor: pointer;
`;
