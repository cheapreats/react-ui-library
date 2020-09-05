import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BusinessTime } from '@styled-icons/fa-solid/BusinessTime';
import { Edit } from '@styled-icons/boxicons-regular/Edit';
import { Add } from '@styled-icons/ionicons-outline/Add';
import { CircleWithCross } from '@styled-icons/entypo/CircleWithCross';
import { Alert } from './Alert';
import { SettingsCard } from '../SettingsCard';
import { Modal } from '../Modal';
import { Tag } from '../Tag';
import { Heading, SmallText } from '../../Text';
// eslint-disable-next-line import/no-cycle
import { 
    Button,
    Checkbox,
    Select,
    Timepicker,
    Input
} from '../../Inputs';
import { Mixins } from '../../Utils';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface StoreHoursListProps 
    extends MainInterface, 
        ResponsiveInterface, 
        React.HTMLAttributes<HTMLDivElement> {
            heading?: string,
            firstModalHeader?: string,
            secondModalHeader?: string,
            secondModalSubtitle?: string,
            secondModalSecondSubtitle?: string
};

interface CategoryWithHoursTypes {
    category: string,
    hoursByDay: {
        monday: { to: string, from: string }[],
        tuesday: { to: string, from: string }[],
        wednesday: { to: string, from: string }[],
        thursday: { to: string, from: string }[],
        friday: { to: string, from: string }[],
        saturday: { to: string, from: string }[],
        sunday: { to: string, from: string }[]
    }
};

interface TimeTypes {
    to: Date | string 
    from: Date | string 
};

