import React, {
    useState,
    useCallback,
    useMemo,
    Children,
    isValidElement,
    SyntheticEvent,
    useRef,
    RefObject,
    useLayoutEffect,
} from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import {
    flex,
    scroll,
    position,
    transition,
    clickable,
    darken,
} from '@Utils/Mixins';
import { useTransition } from '@Utils/Hooks';
import { LabelLayout, LabelLayoutProps, InputFragment } from '@Layouts';

const MAX_VIEWING_LIMIT = 4;
const REVERSE = '-1';

const SPEED = 'normal';

export interface ComboBoxSelectorProps extends LabelLayoutProps {
    value?: string | number;
    theme: DefaultTheme;
    onChange?: Function;
    limit?: number;
    placeholder?: string;
}

const _Select: React.FC<ComboBoxSelectorProps> = ({
    children,
    limit = MAX_VIEWING_LIMIT,
    onChange = (): void => {},
    theme,
    placeholder,
    name,
    ...props
}): React.ReactElement => {
    const [expanded, setExpanded] = useState(false);
    const [inputValue, setinputValue] = useState('');
    const [, mount, animation] = useTransition(expanded, {
        end: theme.speed[SPEED],
    });
    const refSelectList = useRef() as RefObject<HTMLDivElement>;
    const [numVisibleSelection, setNumVisibleSelection] = useState(limit);

    const createList = (
        thechildren: React.ReactNode[],
        onSelect: React.MouseEventHandler,
        value?: string | number,
    ): React.ReactNode[] =>
        thechildren.map((child): React.ReactElement | null => {
            if (!inputValue) {
                if (child && isValidElement(child)) {
                    const val = child.props.value;

                    const selected = String(value) === val;
                    return (
                        <SelectItem
                            {...child.props}
                            active={selected}
                            onClick={onSelect}
                            key={val}
                            order="1"
                        />
                    );
                }
            } else if (
                child &&
                isValidElement(child) &&
                inputValue &&
                child.props.children
                    .toLowerCase()
                    .search(inputValue.toLowerCase()) > -1
            ) {
                const val = child.props.value;
                const selected = String(value) === val;
                const order = child.props.value
                    .toLowerCase()
                    .startsWith(inputValue.toLowerCase())
                    ? REVERSE
                    : '1';

                return (
                    <SelectItem
                        {...child.props}
                        active={selected}
                        onClick={onSelect}
                        key={val}
                        order={order as string}
                    />
                );
            }

            return null;
        });

    const onSelect = useCallback(
        ({ currentTarget }): void => {
            onChange({
                target: {
                    value: currentTarget.getAttribute('value'),
                    name,
                },
            });
            setinputValue(currentTarget.firstChild.nodeValue);
        },
        [name],
    );

    const options = useMemo((): any => {
        return Children.toArray(children);
    }, [expanded]);

    useLayoutEffect((): void | (() => void) => {
        if (refSelectList.current?.children.length) {
            setNumVisibleSelection(refSelectList.current.children.length);
        } else {
            setNumVisibleSelection(0);
        }

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

    const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setinputValue(event.currentTarget.value);
        setExpanded(true);
    };

    return (
        <LabelLayout {...props}>
            <Container>
                <InputFragment
                    {...props}
                    value={inputValue}
                    placeholder={placeholder}
                    onChange={e => handleChange(e)}
                    onKeyDown={e => handleChange(e)}
                    onClick={e => handleChange(e)}
                />

                {mount && (
                    <SelectList
                        ref={refSelectList}
                        limit={Math.min(numVisibleSelection, limit)}
                        expanded={animation}
                    >
                        {createList(options, onSelect)}
                    </SelectList>
                )}
            </Container>
        </LabelLayout>
    );
};

export const ComboBox = withTheme(_Select);

const Container = styled.div`
    ${flex('column')}
    position: relative;
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
        top:42px;
    `
            : `
        pointer-events: none;
        height: 0px;
        opacity: 0;
    `}
`;

interface SelectItemProps {
    active?: boolean;
    order: string;
}

const SelectItem = styled.p<SelectItemProps>`
    ${transition(['background-color'])}
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    margin: 0;
    order: ${({ order }): string => order};

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

export default ComboBox;
