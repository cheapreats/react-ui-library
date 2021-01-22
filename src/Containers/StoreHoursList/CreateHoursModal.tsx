import React, { useState } from 'react';
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
    
    /**
     * Checks if there is more than one time in a day given a category name
     * @param {number} activeCategoryIndex - Name of category that needs hours to be saved
     * @returns {IHoursByDay} - Returns the merged hours
     */
    const mergeOrAddTime = () => {
        const category = allCategories[addStoreHoursCategory]
        let merged = false;
        // onmerge keep these
        const unMergedHoursByDay = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        }
        const overWrittenHoursByDay = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
        }
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
            const hoursCopy = {...values.storeHours};
            if (values.checkboxes[day]) {
                if(hoursForDayOfWeek.length > 0) {
                    hoursForDayOfWeek.map(hours => {
                        if(moment(hoursCopy.to, 'HH:mm').isAfter(moment(hours.from, 'HH:mm'), 'minutes')  && moment(hoursCopy.to, 'HH:mm').isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                            merged = true;
                            hoursCopy.to = hours.to
                            if (moment(hoursCopy.from).isAfter(moment(hours.from,'HH:mm'), 'minutes')) {
                                hoursCopy.from = hours.from
                            }
                            overWrittenHoursByDay[day].push(hours);
                        } else  if (moment(hoursCopy.from, 'HH:mm').isAfter(moment(hours.from, 'HH:mm'), 'minutes')  && moment(hoursCopy.from, 'HH:mm').isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                            merged = true;
                            hoursCopy.from = hours.from
                            if (moment(hoursCopy.to).isBefore(moment(hours.to, 'HH:mm'), 'minutes')) {
                                hoursCopy.to = hours.to
                            }
                            overWrittenHoursByDay[day].push(hours);
                        } else  if (moment(hoursCopy.from, 'HH:mm').isBefore(moment(hours.from, 'HH:mm'), 'minutes')  && moment(hoursCopy.to, 'HH:mm').isAfter(moment(hours.to, 'HH:mm'), 'minutes')) {
                            merged = true;
                            overWrittenHoursByDay[day].push(hours);
                        } else {
                            unMergedHoursByDay[day].push(hours)
                        }
                    })
                    mergedHoursByDay[day].push(hoursCopy)
                } else {
                    unMergedHoursByDay[day].push(hoursCopy);
                }
            } else {
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
                if(mergedHoursByDay[day].length > NO_MERGED_HOURS){
                    updateStoreHours[day].push(...mergedHoursByDay[day])
                }})
            handleStoreHoursUpdate(updateStoreHours, addStoreHoursCategory);
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
                        setAddStoreHoursCategory(e.target.value as unknown as number);
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
