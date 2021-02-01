import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import {useMounted} from '@Utils/Hooks'
import { Datepicker } from '@Inputs/Datepicker';
import { Modal as M } from '@Containers/Modal/Modal';
import { FilterSelect, IFilterSelectProps } from '@Containers/CollapsibleHeading/FilterSelect';
import { Input } from '@Inputs/Input/Input';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { clickable, flex } from '@Utils/Mixins';
import moment from 'moment';
import styled from 'styled-components';

const FIRST_SELECT_OPTION = 0;

export interface IDateFilterSelectProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
    placeholder: string;
    selectOptions: string[];
    selectProps?: Partial<IFilterSelectProps>;
    onOptionsSelected?: (filterValue: {date: Date, selectedOption: string}) => void;
    toggleIsOpen?: (value: any)=> void;
    filterValue: {date: Date, selectedOption: string};
}

export const DateFilterSelect: React.FC<IDateFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    onOptionsSelected = ()=> console.log('selected'),
    toggleIsOpen = ()=> console.log('toggle'),
    filterValue,
}): React.ReactElement => {
    const isMounted = useMounted();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(filterValue?.selectedOption || selectOptions[FIRST_SELECT_OPTION]);
    const [date, setDate] = useState(filterValue?.date || new Date());

    useEffect(() => {
        const newFilterValue = {date, selectedOption: selected};
        if (isMounted.current) {
            onOptionsSelected(newFilterValue)
        }
    }, [selected, date]);

    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueToDate = new Date(event.target.value);
        setDate(valueToDate);
    }

    const onClearDate = () => {
        setDate(new Date)
        setIsModalOpen(false)
        setSelected(selectOptions[FIRST_SELECT_OPTION]);
    }

    const onFocusHideListOpenModal = () => {
        toggleIsOpen(false);
        setIsModalOpen(true);
    }

    return (
        <>
            <FilterSelect
                onSelectFilter={setSelected}
                placeholder={placeholder}
                selectOptions={selectOptions}
                value={selected}
                {...selectProps}
            />
            <Input value={moment(date).format('LL')} onClick={onFocusHideListOpenModal} width='100%' />
            <Modal
                state={[isModalOpen, setIsModalOpen]}
                padding='10px 0'
                onClose={() => toggleIsOpen(true)}
                maxWidth='100%'
            >
                <CloseIconRow>
                    <Icon as={Close} onClick={()=> setIsModalOpen(false)} />
                </CloseIconRow>
                
                <Datepicker value={date} onChange={onDateChange} onClear={onClearDate} initialShow />
                
            </Modal>
        </>
    )
};

const Modal = styled(M)`
    height: 420px;
    width: 310px;
`

const CloseIconRow = styled.div`
    ${flex('row', 'flex-end')}
`

const Icon = styled.svg`
    height: 25px;
    margin: 10px;
    ${({theme}) => `
        color: ${theme.colors.text};
        ${clickable(theme.colors.primary, 0.1, ['color'])}
    `}
`;

