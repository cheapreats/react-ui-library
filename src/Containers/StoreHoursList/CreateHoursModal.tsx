import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import  moment  from 'moment';
import { useFormik } from 'formik';
import { MergeModal } from './MergeModal';
import { ICategoryWithHoursTypes, InitialCheckboxState, IToFromHours, DAYS_OF_THE_WEEK, upperCaseFirstLetter, IHoursByDay, MergeActions, IMergeDays } from './constants';
import { FromToDualTimeSelector } from './FromToDualTimeSelector';
import { Modal } from '../Modal/Modal';
import { Heading } from '../../Text';
import { Button } from '../../Inputs/Button/Button';
import { Checkbox } from '../../Inputs/CheckBox/Checkbox';
import { Select } from '../../Inputs/Select/Select';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { Mixins } from '../../Utils';

const NO_MERGED_HOURS = 0;
const NO_UNMERGED_HOURS = 0;

interface CreateHoursProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    MODAL_HEADER: string;
    SELECT_A_DAY_TITLE: string;
    SELECT_A_CATEGORY: string;
    ADD_HOURS_BUTTON: string;
    allCategories: ICategoryWithHoursTypes[];
    activeCategory: number;
    handleStoreHoursUpdate: (updateHoursByDay: IHoursByDay, index: number) => void;
}

export interface ICreateHoursInitalState {
    checkboxes : InitialCheckboxState,
    storeHours: IToFromHours
}

const initialMergeState = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
}

const initialState: ICreateHoursInitalState = {
    checkboxes: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    },
    storeHours: {
        from: moment().format('HH:mm'),
        to: moment().format('HH:mm'),
    }
};

