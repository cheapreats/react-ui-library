import React, {
    Children,
    isValidElement,
    RefObject, SyntheticEvent,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from "react";
import styled, {useTheme} from "styled-components";
import {useTransition} from "@Utils/Hooks";
import {InputFragment, LabelLayout} from "@Layouts";
import {clickable, darken, flex, position, scroll, transition} from "@Utils/Mixins";
import {Main, Responsive} from "@Utils/BaseStyles";
import {ButtonProps} from "@Inputs";


const MAX_VIEWING_LIMIT = 4;
const REVERSE = '-1';
const SPEED = 'normal';

export interface SearchableDropdownProps
{
    children : [],
    dropdownButton: React.ReactElement;
    label : string,
    limit? : number,
    selectedVal : number,
    placeholder?: string,
    onChange? : Function,
}


export const SearchableDropdown : React.FC<SearchableDropdownProps> = ({
    children,
    limit = MAX_VIEWING_LIMIT,
    onChange = (): void => undefined,
    placeholder,
    ...props
}): React.ReactElement => {
    const theme = useTheme();
    const [isActive, setIsActive] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [inputValue, setinputValue] = useState('');
    const [, mount, animation] = useTransition(expanded, {
        end: theme.speed[SPEED],
    });
    const refSelectList = useRef() as RefObject<HTMLDivElement>;
    const [numVisibleSelection, setNumVisibleSelection] = useState(limit);
    const toggleIsActive = () => {
        setIsActive(!isActive);
    };

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

    const options = useMemo(
        (): React.ReactNode[] => Children.toArray(children),
        [expanded],
    );

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

    const handleChange = (event: SyntheticEvent<HTMLInputElement>): void => {
        setinputValue(event.currentTarget.value);
        setExpanded(true);
        event.stopPropagation();
    };
    return (
        <div>
            <LabelLayout  {...props}>
                <StyledButton  onClick={() => toggleIsActive()}>Click To Search</StyledButton>
                {isActive && <Container>
                    <InputFragment
                        {...props}
                        value={inputValue}
                        placeholder={placeholder}
                        onChange={({ target }: { target: any }) =>
                            setExpanded(target.value)}
                        onKeyDown={(e): void => handleChange(e)}
                        onClick={(e): void => handleChange(e)}
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
                </Container>}
            </LabelLayout>
        </div>
    )};

const Container = styled.div`
    ${flex('column')}
    position: relative;
    width:300px;
`;

const SelectList = styled.div<{
    expanded: boolean;
    limit: number;
}>`
    ${position('inline-block', '0 0 20px')}
    ${scroll}
    
    background-color: white;
    list-style-type: none;
    appearance: none;
    overflow: auto;
    z-index: 900;
    padding: 0;
    width:300px;

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

const StyledButton = styled.button<ButtonProps>`
    // Base Styles
    ${transition(['background-color', 'opacity'])}
    ${Responsive}

    ${flex('center')}
    border: 1.5px solid rgba(0,0,0,0.1);
    background: transparent;
    border-radius: 300px;
    font-size: 0.95rem;
    position: relative;
    font-weight: bold;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    width: 300px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    // Theme Stuff
    ${({theme, color = 'background', contentColor = 'text', ...props
    }): string => `
        padding: ${theme.dimensions.padding.withBorder};
        font-family: ${theme.font.family};
        background-color: ${theme.colors[color] || color};
        color: ${theme.colors[contentColor] || contentColor};
        ${clickable(theme.colors[color] || color)}
        ${Main({
        padding: theme.dimensions.padding.withBorder,
        ...props,
    })}
    `}
    // Primary button
    ${({ primary, theme }): string =>
        primary
            ? `
        background-color: ${theme.colors.primary};
        color: white;
        ${clickable(theme.colors.primary)}
    `
            : ''}
    // Full width
    ${({ full }): string => (full ? 'width: 30%;' : '')}
`;

export default SearchableDropdown;
