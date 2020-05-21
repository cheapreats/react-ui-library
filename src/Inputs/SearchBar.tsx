import React, { useState, useLayoutEffect } from 'react';
import { flex, transition } from '@Utils/Mixins';

import { LabelLayout, InputFragment as I, LabelLayoutProps } from '@Layouts';
import { useTransition } from '@Utils/Hooks';

import { Search } from 'styled-icons/fa-solid/Search';
import styled from 'styled-components';

import { SelectList } from '../Containers';

const MAX_VIEWING_LIMIT = 4;

export interface SearchBarProps extends LabelLayoutProps {
    value?: string | number;
    onChange?: Function;
    onInput?: Function;
    limit?: number;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    children,
    limit = MAX_VIEWING_LIMIT,
    onChange = (): void => {},
    onInput = (): void => {},
    placeholder,
    ...props
}): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const [inputValue, setinputValue] = useState('');
    const [, mount] = useTransition(expanded);

    useLayoutEffect((): void | (() => void) => {
        const listener = (): void => {
            setExpanded(false);
        };

        window.addEventListener('keydown', listener, { once: true });
        window.addEventListener('click', listener, { once: true });

        return (): void => {
            window.removeEventListener('keydown', listener);
            window.removeEventListener('click', listener);
        };
    }, [expanded]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setinputValue(event.currentTarget.value);
        onInput(event.currentTarget.value);
        setExpanded(true);
    };

    return (
        <LabelLayout {...props}>
            <Container>
                <SelectDisplay>
                    <InputFragment
                        {...props}
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={(e): void => handleChange(e)}
                    />
                    <Icon />
                </SelectDisplay>
                {mount && (
                    <SelectList
                        limit={limit}
                        expanded={expanded}
                        inputValue={inputValue}
                        onChange={({ target }: Record<string, any>): void => {
                            onChange(target);
                            setinputValue(target.name);
                        }}
                    >
                        {children}
                    </SelectList>
                )}
            </Container>
        </LabelLayout>
    );
};

interface SearchBarSelectProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string | number;
    onChange?: Function;
    limit?: number;
}
const SelectDisplay = styled.p<SearchBarSelectProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    ${flex('flex-start', 'center')}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

const Icon = styled(Search)`
    width: 20px;
    flex-shrink: 0;
    margin-left: auto;
`;

const InputFragment = styled(I)`
    flex-grow: 1;
    width: 100%;
    &:focus {
        box-shadow: none;
    }
`;

const Container = styled.div`
    ${flex('column')}
    flex-direction: columns;
    position: relative;
    width: 100%;
`;

export default SearchBar;