export const CreateHoursModal: React.FC<CreateHoursProps> = ({
    isVisible,
    MODAL_HEADER,
    SELECT_A_DAY_TITLE,
    SELECT_A_CATEGORY,
    ADD_HOURS_BUTTON,
    allCategories,
    activeCategory,
    handleStoreHoursUpdate,
    ...props
}): React.ReactElement => {
    const [addModalState, setAddModalState] = isVisible;
    const [mergeModalState, setMergeModalState] = useState(false);
    const [addStoreHoursCategory, setAddStoreHoursCategory] = useState(activeCategory);
    const [mergedHours, setMergeHours] = useState(initialMergeState);
    const [overWrittenHours, setOverWrittenHours] = useState(initialMergeState);
    const [unmergedHours, setUnmergedHours] = useState(initialMergeState)
    const {
        values,
        dirty,
        isValid,
        handleChange,
        setFieldValue
    } = useFormik({
        initialValues: initialState,
        onSubmit: ()=> undefined,
        enableReinitialize: true,
    });

    useEffect(() => {
        setAddStoreHoursCategory(activeCategory)
    }, [activeCategory]);

    /**
     * Checks if there is more than one time in a day given a category name
     * @param {number} activeCategoryIndex - Name of category that needs hours to be saved
     * @returns {IHoursByDay} - Returns the merged hours
     */
    const mergeOrAddTime = () => {
        const category = allCategories[addStoreHoursCategory]
        let merged = false;
        // unMerged Hours are hours without conflict and always kept
        const unMergedHoursByDay = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        }

        // overWritten Hours are hours that would be lost on merge
        const overWrittenHoursByDay = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        }

        // merged Hours are house that will replace overwritten hours
        // they are the union of overWritten Hours and Store Hours
        const mergedHoursByDay = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        }

        DAYS_OF_THE_WEEK.map(day => {
            const hoursForDayOfWeek: IToFromHours[] = category.hoursByDay[day];
            const storeHoursToMerge = {...values.storeHours};
            // check if current day is selected to update store hours
            if (values.checkboxes[day]) {
                if(hoursForDayOfWeek.length > 0) {
                    // check all for each day of the week updating overwritten hours and creating a mergedStoreHours
                    hoursForDayOfWeek.map(hours => {
                        // Calculate if to (end time) of new hours falls between current hours
                        if(moment(storeHoursToMerge.to, 'HH:mm').isAfter(moment(hours.from, 'HH:mm'), 'minutes')  && moment(storeHoursToMerge.to, 'HH:mm').isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                            merged = true;
                            // set new end time to be the current hours end time since it falls after
                            storeHoursToMerge.to = hours.to
                            // check if from (beginning time) is after current from
                            if (moment(storeHoursToMerge.from).isAfter(moment(hours.from,'HH:mm'), 'minutes')) {
                                // sets new beginning time to current beginning since new falls after
                                storeHoursToMerge.from = hours.from
                            }
                            // copy hours overwritten
                            overWrittenHoursByDay[day].push(hours);                            
                            // Calculate if from (beginning time) of new hours falls between current hours
                        } else  if (moment(storeHoursToMerge.from, 'HH:mm').isAfter(moment(hours.from, 'HH:mm'), 'minutes')  && moment(storeHoursToMerge.from, 'HH:mm').isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                            merged = true;
                            // set new beginning time to be the current hours end time since it falls before
                            storeHoursToMerge.from = hours.from
                            // check if to (end time) is before current to
                            if (moment(storeHoursToMerge.to).isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                                // sets new end time to current beginning since new falls before
                                storeHoursToMerge.to = hours.to
                            }
                            // copy hours overwritten
                            overWrittenHoursByDay[day].push(hours);
                            // Check if new hours enclose current times. The from is before the current from and the to is after the current to
                        } else  if (moment(storeHoursToMerge.from, 'HH:mm').isBefore(moment(hours.from, 'HH:mm'), 'minutes')  && moment(storeHoursToMerge.to, 'HH:mm').isAfter(moment(hours.to, 'HH:mm'), 'minutes')) {
                            merged = true;
                            // copy hours overwritten
                            overWrittenHoursByDay[day].push(hours);
                        } else {
                            // if no conditions are met push current hours to the unMergedHoursByDay to be kept
                            unMergedHoursByDay[day].push(hours)
                        }
                    })
                    // Add the merged storeHours to the mergedHours object
                    mergedHoursByDay[day].push(storeHoursToMerge)
                } else {
                    unMergedHoursByDay[day].push(storeHoursToMerge);
                }
            } else {
                // set unmerged hours for day to be equal to current
                unMergedHoursByDay[day] = hoursForDayOfWeek
            }
        });
        if (merged) {
            setMergeHours(mergedHoursByDay);
            setOverWrittenHours(overWrittenHoursByDay);
            setUnmergedHours(unMergedHoursByDay);
            setMergeModalState(true);
        } else {
            const updateStoreHours = {...unMergedHoursByDay}
            DAYS_OF_THE_WEEK.map(day => {
                if (mergedHoursByDay[day].length > NO_MERGED_HOURS) {
                    updateStoreHours[day].push(...mergedHoursByDay[day])
                }})
            handleStoreHoursUpdate(updateStoreHours, addStoreHoursCategory);
            setAddModalState(false);
        }
    };

    const confirmMerge = (merge: IMergeDays) => {
        const confirmedHours = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        };
        DAYS_OF_THE_WEEK.map(day => 
        {
            if(unmergedHours[day].length > NO_UNMERGED_HOURS) {
                confirmedHours[day].push(...unmergedHours[day])
            }
            if (mergedHours[day].length > NO_MERGED_HOURS) {
                switch (merge[day]) {
                case MergeActions.MERGE:
                    confirmedHours[day].push(...mergedHours[day])                
                    break;
                case MergeActions.REPLACE:
                    confirmedHours[day].push(values.storeHours)
                    break;          
                case MergeActions.KEEP:
                    confirmedHours[day].push(...overWrittenHours[day])
                    break;
                default:
                    break;
                }
            }
        })
        handleStoreHoursUpdate(confirmedHours, addStoreHoursCategory);
        setMergeModalState(false);
    }

    const setStoreHours = (hours: IToFromHours) => {
        setFieldValue('storeHours', hours)
    }

    return (
        <>
            <StyledModal state={[addModalState, setAddModalState]} {...props}>
                <StyledHeading type="h3">{MODAL_HEADER}</StyledHeading>
                <DaysDiv>
                    <StyledHeading type="h6">
                        {SELECT_A_DAY_TITLE}
                    </StyledHeading>
                    {DAYS_OF_THE_WEEK.map(
                        (day): React.ReactElement => (
                            <Section
                                as={Checkbox}
                                key={`create${day}`}
                                name={`checkboxes.${day}`}
                                label={upperCaseFirstLetter(day)}
                                onChange={handleChange}
                            />
                        ),
                    )}
                </DaysDiv>
                <FromToDualTimeSelector
                    storeHours={values.storeHours}
                    setStoreHours={setStoreHours}
                />
                <StyledHeading type="h6">{SELECT_A_CATEGORY}</StyledHeading>
                <Section
                    as={Select}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                    ): void => {
                        setAddStoreHoursCategory(parseFloat(e.target.value));
                    }}
                    placeholder={allCategories[addStoreHoursCategory].category}
                    value={allCategories[addStoreHoursCategory].category}
                >
                    {Object.values(allCategories).map(
                        ({category}, index): React.ReactElement => (
                            <option
                                key={category}
                                value={index}
                            >
                                {category}
                            </option>
                        ),
                    )}
                </Section>
                <CenteredButton
                    onClick={()=> mergeOrAddTime()}
                    disabled={!isValid || !dirty}
                >
                    {ADD_HOURS_BUTTON}
                </CenteredButton>
            </StyledModal>
            <MergeModal 
                isVisible={[mergeModalState, setMergeModalState]}
                storeHours={values.storeHours}
                mergedHours={mergedHours}
                overWrittenHours={overWrittenHours}
                confirmMerge={confirmMerge}
            />
        </>
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
const DaysDiv = styled.div`
    margin: 5px;
    ${Mixins.media(
        'phone',
        `
        ${Mixins.flex('column')};  
    `,
    )}
`;
const CenteredButton = styled(Button)`
    margin: 10px auto;
`;
