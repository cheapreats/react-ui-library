import React, {useState} from 'react';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-outline/Add';
import { useFormik } from 'formik';
import { ConfirmModal } from '@Containers/StoreHoursList/ConfirmModal';
import { ErrorModal } from '@Containers/StoreHoursList/ErrorModal';
import { deepCopy } from '@Utils/deepCopy';
import { useMounted } from '@Utils/Hooks/useMounted';
import { createCategoryWithHours, validateCreateCategory, CATEGORY_FIELD } from './constants';
import { ICategoryWithHoursTypes } from './interfaces';
import { Heading, SmallText } from '../../Text';
import { Modal } from '../Modal/Modal';
import { Input } from '../../Inputs/Input/Input';
import { Button } from '../../Inputs/Button/Button';
import { Tag } from '../Tag/Tag';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

const DELETE_SINGLE_CATEGORY = 1;

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
    yesButtonLabel: string;
    noButtonLabel: string;
    allCategories: ICategoryWithHoursTypes[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
    activeCategory: number;
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
    setFieldValue,
    setActiveCategory,
    activeCategory,
    yesButtonLabel,
    noButtonLabel,
    ...props
}): React.ReactElement => {
    const isMounted = useMounted();
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [errorModalState, setErrorModalState] = useState(false);
    const [deletedCategory, setDeletedCategory] = useState(0);
    const {
        values,
        errors: formErrors,
        dirty,
        isValid,
        handleChange,
    } = useFormik({
        initialValues: {createCategory: ''},
        validate: (validationValues: {createCategory: string} )=> validateCreateCategory(validationValues, allCategories, CATEGORY_EXISTS, CANNOT_ADD_EMPTY),
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: ()=>undefined,
        enableReinitialize: true,
    }); 

    const removeCategory = (index: number) => {
        if (
            index === activeCategory
        ) {
            // prevent deleting active category as it would throw errors
            setErrorModalState(true)
        } else if (allCategories.length !== 1) {
            setDeletedCategory(index);
            setConfirmModalState(
                !confirmModalState,
            );
        }
    }

    const handleDeleteCategory = (): void => {
        // get category name to find new index;
        const activeCategoryName = allCategories[activeCategory].name;
        const categoriesCopy = deepCopy(allCategories);
        // remove category to delete
        categoriesCopy.splice(deletedCategory, DELETE_SINGLE_CATEGORY)
        // find new index of active category by categoryName
        const activeCategoryIndexAfterDelete = categoriesCopy.findIndex(categoryWithHours => categoryWithHours.name === activeCategoryName);
        if (isMounted.current) {
            setActiveCategory(activeCategoryIndexAfterDelete);
            setFieldValue(CATEGORY_FIELD, categoriesCopy);
        }
    };

    const handleCreateCategory = (): void => {
        const newCategory = createCategoryWithHours(values.createCategory);
        setFieldValue(CATEGORY_FIELD, [...allCategories, newCategory]);
    };

    const renderCategories = () => allCategories.map(
        ({name}, index): React.ReactElement => (
            <Section
                as={Tag}
                onClick={(): void => removeCategory(index)}
            >
                {
                    name
                }
            </Section>
        ),
    );

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
                    onClick={() => handleCreateCategory()}
                    disabled={!dirty || !isValid}
                >
                    {ADD_CATEGORY_BUTTON}
                </CenteredButton>
            </StyledModal>
            <ConfirmModal confirmDelete='Are you sure you want to delete this category' yesButtonLabel={yesButtonLabel} noButtonLabel={noButtonLabel} isVisible={[confirmModalState, setConfirmModalState]} onConfirm={()=> handleDeleteCategory()} />
            <ErrorModal modalState={[errorModalState, setErrorModalState]} errorMessage={CANNOT_DELETE_ACTIVE} />
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
