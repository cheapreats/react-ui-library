import React from 'react';
import styled from 'styled-components';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { Cross } from '@styled-icons/entypo/Cross';
import { Modal } from '../Modal/Modal';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button/Button';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface ConfirmModalProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    confirmDelete: string;
    yesButtonLabel: string;
    noButtonLabel: string;
    onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isVisible,
    confirmDelete,
    yesButtonLabel,
    noButtonLabel,
    onConfirm,
    ...props
}): React.ReactElement => {
    const [confirmModalState, setConfirmModalState] = isVisible;

    return (
        <StyledModal state={isVisible} {...props}>
            <StyledHeading type="h6">{confirmDelete}</StyledHeading>
            <ButtonsContainer>
                <Section as={Button} icon={Check} onClick={()=> onConfirm()}>
                    {yesButtonLabel}
                </Section>
                <Section
                    as={Button}
                    icon={Cross}
                    onClick={(): void => {
                        setConfirmModalState(!confirmModalState);
                    }}
                >
                    {noButtonLabel}
                </Section>
            </ButtonsContainer>
        </StyledModal>
    );
};

const Section = styled.div`
    margin: 5px;
`;
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
`;
const ButtonsContainer = styled.div`
    ${Mixins.flex('center')};
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('column')};  
    `,
    )}
`;
