import React, { useState, useLayoutEffect } from 'react';
import { Search } from '@styled-icons/fa-solid/Search';
import styled from 'styled-components';
import { flex, transition } from '@Utils/Mixins';

import { LabelLayout, InputFragment as I, LabelLayoutProps } from '@Layouts';
import { useTransition } from '@Utils/Hooks';

import { SelectList } from '../../Containers/SelectList/SelectList';

const MAX_VIEWING_LIMIT = 4;

export interface SearchBarProps extends LabelLayoutProps {
    value?: string | number;
    onChange?: Function;
    onInput?: Function;
    limit?: number;
    placeholder?: string;
    backgroundColor?: string;
    borderRadius?: string;
    hasIcon?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    children,
    limit = MAX_VIEWING_LIMIT,
    onChange = (): void => undefined,
    onInput = (): void => undefined,
    placeholder,
    backgroundColor = '#f5f5f5',
    borderRadius = '8px',
    hasIcon = true,
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
                <SelectDisplay
                    backgroundColor={backgroundColor}
                    borderRadius={borderRadius}
                >
                    <InputFragment
                        {...props}
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={(e): void => handleChange(e)}
                        backgroundColor={backgroundColor}
                        borderRadius={borderRadius}
                    />
                    {hasIcon && <Icon />}
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
    backgroundColor?: string;
    borderRadius?: string;
}
const SelectDisplay = styled.p<SearchBarSelectProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    ${flex('flex-start', 'center')}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0px;
    ${({ backgroundColor, borderRadius }): string => `
        background-color: ${backgroundColor};
        border-radius: ${borderRadius};
    `}
`;

const Icon = styled(Search)`
    width: 20px;
    flex-shrink: 0;
    margin-left: auto;
    ${({ theme }): string => `
        padding-right: ${theme.dimensions.padding.container};
    `};
`;

const InputFragment = styled(I)`
    flex-grow: 1;
    width: 100%;
    &:focus {
        box-shadow: none;
    }
    ${({ backgroundColor, borderRadius }): string => `
        background-color: ${backgroundColor};
        border-radius: ${borderRadius};
    `}
`;

const Container = styled.div`
    ${flex('column')}
    flex-direction: columns;
    position: relative;
    width: 100%;
`;

export default SearchBar;
