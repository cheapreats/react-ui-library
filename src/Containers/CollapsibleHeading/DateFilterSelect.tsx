import React, { useState, useEffect } from 'react';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { useMounted } from '@Utils/Hooks';
import { Datepicker } from '@Inputs/Datepicker';
import { Modal as M } from '@Containers/Modal/Modal';
import {
    FilterSelect,
    IFilterSelectProps,
} from '@Containers/CollapsibleHeading/FilterSelect';
import { Input } from '@Inputs/Input/Input';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { clickable, flex } from '@Utils/Mixins';
import moment from 'moment';
import styled from 'styled-components';
import { Heading } from '@Text/Heading';

const FIRST_SELECT_OPTION = 0;

export interface IDateFilterSelectProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    placeholder: string;
    selectOptions: string[];
    selectProps?: Partial<IFilterSelectProps>;
    onOptionsSelected?: (filterValue: {
        date: Date;
        selectedOption: string;
    }) => void;
    filterValue: { date: Date; selectedOption: string };
}

export const DateFilterSelect: React.FC<IDateFilterSelectProps> = ({
    placeholder,
    selectOptions,
    selectProps,
    onOptionsSelected = () => console.log('selected'),
    filterValue,
}): React.ReactElement => {
    const isMounted = useMounted();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState(
        filterValue?.selectedOption || selectOptions[FIRST_SELECT_OPTION],
    );
    const [date, setDate] = useState(filterValue?.date || new Date());

    useEffect(() => {
        const newFilterValue = { date, selectedOption: selected };
        if (isMounted.current) {
            onOptionsSelected(newFilterValue);
        }
    }, [selected, date]);

    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueToDate = new Date(event.target.value);
        setDate(valueToDate);
    };

    const onClearDate = () => {
        setDate(new Date());
        setIsModalOpen(false);
        setSelected(selectOptions[FIRST_SELECT_OPTION]);
    };

    return (
        <>
            <FilterSelect
                onSelectFilter={setSelected}
                placeholder={placeholder}
                selectOptions={selectOptions}
                value={selected}
                {...selectProps}
            />
            <Input
                value={moment(date).format('LL')}
                onClick={() => setIsModalOpen(true)}
                width="100%"
            />
            <Modal
                state={[isModalOpen, setIsModalOpen]}
                padding="10px"
                maxWidth="100%"
            >
                <CloseIconRow>
                    <Heading type="h3">Select a Date</Heading>
                    <Icon as={Close} onClick={() => setIsModalOpen(false)} />
                </CloseIconRow>

                <Datepicker
                    value={date}
                    onChange={onDateChange}
                    onClear={onClearDate}
                    initialShow
                />
            </Modal>
        </>
    );
};

const Modal = styled(M)`
    height: 440px;
    width: 300px;
`;

const CloseIconRow = styled.div`
    ${flex('row', 'space-between')}
`;

const Icon = styled.svg`
    height: 25px;
    margin: 10px;
    ${({ theme }) => `
        color: ${theme.colors.text};
        ${clickable(theme.colors.primary, 0.1, ['color'])}
    `}
`;
