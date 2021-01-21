import React, { useState } from 'react';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-outline/Add';
import { useFormik } from 'formik';
import { ICategoryWithHoursTypes } from './constants';
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
    activeCategory: number;
    isConfirmModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    setDeletedCategory: React.Dispatch<React.SetStateAction<number>>;
}

const CATEGORY_INDEX = 0;
const CATEGORY_SCHEDULE = 1;
interface IErrors {
    [key: string]: string;
}

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
    const validateCreateCategory = (validationValues: {createCategory: string}, categories: ICategoryWithHoursTypes[]) => {
        const errors: IErrors = {};
        const categoryNames = categories.map(({category}) => category)
        const isCategoryDuplicate = categoryNames.find(name => name === validationValues.createCategory);
        if (isCategoryDuplicate) {
            errors.createCategory = CATEGORY_EXISTS
        } else if (!validationValues.createCategory) {
            errors.createCategory = CANNOT_ADD_EMPTY
        }
        return errors
    }
    const {
        values,
        errors: formErrors,
        dirty,
        isValid,
        setErrors,
        handleChange,
    } = useFormik({
        initialValues: {createCategory: ''},
        validate: (validationValues: {createCategory: string} )=> validateCreateCategory(validationValues, allCategories),
        validateOnChange: true,
        onSubmit: ()=>undefined,
        enableReinitialize: true,
    });

    const [confirmModalState, setConfirmModalState] = isConfirmModal;
    const [errorModalState, setErrorModalState] = useState(false);    
    const removeCategory = (index: number) => {
        if (
            index === activeCategory
        ) {
            // prevent deleting active category as it would throw errors
            setErrors({createCategory: CANNOT_DELETE_ACTIVE});
            setErrorModalState(
                !errorModalState,
            );
        } else if (allCategories.length !== 1) {
            setDeletedCategory(index);
            setConfirmModalState(
                !confirmModalState,
            );
        }
    }
    const renderCategories = () => Object.entries(allCategories).map(
        (listAllCategories, index): React.ReactElement => (
            <Section
                as={Tag}
                key={listAllCategories[CATEGORY_INDEX]}
                onClick={(): void => removeCategory(index)}
            >
                {
                    listAllCategories[CATEGORY_SCHEDULE]
                        .category
                }
            </Section>
        ),
    )
        
    return (
        <>
            <StyledModal state={isVisible} {...props}>
                <StyledHeading type="h3">{thirdModalHeader}</StyledHeading>
                <Input
                    name='createCategory'
                    onChange={handleChange}
                    error={formErrors.createCategory}
                    value={values.createCategory}
                />
                <TextContainer>
                    <StyledHeading type="h6">{ALL_CATEGORIES}</StyledHeading>
                    <SmallText>{ADD_CATEGORIES_SUBTITLE}</SmallText>
                </TextContainer>
                <Container>
                    {renderCategories()}
                </Container>
                <CenteredButton
                    icon={Add}
                    onClick={(): void => {
                        const newCategory = createCategoryWithHours(values.createCategory);
                        setAllCategories([...allCategories, newCategory]);
                    }}
                    disabled={!dirty || !isValid}
                >
                    {ADD_CATEGORY_BUTTON}
                </CenteredButton>
            </StyledModal>
            <ErrorModal modalState={[errorModalState, setErrorModalState]} errorMessage={formErrors.createCategory} />
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
