import React from 'react';
import styled from 'styled-components';
import { Check } from '@styled-icons/boxicons-regular/Check';
import { Cross } from '@styled-icons/entypo/Cross';
import { ICategoryWithHoursTypes } from './types';
import { Modal } from '../Modal';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface ConfirmModalProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    confirmDelete: string,
    yesButtonLabel: string,
    noButtonLabel: string,
    allCategories: ICategoryWithHoursTypes[],
    setAllCategories: React.Dispatch<React.SetStateAction<ICategoryWithHoursTypes[]>>
    deletedCategory: string
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isVisible,
    confirmDelete,
    yesButtonLabel,
    noButtonLabel,
    allCategories,
    setAllCategories,
    deletedCategory
}): React.ReactElement => {
    const [confirmModalState, setConfirmModalState] = isVisible;

    const handleClick = (): void => {
        setConfirmModalState(!confirmModalState);
        setAllCategories(allCategories.filter((el): ICategoryWithHoursTypes | null | boolean => el.category !== deletedCategory)); 
    };

    return (
        <StyledModal state={isVisible}>
            <StyledHeading type='h6'>
                { confirmDelete }
            </StyledHeading>
            <ButtonsContainer>
                <Section
                    as={Button}
                    icon={Check}
                    onClick={handleClick}
                >
                    { yesButtonLabel }
                </Section>
                <Section
                    as={Button}
                    icon={Cross}
                    onClick={(): void => {
                        setConfirmModalState(!confirmModalState);
                    }}
                >
                    { noButtonLabel }
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