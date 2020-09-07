import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BusinessTime } from '@styled-icons/fa-solid/BusinessTime';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { Add } from '@styled-icons/ionicons-outline/Add';
import { CircleWithCross } from '@styled-icons/entypo/CircleWithCross';
import { sampleCategories, sampleActiveCategorySchedule, CategoryWithHoursTypes, constants, index } from './constants';
import { Alert } from './Alert';
import { SettingsCard } from '../SettingsCard';
import { Modal } from '../Modal';
import { Tag } from '../Tag';
import { Heading, SmallText } from '../../Text';
// eslint-disable-next-line import/no-cycle
import { Button, Checkbox, Select, Timepicker, Input } from '../../Inputs';
import { Mixins } from '../../Utils';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface StoreHoursListProps 
    extends MainInterface, 
        ResponsiveInterface, 
        React.HTMLAttributes<HTMLDivElement> {
            allCategories: CategoryWithHoursTypes[],
            oneCategorySchedule: CategoryWithHoursTypes
};

interface TimeTypes {
    to: Date | string 
    from: Date | string 
};

export const StoreHoursList: React.FC<StoreHoursListProps> = ({
    allCategories = sampleCategories,
    oneCategorySchedule = sampleActiveCategorySchedule
}): React.ReactElement => {
    const editModal = useState(false);
    const [editModalState, setEditModalState] = editModal
    const addModal = useState(false);
    const [addModalState, setAddModalState] = addModal;
    const editCategoryModal = useState(false);
    const [editCategoryModalState, setEditCategoryModalState] = editCategoryModal;

    const initialCheckboxState = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    };
    const [checkboxes, setCheckboxes] = useState(initialCheckboxState);
    
    const [storeHours, setStoreHours] = useState({
        from: new Date(),
        to: new Date()
    });

    const [allCategoriesWithHours, setAllCategoriesWithHours] = useState<CategoryWithHoursTypes []>(allCategories);
    const [input, setInput] = useState('');
    const [activeCategory, setActiveCategory] = useState(allCategoriesWithHours[index.FIRST_CATEGORY].category);
    const [selectActiveCategory, setSelectActiveCategory] = useState(allCategoriesWithHours[index.FIRST_CATEGORY].category);
    const [addStoreHoursCategory, setAddStoreHoursCategory] = useState(allCategoriesWithHours[index.FIRST_CATEGORY].category);
    const [activeCategorySchedule, setActiveCategorySchedule] = useState<CategoryWithHoursTypes>(oneCategorySchedule);

    const [success, setSuccess] = useState(false);
    const [showEmptyError, setShowEmptyError] = useState(false);
    const [cannotDeleteActiveError, setCannotDeleteActiveError] = useState(false);
    const [onlyOneTimeError, setOnlyOneTimeError] = useState(false);

    const [is24, setIs24] = useState(true);
    
    const START_INDEX_OF_SELECTION = 0;
    const START_INDEX_OF_SELECTION_FOR_DATE = -2;
    const END_INDEX_OF_SELECTION_FOR_CONST_D = 2;
    const END_INDEX_OF_SELECTION_DATE_TO_HOURS = -3;
    const FIRST_HALF_OF_A_DAY_IN_HOURS = 12;
    const CHECKED_INITIAL_INDEX = 0; 
    const INITIAL_TIME_INDEX = 0; 
    const INITIAL_DATE_INDEX = 1; 
    const CHECKBOX_DAY = 0;
    const CHECKBOX_TIME = 1;
    const FIRST_TIME = 0;
    const ALL_CATEGORIES_INDEX = 0;
    const ALL_CATEGORIES_TIMES = 1;

    const createCategoryWithHours = (categoryName: string): CategoryWithHoursTypes => {
        const oneCategoryWithHours: CategoryWithHoursTypes = {
            category: categoryName,
            hoursByDay: {
                monday: [], 
                tuesday: [], 
                wednesday: [], 
                thursday: [], 
                friday: [], 
                saturday: [], 
                sunday: [] 
            }
        };
        return oneCategoryWithHours;
    };

    const showSuccess = (content: string): React.ReactElement | null => {
        if (success) {
            return (
                <Alert success text={content} />
            );
        } 
        return null;
    };

    const showError = (): React.ReactElement | null => {
        if (showEmptyError) {
            return (
                <Alert error icon={CircleWithCross} text={constants.ERRORS.ONE_ACTIVE_CATEGORY} />
            );
        } 
        if (cannotDeleteActiveError) {
            return (
                <Alert error icon={CircleWithCross} text={constants.ERRORS.CANNOT_DELETE_ACTIVE_CATEGORY} />
            );
        }
        if (onlyOneTimeError) {
            return (
                <Alert error icon={CircleWithCross} text={constants.ERRORS.ONLY_ONE_TIME} />
            )
        }
        return null;
    };

    const convertTime = (date: string, toggle: boolean): string => {
        if (!toggle) {
            const d = parseInt(
                date.slice(
                    START_INDEX_OF_SELECTION,
                    END_INDEX_OF_SELECTION_FOR_CONST_D,
                ), 10
            );
            date = `${d % FIRST_HALF_OF_A_DAY_IN_HOURS ||
                FIRST_HALF_OF_A_DAY_IN_HOURS}:${date.slice(
                START_INDEX_OF_SELECTION_FOR_DATE,
            )} ${d < FIRST_HALF_OF_A_DAY_IN_HOURS ? 'AM' : 'PM'}`;
        }
        return date;
    };

    const convertDateToHours = (timeObj: TimeTypes): TimeTypes => {
        const parsedToDate = new Date(timeObj.to);
        const to = parsedToDate.toLocaleTimeString('it-IT')
            .slice(START_INDEX_OF_SELECTION, END_INDEX_OF_SELECTION_DATE_TO_HOURS);
        const parsedFromDate = new Date(timeObj.from);
        const from = parsedFromDate.toLocaleTimeString('it-IT')
            .slice(START_INDEX_OF_SELECTION, END_INDEX_OF_SELECTION_DATE_TO_HOURS);
        timeObj = {
            'to': to,
            'from': from
        };
        return timeObj;
    };
    
    const saveHours = (categoryName: string): void => {
        if (Object.values(checkboxes).includes(true)) {
            const timedArray = allCategoriesWithHours.find((categorySchedule: CategoryWithHoursTypes): CategoryWithHoursTypes | null | boolean => categorySchedule.category === categoryName);
            if (timedArray !== undefined) {
                Object.entries(checkboxes).map((checkbox): CategoryWithHoursTypes | null => {
                    if (checkbox[CHECKBOX_TIME] && timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].length >= 1) { // cannot have more than one time per day
                        setOnlyOneTimeError(true);
                    } else if (checkbox[CHECKBOX_TIME] && timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].length === 0) { // add time
                        const convertedTime = convertDateToHours(storeHours);
                        timedArray.hoursByDay[checkbox[CHECKBOX_DAY]].push({
                            from: convertedTime.from,
                            to: convertedTime.to
                        });
                        setCheckboxes(initialCheckboxState);
                        return timedArray;
                    }
                    return null;
                })
            }
        }
    };

    const getActiveSchedule = (categoryName: string): CategoryWithHoursTypes => {
        setActiveCategory(categoryName);
        const activeSchedule = allCategoriesWithHours.find((el): CategoryWithHoursTypes | null | boolean => categoryName === el.category);
        if (activeSchedule) {
            return activeSchedule;
        }
        return activeCategorySchedule;
    };

    useEffect((): void => {
        setActiveCategorySchedule(getActiveSchedule(activeCategory))
    }, [activeCategorySchedule]);

    return (    
        <StoreHoursContainer>
            <SettingsCard heading={constants.TITLES.HEADING} icon={BusinessTime}>
                <ButtonsContainer>
                    <StyledButton
                        icon={Edit}
                        onClick={(): void => {
                            setOnlyOneTimeError(false);
                            setCannotDeleteActiveError(false);
                            setEditModalState(!editModalState);
                        }}
                    >
                        { constants.BUTTONS.EDIT }
                    </StyledButton>
                    <StyledButton onClick={(): void => setIs24(!is24)}> 
                        { constants.BUTTONS.TOGGLE } 
                    </StyledButton>
                </ButtonsContainer>
                <StyledHeading type='h6'>
                    { constants.TITLES.OPERATIONS }
                    { activeCategorySchedule.category }
                </StyledHeading>
                {Object.entries(activeCategorySchedule.hoursByDay).map((day): React.ReactElement | null => {
                    const capitalDay = day[0].replace(/^\w/, (chr: string): string =>
                        chr.toUpperCase(),
                    );
                    return day[CHECKBOX_TIME].length > 0 ? (
                        <StoreHoursContainer>
                            <Heading bold size='0.95em' padding='5'>
                                { capitalDay }
                            </Heading>
                            <StyledTag 
                                key={day[CHECKBOX_DAY]}
                                onClick={(): void => {
                                    const firstTime = activeCategorySchedule.hoursByDay[day[CHECKBOX_DAY]];
                                    firstTime.pop() // only works with one time tag
                                    setActiveCategorySchedule({
                                        ...activeCategorySchedule,
                                        [day[CHECKBOX_DAY]]: []
                                    });
                                }}
                            >
                                { convertTime(day[CHECKBOX_TIME][FIRST_TIME].from, is24) } 
                                {` - `} 
                                { convertTime(day[CHECKBOX_TIME][FIRST_TIME].to, is24) }
                            </StyledTag>
                        </StoreHoursContainer>
                    ) : (
                        <Heading bold size='0.95em' margin='0'>
                            { capitalDay }
                        </Heading>
                    )
                })}
            </SettingsCard>
            <StyledModal state={editModal}>
                <StyledHeading type='h3'> 
                    { constants.TITLES.FIRST_MODAL_HEADER } 
                </StyledHeading>
                <ButtonsContainer>
                    <StyledButton
                        icon={Add}
                        onClick={(): void => {
                            setAddModalState(!addModalState);
                            setOnlyOneTimeError(false);
                            setSuccess(false);
                        }}
                    > 
                        { constants.BUTTONS.ADD_HOURS }
                    </StyledButton>
                    <StyledButton
                        icon={Edit}
                        onClick={(): void => {
                            setEditCategoryModalState(!editCategoryModalState);
                            setSuccess(false);
                            setShowEmptyError(false);
                            setCannotDeleteActiveError(false);
                            setOnlyOneTimeError(false);
                        }}
                    > 
                        { constants.BUTTONS.EDIT_CATEGORIES }
                    </StyledButton>
                </ButtonsContainer>
                { showError() }
                { showSuccess(constants.SUCCESS.CATEGORY_CREATED) }
                <StyledModal state={editCategoryModal}>
                    <StyledHeading type='h3'> 
                        { constants.TITLES.THIRD_MODAL_HEADER }
                    </StyledHeading>
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setInput(e.target.value);
                    }} 
                    /> 
                    <TextContainer>
                        <StyledHeading type='h6'> 
                            { constants.TITLES.ALL_CATEGORIES }
                        </StyledHeading>
                        <SmallText>
                            { constants.TITLES.ALL_CATEGORIES_SUBTITLE }
                        </SmallText>
                    </TextContainer>
                    <TagContainer>
                        {Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
                            return (
                                <StyledTag
                                    key={listAllCategories[0]} 
                                    onClick={(): void => {
                                        if (listAllCategories[1].category === activeCategory) { // prevent deleting active category as it would throw errors
                                            setCannotDeleteActiveError(true);
                                            setEditCategoryModalState(!editCategoryModal);
                                        }
                                        else if (allCategoriesWithHours.length !== 1) { 
                                            setAllCategoriesWithHours(allCategoriesWithHours.filter((el): CategoryWithHoursTypes | null | boolean => el.category !==  listAllCategories[1].category)); 
                                        } else {
                                            setShowEmptyError(true);
                                        }
                                    }}
                                >
                                    { listAllCategories[1].category }
                                </StyledTag>
                            )
                        })}
                    </TagContainer>
                    <CenteredButton 
                        icon={Add} 
                        onClick={(): void => {
                            if(input !== null || input !== undefined || input === '') {
                                const newCategory = createCategoryWithHours(input);
                                setAllCategoriesWithHours([...allCategoriesWithHours, newCategory]);
                                setSuccess(true);
                            }
                            setEditCategoryModalState(!editCategoryModal);
                        }}
                    > 
                        { constants.BUTTONS.ADD_CATEGORY } 
                    </CenteredButton> 
                </StyledModal>
                <StyledSelect
                    label={constants.TITLES.CHANGE_ACTIVE}
                    description={constants.TITLES.CHANGE_ACTIVE_SUBTITLE}
                    placeholder={activeCategory}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setSelectActiveCategory(e.target.value);
                    }}
                    value={selectActiveCategory}
                >
                    {Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
                        return (
                            <option
                                key={listAllCategories[0]} 
                                value={listAllCategories[1].category}
                            >
                                { listAllCategories[1].category}
                            </option>
                        )
                    })}
                </StyledSelect>
                <ButtonsContainer>
                    <StyledButton 
                        onClick={(): void => {
                            setActiveCategorySchedule(getActiveSchedule(selectActiveCategory));
                            setOnlyOneTimeError(false);
                            setCannotDeleteActiveError(false);
                        }}
                    > 
                        { constants.BUTTONS.SET_ACTIVE }
                    </StyledButton>
                </ButtonsContainer>        
            </StyledModal>
            <StyledModal state={addModal}>
                <StyledHeading type='h3'> 
                    { constants.TITLES.SECOND_MODAL_HEADER } 
                </StyledHeading>
                <DaysDiv>
                    <StyledHeading type='h6'> 
                        { constants.TITLES.SELECT_A_DAY } 
                    </StyledHeading>
                    {Object.entries(checkboxes).map((checked): React.ReactElement => {
                        return (
                            <StyledCheckbox
                                key={checked[CHECKED_INITIAL_INDEX]}
                                label={checked[CHECKED_INITIAL_INDEX].replace(
                                    /^\w/,
                                    (char: string): string => char.toUpperCase(),
                                )}
                                onChange={(): void => {
                                    setCheckboxes({
                                        ...checkboxes,
                                        [checked[CHECKED_INITIAL_INDEX]]: !checked[1]
                                    })

                                }}
                            />
                        );
                    })}
                </DaysDiv>
                {Object.entries(storeHours).map((time): React.ReactElement => {
                    return (
                        <Timepicker 
                            key={time[INITIAL_TIME_INDEX]}
                            name={time[INITIAL_TIME_INDEX]}
                            label={time[INITIAL_TIME_INDEX].replace(
                                /^\w/,
                                (char): string => char.toUpperCase()
                            )}
                            value={time[INITIAL_DATE_INDEX]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => 
                                setStoreHours({
                                    ...storeHours,
                                    [time[INITIAL_TIME_INDEX]]: e.target.value
                                })
                            }
                        /> //do a from to check
                    );
                })}
                <StyledHeading type='h6'>
                    { constants.TITLES.SELECT_A_CATEGORY }
                </StyledHeading>
                <StyledSelect
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setAddStoreHoursCategory(e.target.value);
                    }}
                    value={addStoreHoursCategory}
                >
                    {Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
                        return ( 
                            <option
                                key={listAllCategories[ALL_CATEGORIES_INDEX]} 
                                value={listAllCategories[ALL_CATEGORIES_TIMES].category}
                            >
                                { listAllCategories[ALL_CATEGORIES_TIMES].category }
                            </option>
                        );
                    })}
                </StyledSelect>
                <CenteredButton 
                    onClick={(): void => {
                        setAddModalState(!addModalState);
                        saveHours(addStoreHoursCategory);
                        setCannotDeleteActiveError(false);
                    }}
                >
                    { constants.BUTTONS.ADD_HOURS } 
                </CenteredButton> 
            </StyledModal>
        </StoreHoursContainer>
    );
};

const StoreHoursContainer = styled.div`
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
const TextContainer = styled.div`
    ${Mixins.flex('center')};
    ${Mixins.flex('column')};  
`;
const StyledButton = styled(Button)`
    margin: 10px;
`;
const CenteredButton = styled(Button)`
    margin: 10px auto;
`;
const StyledModal = styled(Modal)`
    max-height: 60%;
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
const DaysDiv = styled.div`
    margin: 5px;
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('column')};  
    `,
    )}
`;
const StyledCheckbox = styled(Checkbox)`
    margin: 5px;
`;
const StyledSelect = styled(Select)`
    margin: 5px;
`;
const TagContainer = styled.div`
    margin: auto;
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
`;
const StyledTag = styled(Tag)`
    margin: 5px;
`;