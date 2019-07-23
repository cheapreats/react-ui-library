import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    Children,
    isValidElement,
} from 'react';
import styled, { withTheme } from 'styled-components';
import { AngleDown } from 'styled-icons/fa-solid/AngleDown';
import {
    flex,
    scroll,
    position,
    transition,
    clickable,
    styledCondition,
} from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';
import { MainThemeInterface } from '@Themes';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

const ITEM_HEIGHT = 41;
const SPEED = 'slow';

const createList = (
    children: React.ReactNode[],
    onSelect: Function,
    value?: string | number,
): React.ReactNode[] =>
    children.map((child): React.ReactElement | null => {
        if (child && isValidElement(child)) {
            const val = child.props.value;
            const selected = String(value) === val;
            return (
                <SelectItem
                    {...child.props}
                    selected={selected}
                    onClick={onSelect}
                    key={val}
                />
            );
        }
        return null;
    });

export interface SelectProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    value?: string | number;
    theme: MainThemeInterface;
    onChange?: Function;
    limit?: number;
}

const _Select: React.FunctionComponent<SelectProps> = ({
    disabled,
    value,
    children,
    limit = 4,
    placeholder = '',
    onChange = (): void => {},
    theme,
    name,
    ...props
}): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const options = Children.toArray(children);

    const { success, error } = props;
    const displayProps = { success, error, disabled };

    const [, mount, animation] = useTransition(expanded, {
        end: theme.speed[SPEED],
    });

    const selected = useMemo(
        (): React.ReactNode =>
            options.find(
                (option): boolean =>
                    isValidElement(option) &&
                    option.props.value === String(value),
            ),
        [children, value],
    );

    const onSelect = useCallback(
        (el): void => {
            el.target.name = name;
            onChange(el);
        },
        [name],
    );

    useEffect((): void | (() => void | undefined) => {
        if (expanded) {
            const listener = (): void => {
                setExpanded(false);
            };
            const timer = window.setTimeout((): void => {
                window.addEventListener('click', listener, { once: true });
            }, 10);

            return (): void => {
                window.clearTimeout(timer);
                window.removeEventListener('click', listener);
            };
        }
        return undefined;
    }, [expanded]);

    return (
        <LabelLayout {...props}>
            <Container>
                <SelectDisplay
                    {...displayProps}
                    onClick={
                        !disabled ? (): void => setExpanded(true) : undefined
                    }
                >
                    <SelectText>
                        {selected
                            ? (selected as React.ReactElement).props.children
                            : placeholder}
                    </SelectText>
                    <Icon />
                </SelectDisplay>
                {mount && (
                    <SelectList limit={limit} expanded={animation}>
                        {createList(options, onSelect, value)}
                    </SelectList>
                )}
            </Container>
        </LabelLayout>
    );
};

export const Select = withTheme(_Select);

const Container = styled.div`
    ${flex('column')}
    position: relative;
`;

const SelectDisplay = styled.p<SelectProps>`
    ${transition(['background-color', 'opacity', 'box-shadow'])}
    ${flex('flex-start', 'center')}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0;

    // Disabled
    ${({ disabled }): string =>
        disabled
            ? `
        cursor: not-allowed;
        opacity: 0.6;
    `
            : ''}

    // Theme Stuff
    ${({ theme, disabled }): string => `
        padding: ${theme.dimensions.padding.default};
        border-radius: ${theme.dimensions.radius};
        font-family: ${theme.font.family};
        ${
            !disabled
                ? `
            &:hover:not(:disabled) {
                box-shadow: ${theme.depth[1]};
            }
        `
                : ''
        }
    `}

    // Background color
    ${({ theme, error = false, success = false }): string => `
        background-color: ${styledCondition(
            error,
            theme.colors.input.error,
            success,
            theme.colors.input.success,
            theme.colors.input.default,
        )};
    `}
`;

const SelectText = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Icon = styled(AngleDown)`
    width: 10px;
    flex-shrink: 0;
    margin-left: auto;
`;

const SelectList = styled.ul<{
    expanded: boolean;
    limit: number;
}>`
    ${position('absolute', '0 0 20px')}
    ${scroll}
    
    background-color: white;
    list-style-type: none;
    height: fit-content;
    overflow: auto;
    padding: 0;

    // Theme Stuff
    ${({ theme }): string => `
        ${transition(
            [
                'max-height',
                {
                    prop: 'opacity',
                    duration: theme.speed.normal,
                },
            ],
            theme.speed[SPEED],
        )}
        border-radius: ${theme.dimensions.radius};
        box-shadow: ${theme.depth[1]};
    `}

    ${({ expanded, limit }): string =>
        expanded
            ? `
        max-height: ${limit * ITEM_HEIGHT}px;
        opacity: 1;
    `
            : `
        max-height: ${ITEM_HEIGHT}px;
        pointer-events: none;
        opacity: 0;
    `}
`;

const SelectItem = styled.li`
    ${transition(['background-color'])}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;

    // Theme Stuff
    ${({ theme }): string => `
        padding: ${theme.dimensions.padding.default};
        ${clickable('#ffffff', 0.03)}
    `}
`;

export default Select;
