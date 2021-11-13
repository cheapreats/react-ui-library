import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { CalendarAlt } from '@styled-icons/fa-solid/CalendarAlt';
import styled, { useTheme } from 'styled-components';
import { flex, position } from '../../Utils/Mixins';
import { useTransition } from '../../Utils/Hooks';
import {
    InputFragment,
    LabelLayout as LL,
    LabelLayoutProps,
} from '../../Fragments';
import { Datebox } from './Datebox';

const printDate = (date?: Date): string => {
    if (date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }
    return '';
};

export interface DatepickerProps extends LabelLayoutProps {
    disabled?: boolean;
    placeholder?: string;
    onChange?: Function;
    onClear?: Function;
    value?: Date;
    initialShow?: boolean;
}

export const Datepicker: React.FC<DatepickerProps> = ({
    value,
    onChange = (): void => undefined,
    onClear = (): void => undefined,
    placeholder = 'MM-DD-YYYY',
    initialShow,
    ...props
}): React.ReactElement => {
    const theme = useTheme();
    const [selectedDate, setDate] = useState(value);
    const ref = useRef<HTMLDivElement>(null);
    const dateText = useMemo(
        (): string => (printDate(value) ? printDate(value) : placeholder),
        [value],
    );
    const [show, setShow] = useState(initialShow || false);
    const [text, setText] = useState(dateText);
    const [, mount, animate] = useTransition(show, {
        end: theme.speed.normal,
    });

    useEffect((): void | (() => undefined | void) => {
        if (!mount) return undefined;
        const handler = ({ target }: MouseEvent): void => {
            if (ref.current && !ref.current.contains(target as HTMLElement)) {
                setShow(false);
            }
        };

        window.setTimeout((): void => {
            window.addEventListener('click', handler);
        }, 100);
        return (): void => {
            window.removeEventListener('click', handler);
        };
    }, [mount]);

    useEffect((): void => {
        setDate(value);
        setText(printDate(value));
    }, [value]);

    const handleText = useCallback(
        (el): void => setText(el.target.value),
        [text],
    );

    const selectDate = useCallback((el): void => {
        const val = new Date(el.target.getAttribute('data'));
        el.target = {
            ...el.target,
            name: props.name,
            value: val,
        };
        onChange(el);
        setText(printDate(val));

        setDate(val);
    }, []);

    const changePage = useCallback(
        (change = 1): React.MouseEventHandler =>
            (): void => {
                setDate((d): Date => {
                    const curr: Date = new Date(d || new Date());
                    curr.setMonth(curr.getMonth() + change);
                    return curr;
                });
            },
        [],
    );
    const clearDate = (): void => {
        setText(placeholder);
        setShow(false);
        onClear();
    };

    const handleKeys = useCallback(
        (el): void => {
            const d = new Date(el.target.value);
            switch (el.key) {
                case 'Tab':
                    setShow(false);
                    break;
                case 'Enter':
                    el.target = {
                        ...el.target,
                        name: props.name,
                        value: d,
                    };

                    if (d.toDateString() === value?.toDateString()) {
                        setShow((v): boolean => !v);
                    } else if (!Number.isNaN(d.getTime())) {
                        setText(printDate(d));
                        onChange(el);
                    }
                    break;
                default:
                    break;
            }
        },
        [value],
    );

    return (
        <LabelLayout ref={ref} {...props}>
            <Wrapper>
                <InputFragment
                    {...props}
                    placeholder={placeholder}
                    onChange={handleText}
                    onFocus={(): void => setShow(true)}
                    onKeyDown={handleKeys}
                    value={text}
                />
                <Icon />
            </Wrapper>
            {mount && (
                <Datebox
                    changePage={changePage}
                    selectedDate={selectedDate}
                    selectDate={selectDate}
                    animate={animate}
                    value={value}
                    clearDate={clearDate}
                />
            )}
        </LabelLayout>
    );
};

const LabelLayout = styled(LL)<{ ref: React.RefObject<HTMLDivElement> }>`
    position: relative;
`;

const Icon = styled(CalendarAlt)`
    ${position('absolute', 'auto 20px auto auto')}
    width: 10px;
`;

const Wrapper = styled.div`
    ${flex('column')}
    position: relative;
`;

export default Datepicker;
