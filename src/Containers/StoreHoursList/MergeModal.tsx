import React, {useState} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { Cross } from '@styled-icons/entypo/Cross';
import { Swap } from '@styled-icons/entypo/Swap';
import { Merge } from '@styled-icons/entypo/Merge';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt';
import { Mixins } from '@Utils';
import { Button } from '@Inputs/Button/Button';
import { Select } from '@Inputs/Select/Select';
import { Tag } from '../Tag/Tag';
import { ICategoryWithHoursTypes, IHoursByDay, IToFromHours, DAYS_OF_THE_WEEK, upperCaseFirstLetter} from './constants';
import { convertTime } from './TimeFunctions';
import { Modal } from '../Modal/Modal';
import { Heading } from '../../Text';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

interface MergeModalProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    isVisible: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    storeHours: IToFromHours;
    mergedToFromHours: IHoursByDay;
    overWrittenTimes: IHoursByDay;
}

enum MergeActions {
    MERGE = 'Merge',
    REPLACE = 'Replace',
    KEEP = 'Keep'
}

interface IMergeDays {
    monday: MergeActions;
    tuesday: MergeActions;
    wednesday: MergeActions;
    thursday: MergeActions;
    friday: MergeActions;
    saturday: MergeActions;
    sunday: MergeActions;
}

const initalValues: IMergeDays = {
    monday: MergeActions.MERGE,
    tuesday: MergeActions.MERGE,
    wednesday: MergeActions.MERGE,
    thursday: MergeActions.MERGE,
    friday: MergeActions.MERGE,
    saturday: MergeActions.MERGE,
    sunday: MergeActions.MERGE
}
export const MergeModal: React.FC<MergeModalProps> = ({
    isVisible,
    storeHours,
    mergedToFromHours,
    overWrittenTimes,
    ...props
}): React.ReactElement => {
    const [mergeModalState, setMergeModalState] = isVisible;
    const [is24, setIs24] = useState(false);
    const {
        values,
        dirty,
        isValid,
        errors,
        handleChange,
        setFieldValue
    } = useFormik({
        initialValues: initalValues,
        onSubmit: ()=> undefined,
        enableReinitialize: true,
    });

    const storeHoursChange = (
        <HoursItem>
            {convertTime(
                storeHours.from,
                is24,
            )}
            {` - `}
            {convertTime(
                storeHours.to,
                is24,
            )}
        </HoursItem>
    )
    
    const renderStoreHoursMerge = () => DAYS_OF_THE_WEEK.map(day => {
        if (overWrittenTimes[day].length > 0) {
            const overWrittenTimesDisplay = (
                <Column>
                    {overWrittenTimes[day].map((time: IToFromHours)=> (
                        <HoursItem
                            key={day}
                        >
                            {convertTime(
                                time.from,
                                is24,
                            )}
                            {` - `}
                            {convertTime(
                                time.to,
                                is24,
                            )}
                        </HoursItem>
                    ))}
                </Column>
            )
            // handle multiple merged Times
            const mergedTime = (
                <Column>
                    {mergedToFromHours[day].map((time: IToFromHours)=> (
                        <HoursItem
                            key={day}
                        >
                            {convertTime(
                                time.from,
                                is24,
                            )}
                            {` - `}
                            {convertTime(
                                time.to,
                                is24,
                            )}
                        </HoursItem>
                    ))}
                </Column>
            )

            const selectedMergeTypeDisplay = () => {
                switch (values[day]) {
                case MergeActions.MERGE:
                    return mergedTime;
                case MergeActions.REPLACE:
                    return storeHoursChange
                case MergeActions.KEEP:
                default:
                    return null;
                }
            }

            return (
                <Column>  
                    <Heading type="h5">{upperCaseFirstLetter(day)}</Heading>
                    <SelectRow>
                        {overWrittenTimesDisplay}
                        {values[day] === MergeActions.KEEP ? null : <Icon as={RightArrowAlt} />}
                        {selectedMergeTypeDisplay()}
                        <div style={{width: '150px', margin:'auto 0px auto auto'}}>                        
                            <Select
                                name={`${day}`}
                                value={values[day]}
                                onChange={handleChange}
                            >
                                <option value={MergeActions.MERGE}>{MergeActions.MERGE}</option>
                                <option value={MergeActions.REPLACE}>{MergeActions.REPLACE}</option>
                                <option value={MergeActions.KEEP}>{MergeActions.KEEP}</option>
                            </Select>
                        </div>
                    </SelectRow>
                </Column>
            )
        } 
        return null
        
    })

    // Function to determine if Confirm or Merge Overwrite

    // If overwritten times display messages to either merge or overwrite
    // If no overwritten times confirm to add store hours display 
    return (
        <StyledModal state={[mergeModalState, setMergeModalState]} {...props}>
            <StyledHeading type="h2">Merge, Replace, Keep</StyledHeading>
            {renderStoreHoursMerge()}
        </StyledModal>
    );
};

const Column = styled.div`
${Mixins.flex('column', 'flex-start')};
    margin: auto;
`;
const Row = styled.div`
    ${Mixins.flex('row')};
    margin: 0px 5px;
`;
const SelectRow = styled.div`
    ${Mixins.flex('row')};
    margin: 0px 5px;
`;
const StyledModal = styled(Modal)`
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.container};
    `};
    height:50vh;
`;
const StyledHeading = styled(Heading)`
    font-weight: bold;
    flex-wrap: wrap;
    text-align: center;
    margin: 10px;
`;


const Icon = styled.svg`
    flex-shrink: 0;
    ${({ theme }) => `
    color:${theme.colors.primary};
    `}
    width: 30px;
    box-sizing: border-box;
    padding: 4px;
`;
interface IHoursItem {
    active?: boolean
    margin?: string; 
}

const HoursItem = styled.div<IHoursItem>`
    ${Mixins.transition(['background-color', 'color'])}
    ${Mixins.flex('flex-start', 'center')}
    ${({ active, margin, theme }): string =>`
        ${margin && `margin: ${margin}`}
        color: ${theme.colors.primary};
        background-color: ${Mixins.darken('#ffffff', 0.03)};
    `}
    box-sizing: border-box;
    height: 40px;
`;