export const StoreHoursList: React.FC<StoreHoursListProps> = ({
    heading = 'Hours of Operation Management',
    firstModalHeader = 'Edit Store Hours',
    secondModalHeader = 'Add Store Hours',
    secondModalSubtitle = 'Select a day',
    secondModalSecondSubtitle = 'Select a Category'
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

    const [storeHours, setStoreHours] = useState({
        from: new Date(),
        to: new Date()
    });

    const [checkboxes, setCheckboxes] = useState(initialCheckboxState);

    const [allCategoriesWithHours, setAllCategoriesWithHours] = useState<CategoryWithHoursTypes []>([
        {
            category: 'Winter',
            hoursByDay: {
                monday: [                    
                    {
                        from: '12:00',
                        to: '20:00'
                    }], 
                tuesday: [], 
                wednesday: [], 
                thursday: [
                    {
                        from: '12:00',
                        to: '20:00'
                    }
                ], 
                friday: [], 
                saturday: [], 
                sunday: [] 
            }
        },
        {
            category: 'Summer',
            hoursByDay: {
                monday: [], 
                tuesday: [], 
                wednesday: [], 
                thursday: [], 
                friday: [], 
                saturday: [], 
                sunday: [] 
            }  
        },
        {
            category: 'Holidays',
            hoursByDay: {
                monday: [], 
                tuesday: [], 
                wednesday: [], 
                thursday: [], 
                friday: [], 
                saturday: [], 
                sunday: [] 
            }  
        }
    ]);

    const [input, setInput] = useState('');

    const [success, setSuccess] = useState(false);

    const [activeCategory, setActiveCategory] = useState(allCategoriesWithHours[0].category);

    const [selectActiveCategory, setSelectActiveCategory] = useState(allCategoriesWithHours[0].category);

    const [showEmptyError, setShowEmptyError] = useState(false);

    const [cannotDeleteActiveError, setCannotDeleteActiveError] = useState(false);

    const [onlyOneTimeError, setOnlyOneTimeError] = useState(false);

    const [addStoreHoursCategory, setAddStoreHoursCategory] = useState(allCategoriesWithHours[0].category);

    const [is24, setIs24] = useState(true);
    

    const CHECKED_INITIAL_INDEX = 0;
    const CHECKED_VALUE_AFTER_INITIAL_INDEX = 1;
    const INITIAL_DAY_INDEX = 0;
    const DAY_AFTER_INITIAL_INDEX = 1;
    const INITIAL_TIME_INDEX = 0;
    const START_INDEX_OF_SELECTION = 0;
    const START_INDEX_OF_SELECTION_FOR_DATE = -2;
    const ADDITIONAL_INDEX_OF_SELECTION = 1;
    const END_INDEX_OF_SELECTION_FOR_CONST_D = 2;
    const END_INDEX_OF_SELECTION_DATE_TO_HOURS = -3;
    const FIRST_HALF_OF_A_DAY_IN_HOURS = 12;

    const convert = (date: string, toggle: boolean): string => {
        if (!is24) {
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

    const [activeCategorySchedule, setActiveCategorySchedule] = useState<CategoryWithHoursTypes>({
        category: 'Winter',
        hoursByDay: {
            monday: [                    
                {
                    from: '12:00',
                    to: '20:00'
                }],
            tuesday: [], 
            wednesday: [], 
            thursday: [
                {
                    from: '12:00',
                    to: '20:00'
                }
            ], 
            friday: [], 
            saturday: [], 
            sunday: [] 
        }
    });

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
    }

    const showSuccess = (content: string): React.ReactElement | null => {
        if (success) {
            return (
                <Alert success text={content} />
            );
        } 
        return null;
    }

    const showError = (): React.ReactElement | null => {
        if (showEmptyError) {
            return (
                <Alert error icon={CircleWithCross} text='You must have at least one category at all times.' />
            );
        } 
        if (cannotDeleteActiveError) {
            return (
                <Alert error icon={CircleWithCross} text='You cannot delete an active category.' />
            );
        }
        if (onlyOneTimeError) {
            return (
                <Alert error icon={CircleWithCross} text='You cannot add more than one time per day.' />
            )
        }
        return null;
    }

    const convertDateToHours = (timeObject: TimeTypes): TimeTypes => {
        let timeClone: TimeTypes = Object.assign({}, timeObject);
        const parsedDate = new Date(timeClone.to);
        const to = parsedDate.toLocaleTimeString('it-IT')
            .slice(START_INDEX_OF_SELECTION, END_INDEX_OF_SELECTION_DATE_TO_HOURS);
        const parsedFromDate = new Date(timeClone.from);
        const from = parsedFromDate.toLocaleTimeString('it-IT')
            .slice(START_INDEX_OF_SELECTION, END_INDEX_OF_SELECTION_DATE_TO_HOURS);
        timeClone = {
            'to': to,
            'from': from
        }
        return timeClone;
    };
    
    const saveHours = (categoryName: string): void => {
        if (Object.values(checkboxes).includes(true)) {
            const timedArray = allCategoriesWithHours.find((el: CategoryWithHoursTypes): CategoryWithHoursTypes | null | boolean => el.category === categoryName);
            if (timedArray !== undefined) {
                Object.entries(checkboxes).map((el): CategoryWithHoursTypes | null | void  => {
                    if (el[1]) {
                        const convertedTime = convertDateToHours(storeHours)
                        timedArray.hoursByDay[el[0]].push({
                            from: convertedTime.from,
                            to: convertedTime.to
                        })
                        setCheckboxes(initialCheckboxState);
                        return timedArray;
                    }
                    return null;
                })
            }
        }
    };

    const getActiveSchedule = (categoryName: string): CategoryWithHoursTypes => {
        setActiveCategory(categoryName)
        const activeSchedule = allCategoriesWithHours.find((el): CategoryWithHoursTypes | null | boolean => categoryName === el.category);

        if (activeSchedule) {
            return activeSchedule;
        }
        return activeCategorySchedule;
    }

    useEffect((): void => {
        setActiveCategorySchedule(getActiveSchedule(activeCategory))
    }, [activeCategorySchedule])

    // const CHECKED_INITIAL_INDEX = 0; // for days of week
    // const INITIAL_TIME_INDEX = 0; // for from/to
    const INITIAL_DATE_INDEX = 1; // date
    const TEXT = 'Current Hours of Operations for ';

    return (    
        <StoreHoursContainer>
            <SettingsCard heading={heading} icon={BusinessTime}>
                <ButtonsContainer>
                    <StyledButton
                        icon={Edit}
                        onClick={(): void => {
                            setOnlyOneTimeError(false)
                            setEditModalState(!editModalState)
                        }}
                    >
                        {' '}
                        Edit 
                    </StyledButton>
                    <StyledButton onClick={(): void => setIs24(!is24)}> Toggle AM/PM </StyledButton>
                </ButtonsContainer>
                <StyledHeading type='h6'>
                    { TEXT }
                    { activeCategorySchedule.category }
                </StyledHeading>
                {
                    Object.entries(activeCategorySchedule.hoursByDay).map((day): React.ReactElement | null => {
                        const capitalDay = day[0].replace(/^\w/, (chr: string): string =>
                            chr.toUpperCase(),
                        );
                        return day[1].length > 0 ? (
                            <div>
                                <Heading bold size='0.95em' margin='0'>
                                    { capitalDay }
                                </Heading>
                                <StyledTag 
                                    key={day[0]}
                                    onClick={(): void => {
                                        const arr = activeCategorySchedule.hoursByDay[day[0]];
                                        arr.pop() // only works with one time tag
                                        setActiveCategorySchedule({
                                            ...activeCategorySchedule,
                                            [day[0]]: []
                                        });
                                    }}
                                >
                                    { convert(day[1][0].from, is24) } 
                                    {` - `} 
                                    { convert(day[1][0].to, is24) }
                                </StyledTag>
                            </div>
                        ) : (
                            <Heading bold size='0.95em' margin='0'>
                                { capitalDay }
                            </Heading>
                        )
                    })
                }
            </SettingsCard>
            <StyledModal state={editModal}>
                <StyledHeading type='h3'> 
                    { firstModalHeader } 
                </StyledHeading>
                <ButtonsContainer>
                    <StyledButton
                        icon={Add}
                        onClick={(): void => {
                            setAddModalState(!addModalState)

                            setOnlyOneTimeError(false)
                        }}
                    > 
                        Add Hours 
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
                        Edit Categories 
                    </StyledButton>
                </ButtonsContainer>
                { showError() }
                <StyledModal state={editCategoryModal}>
                    <StyledHeading type='h3'> 
                        Add Categories 
                    </StyledHeading>
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setInput(e.target.value);
                    }} 
                    /> 
                    <TextContainer>
                        <StyledHeading type='h6'> 
                            Current Categories
                        </StyledHeading>
                        <SmallText>
                            Hover over and click the categories to delete them.
                        </SmallText>
                    </TextContainer>
                    <TagContainer>
                        {
                            Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
                                return (
                                    <StyledTag
                                        key={`delete-${listAllCategories[0]}`} 
                                        onClick={(): void => {
                                            if (listAllCategories[1].category === activeCategory) { // prevent deleting active category as it would throw many errors
                                                setCannotDeleteActiveError(true);
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
                            })
                        }
                    </TagContainer>
                    { showSuccess('Category has been sucessfully created.') }
                    { showError() }
                    <CenteredButton 
                        icon={Add} 
                        onClick={(): void => {
                            if(input !== null || input !== undefined || input === '') {
                                const newCategory = createCategoryWithHours(input);
                                setAllCategoriesWithHours([...allCategoriesWithHours, newCategory]);
                                setSuccess(true);
                            }
                        }}
                    > 
                        Add Category 
                    </CenteredButton> 
                </StyledModal>
                <TextContainer>
                    <StyledHeading type='h6'> 
                        Current Active Category
                    </StyledHeading>
                    <SmallText>
                        { activeCategory }
                    </SmallText>
                </TextContainer>
                <StyledSelect
                    label='Change the active category'
                    description='This will be the category of times shown to the customers'
                    placeholder={activeCategory}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setSelectActiveCategory(e.target.value);
                    }}
                    value={selectActiveCategory}
                >
                    {
                        Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
                            return (
                                <option
                                    key={`active-${listAllCategories[0]}`} 
                                    value={listAllCategories[1].category}
                                >
                                    { listAllCategories[1].category}
                                </option>
                            )
                        }) 
                    }
                </StyledSelect>
                <ButtonsContainer>
                    <StyledButton 
                        onClick={(): void => {
                            setActiveCategorySchedule(getActiveSchedule(selectActiveCategory))
                            setOnlyOneTimeError(false)
                        }}
                    > 
                        Set as Active
                    </StyledButton>
                </ButtonsContainer>        
            </StyledModal>
            <StyledModal state={addModal}>
                <StyledHeading type='h3'> 
                    { secondModalHeader } 
                </StyledHeading>
                <DaysDiv>
                    <StyledHeading type='h6'> 
                        { secondModalSubtitle } 
                    </StyledHeading>
                    {
                        Object.entries(checkboxes).map((checked): React.ReactElement => {
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
                        })
                    }
                </DaysDiv>
                {
                    Object.entries(storeHours).map((time): React.ReactElement => {
                        return (
                            <Timepicker 
                                key={`add-hours-${time[INITIAL_TIME_INDEX]}`}
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
                    }) 
                }
                <StyledHeading type='h6'>
                    { secondModalSecondSubtitle }
                </StyledHeading>
                <StyledSelect
                    placeholder='Choose a time category'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setAddStoreHoursCategory(e.target.value);
                    }}
                    value={addStoreHoursCategory}
                >
                    {
                        Object.entries(allCategoriesWithHours).map((listAllCategories): React.ReactElement => {
                            return ( 
                                <option
                                    key={listAllCategories[0]} 
                                    value={listAllCategories[1].category}
                                >
                                    { listAllCategories[1].category }
                                </option>
                            );
                        }) 
                    }
                </StyledSelect>
                <CenteredButton 
                    onClick={(): void => {
                        setAddModalState(!addModalState)
                        const arr = getActiveSchedule(addStoreHoursCategory)
                        const func = (): string[] => {
                            const array: string [] = [];
                            Object.entries(checkboxes).forEach((el): void => {
                                if (el[1]) {
                                    array.push(el[0])
                                }
                            })
                            return array
                        }
                        func().forEach((el): void => {
                            if (arr.hoursByDay[el].length >= 1) {
                                setCheckboxes(initialCheckboxState)
                                setOnlyOneTimeError(true)
                            } else {
                                saveHours(addStoreHoursCategory)
                            }
                        })
                    }}

                >
                    Add Hours 
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
const Hours = styled.div`
    margin: 0 0 15px;
`;
