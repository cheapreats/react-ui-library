import React, {
    Children,
    isValidElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import styled, { useTheme } from 'styled-components';
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import {
    clickable,
    darken,
    flex,
    position,
    scroll,
    styledCondition,
    transition,
} from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';
import { LabelLayout, LabelLayoutProps } from '@Layouts';

const SPEED = 'normal';

const createList = (
    children: React.ReactNode[],
    onSelect: React.MouseEventHandler,
    value?: string | number | HTMLOptionElement,
): React.ReactNode[] =>
    children.map((child): React.ReactElement | null => {
        if (child && isValidElement(child)) {
            const val = child.props.value;
            const selected = String(value) === val;
            return (
                <SelectItem
                    {...child.props}
                    active={selected}
                    onClick={onSelect}
                    key={val}
                />
            );
        }
        return null;
    });

export interface SelectProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string | HTMLOptionElement;
    value?: string | number | HTMLOptionElement;
    onChange?: Function;
    limit?: number;
    iconProps?: { style: any };
}

export const Select: React.FC<SelectProps> = ({
    disabled,
    value,
    children,
    limit = 4,
    placeholder = '',
    onChange = (): void => undefined,
    name,
    iconProps,
    ...props
}): React.ReactElement => {
    const theme = useTheme();
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
        ({ currentTarget }): void => {
            onChange({
                target: {
                    value: currentTarget.getAttribute('value'),
                    name,
                },
            });
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
                    <Icon {...iconProps} />
                </SelectDisplay>
                {mount && (
                    <SelectList
                        limit={Math.min(options.length, limit)}
                        expanded={animation}
                    >
                        {createList(options, onSelect, value)}
                    </SelectList>
                )}
            </Container>
        </LabelLayout>
    );
};

const Container = styled.div`
    ${flex('column')}
    position: relative;
    height: auto;
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
    margin-top: auto;
`;

const SelectList = styled.div<{
    expanded: boolean;
    limit: number;
}>`
    ${position('absolute', '0 0 20px')}
    ${scroll}
    
    background-color: white;
    list-style-type: none;
    appearance: none;
    overflow: auto;
    z-index: 900;
    padding: 0;

    // Theme Stuff
    ${({ theme }): string => `
        ${transition(
            [
                'height',
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

    ${({ expanded, limit, theme }): string =>
        expanded
            ? `
        height: ${limit * theme.dimensions.select.itemHeight}px;
        opacity: 1;
    `
            : `
        pointer-events: none;
        height: 0px;
        opacity: 0;
    `}
`;

const SelectItem = styled.p<{ active: boolean }>`
    ${transition(['background-color'])}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    margin: 0;

    // Theme Stuff
    ${({ theme, active }): string => `
        padding: ${theme.dimensions.padding.default};
        ${
            active
                ? `
            background-color: ${darken('#ffffff', 0.05)}
        `
                : clickable('#ffffff', 0.03)
        }
    `}
`;

export default Select;
