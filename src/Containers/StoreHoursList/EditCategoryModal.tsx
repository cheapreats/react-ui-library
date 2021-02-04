import React, { useState } from 'react';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-outline/Add';
import { ICategoryWithHoursTypes } from './types';
import { ErrorModal } from './ErrorModal';
import { createCategoryWithHours } from './CategoryScheduleFunctions';
import { Heading, SmallText } from '../../Text';
import { Modal } from '../Modal/Modal';
import { Input } from '../../Inputs/Input/Input';
import { Button } from '../../Inputs/Button/Button';
import { Tag } from '../Tag/Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

interface EditCategoryProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    thirdModalHeader: string;
    CANNOT_ADD_EMPTY: string;
    CATEGORY_EXISTS: string;
    ALL_CATEGORIES: string;
    ADD_CATEGORIES_SUBTITLE: string;
    CANNOT_DELETE_ACTIVE: string;
    ADD_CATEGORY_BUTTON: string;
    allCategories: ICategoryWithHoursTypes[];
    setAllCategories: React.Dispatch<
        React.SetStateAction<ICategoryWithHoursTypes[]>
    >;
    activeCategory: string;
    isConfirmModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    setDeletedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CATEGORY_INDEX = 0;
const CATEGORY_SCHEDULE = 1;

export const EditCategoryModal: React.FC<EditCategoryProps> = ({
    isVisible,
    thirdModalHeader,
    CANNOT_ADD_EMPTY,
    CATEGORY_EXISTS,
    ALL_CATEGORIES,
    ADD_CATEGORIES_SUBTITLE,
    CANNOT_DELETE_ACTIVE,
    ADD_CATEGORY_BUTTON,
    allCategories,
    setAllCategories,
    activeCategory,
    isConfirmModal,
    setDeletedCategory,
    ...props
}): React.ReactElement => {
    const [input, setInput] = useState('');

    const [confirmModalState, setConfirmModalState] = isConfirmModal;
    const errorModal = useState(false);
    const [errorModalState, setErrorModalState] = errorModal;

    const [error, setError] = useState('');

    const findCategory = (): boolean => {
        const foundCategory = allCategories.find(
            (
                categorySchedule: ICategoryWithHoursTypes,
            ): ICategoryWithHoursTypes | null | boolean =>
                categorySchedule.category === input,
        );
        if (foundCategory) {
            return true;
        }
        return false;
    };
    const errors = {
        empty: input.trim().length === 0 ? CANNOT_ADD_EMPTY : '',
        alreadyExists: findCategory() ? CATEGORY_EXISTS : '',
    };

    return (
        <>
            <StyledModal state={isVisible} {...props}>
                <StyledHeading type="h3">{thirdModalHeader}</StyledHeading>
                <Input
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setInput(e.target.value);
                    }}
                    error={errors.empty || errors.alreadyExists}
                />
                <TextContainer>
                    <StyledHeading type="h6">{ALL_CATEGORIES}</StyledHeading>
                    <SmallText>{ADD_CATEGORIES_SUBTITLE}</SmallText>
                </TextContainer>
                <Container>
                    {Object.entries(allCategories).map(
                        (listAllCategories): React.ReactElement => (
                            <Section
                                as={Tag}
                                key={listAllCategories[CATEGORY_INDEX]}
                                onClick={(): void => {
                                    if (
                                        listAllCategories[CATEGORY_SCHEDULE]
                                            .category === activeCategory
                                    ) {
                                        // prevent deleting active category as it would throw errors
                                        setError(CANNOT_DELETE_ACTIVE);
                                        setErrorModalState(!errorModalState);
                                    } else if (allCategories.length !== 1) {
                                        setDeletedCategory(
                                            listAllCategories[CATEGORY_SCHEDULE]
                                                .category,
                                        );
                                        setConfirmModalState(
                                            !confirmModalState,
                                        );
                                    }
                                }}
                            >
                                {listAllCategories[CATEGORY_SCHEDULE].category}
                            </Section>
                        ),
                    )}
                </Container>
                <CenteredButton
                    icon={Add}
                    onClick={(): void => {
                        const newCategory = createCategoryWithHours(input);
                        setAllCategories([...allCategories, newCategory]);
                    }}
                    disabled={input.trim().length === 0 || findCategory()}
                >
                    {ADD_CATEGORY_BUTTON}
                </CenteredButton>
            </StyledModal>
            <ErrorModal modalState={errorModal} errorMessage={error} />
        </>
    );
};

const Section = styled.div`
    margin: 5px;
`;
const Container = styled.div`
    margin: auto;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
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
const CenteredButton = styled(Button)`
    margin: 10px auto;
`;
const TextContainer = styled.div`
    ${Mixins.flex('center')};
    ${Mixins.flex('column')};
`;
