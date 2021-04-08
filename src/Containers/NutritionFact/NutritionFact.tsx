import React, {
    useCallback,
    useMemo,
    useRef,
    forwardRef,
    useState,
    useLayoutEffect,
} from 'react';
import styled from 'styled-components';
import { Mixins } from '../../Utils';
import { Main, MainInterface } from '../../Utils/BaseStyles';
import Theme from '../../Themes/ThemeTemplate';
import { Input } from '../../Inputs/Input/Input';

const EXTRA_PIXEL = 1;
const ENTRY_INPUT_WIDTH = 20;
const HEADER_ENTRY_INPUT_WIDTH = 40;
const DECIMAL_BASIS = 10;
const PERCENTAGE_FACTOR = 100;

interface IAdditionalProps {
    /* if the heading entry must to be taken as the reference entry for taking width from */
    isMaxWidthOfRootContainer?: boolean;
}

export enum EntryType {
    Heading,
    Entry,
}

interface IEntries {
    /* type of entry, heading or entry */
    type: EntryType;
    /* data per line */
    data: IEntryProps | (IHeadingEntryProps & IAdditionalProps);
}

export interface INutritionFactProps {
    entries: IEntries[];
    isEditMode?: boolean;
}

export const NutritionFact: React.FC<INutritionFactProps> = ({
    entries,
    isEditMode,
}): React.ReactElement => {
    // used to set the max width of the root container
    const rootContainerRef = useRef<HTMLDivElement>(null);

    // used to compute the max width for the root container
    const headingLabelRef = useRef<HTMLDivElement>(null);

    /**
     * renders an entry of type entry
     * @param entry {IEntryProps} - the entry to render
     * @returns {React.ReactElement} the rendered entry
     */
    const renderEntry = useCallback(
        (entry: IEntryProps): React.ReactElement => {
            const { label, ...rest } = entry;
            return (
                <Entry
                    key={label}
                    label={label}
                    margin="0 0 2px"
                    padding="0 0 1px"
                    isEditMode={isEditMode}
                    {...rest}
                />
            );
        },
        [isEditMode],
    );

    /**
     * renders an entry of type heading
     * @param entry {IHeadingEntryProps} - the entry to render
     * @returns {React.ReactElement} the rendered entry
     */
    const renderHeadingEntry = useCallback(
        (entry: IHeadingEntryProps & IAdditionalProps): React.ReactElement => {
            const { leftText, isMaxWidthOfRootContainer, ...rest } = entry;
            if (isMaxWidthOfRootContainer)
                return (
                    <HeadingEntry
                        key={leftText}
                        leftText={leftText}
                        ref={headingLabelRef}
                        isEditMode={isEditMode}
                        {...rest}
                    />
                );
            return (
                <HeadingEntry
                    key={leftText}
                    leftText={leftText}
                    isEditMode={isEditMode}
                    {...rest}
                />
            );
        },
        [],
    );

    /**
     * this sets max width for the root container based on the width of the heading (entry) taken as a reference
     */
    useLayoutEffect(() => {
        if (rootContainerRef.current && headingLabelRef.current)
            rootContainerRef.current.style.maxWidth = `${
                headingLabelRef.current.clientWidth + EXTRA_PIXEL
            }px`;
    }, []);

    /**
     * renders the entries
     */
    const renderEntries = useCallback(
        () =>
            entries.map(({ type, data }) => {
                switch (type) {
                    case EntryType.Entry:
                        return renderEntry(data as IEntryProps);
                    case EntryType.Heading:
                        return renderHeadingEntry(
                            data as IHeadingEntryProps & IAdditionalProps,
                        );
                    default:
                        return null;
                }
            }),
        [entries],
    );

    return (
        <RootContainer padding="5px" ref={rootContainerRef}>
            {renderEntries()}
        </RootContainer>
    );
};

interface IRootContainerProps extends MainInterface {
    width?: number;
}

const RootContainer = styled.div<IRootContainerProps>`
    border: 2px solid black;
    ${({ width, ...props }): string => `
${width ? `width:${width}px;` : 'width:fit-content;'}
${Main({ ...props })}
`}
`;

interface ICommonEntryProps {
    fontSize?: string;
    isBold?: boolean;
    separatorWidth?: number;
    isEditMode?: boolean;
    margin?: string;
    padding?: string;
}

interface IHeadingEntryProps extends ICommonEntryProps {
    leftText: string;
    justifyContent?: string;
    rightText?: string;
    isEditable?: boolean;
}

const HeadingEntry = forwardRef<HTMLDivElement, IHeadingEntryProps>(
    (
        {
            leftText,
            isEditMode,
            isEditable,
            separatorWidth = 1,
            rightText,
            ...props
        },
        ref,
    ): React.ReactElement => {
        const [rightTextState, setRightTextState] = useState(rightText);

        /**
         * updates state for second label based on event fired
         * @param event {React.ChangeEvent<HTMLInputElement>} - the fired event
         */
        const updateRightText = useCallback(
            ({ target }: React.ChangeEvent<HTMLInputElement>) => {
                setRightTextState(target.value);
            },
            [],
        );

        /**
         * renders the second label if exists
         * @returns {JSX.Element | null} the rendered second label, in case that exists, depending on edit mode and if the entry is
         * editable
         */
        const renderRightText = useCallback(() => {
            if (rightTextState) {
                if (isEditMode && isEditable)
                    return (
                        <Input
                            value={rightTextState}
                            onChange={updateRightText}
                            width={HEADER_ENTRY_INPUT_WIDTH}
                        />
                    );
                return <div>{rightTextState}</div>;
            }
            return null;
        }, [rightTextState]);

        return (
            <EntryContainer separatorWidth={separatorWidth} {...props}>
                <div ref={ref}>{leftText}</div>
                {renderRightText()}
            </EntryContainer>
        );
    },
);

interface IEntryProps extends ICommonEntryProps {
    amount?: number;
    dailyAmount: number;
    label: string;
    unity: string;
    indentationNumber?: number;
    indentationSize?: number;
}

const Entry: React.FC<IEntryProps> = ({
    amount = 0,
    dailyAmount,
    label,
    unity,
    isEditMode,
    isBold = false,
    separatorWidth = 1,
    indentationNumber = 0,
    indentationSize = 4,
    ...props
}): React.ReactElement => {
    const [amountState, setAmountState] = useState<string>(amount.toString());

    /**
     * this computes the daily value percentage
     */
    const dailyValuePercentage = useMemo(() => {
        if (dailyAmount)
            return Math.round(
                (parseInt(amountState, DECIMAL_BASIS) / dailyAmount) *
                    PERCENTAGE_FACTOR,
            );
        return null;
    }, [dailyAmount, amountState]);

    /**
     * computes the amount of white space
     * @returns {string} white space
     */
    const renderIndentation = useCallback(() => {
        let space = '';
        const nbsp = '\u00a0';
        for (let j = 0; j < indentationNumber; j += 1) {
            for (let i = 0; i < indentationSize; i += 1) {
                space += nbsp;
            }
        }
        return space;
    }, [indentationNumber, indentationSize]);

    /**
     * sets the amount vendor inputed
     * @param event {React.ChangeEvent<HTMLInputElement>} - the event fired
     */
    const updateAmountState = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setAmountState(target.value);
    };

    /**
     * renders the amount depending on editMode
     */
    const renderAmount = useCallback(() => {
        if (isEditMode) {
            return (
                <Input
                    onChange={updateAmountState}
                    value={amountState}
                    width={ENTRY_INPUT_WIDTH}
                />
            );
        }
        return amountState;
    }, [isEditMode, amountState]);

    return (
        <EntryContainer
            separatorWidth={separatorWidth}
            justifyContent="space-between"
            {...props}
        >
            <LabelContainer>
                {renderIndentation()}
                <Bold isBold={isBold}>
                    {label}
                    &nbsp;
                </Bold>
                <AmountContainer>
                    {renderAmount()}
                    {unity}
                </AmountContainer>
            </LabelContainer>
            {dailyValuePercentage !== null && (
                <Bold isBold={isBold}>{dailyValuePercentage}%</Bold>
            )}
        </EntryContainer>
    );
};

interface IEntryContainerProps extends MainInterface {
    fontSize?: string;
    separatorWidth: number;
    justifyContent?: string;
    isBold?: boolean;
}

const EntryContainer = styled.div<IEntryContainerProps>`
    ${({
        separatorWidth,
        fontSize = Theme.font.size.small,
        justifyContent = 'flex-start',
        isBold = false,
        ...props
    }): string => `
${Mixins.flex(justifyContent, 'center')}
border-bottom:${separatorWidth}px solid black;
font-size:${fontSize};
${isBold ? 'font-weight:700;' : ''}
${Main({ ...props })}
`}
`;

const LabelContainer = styled.div`
    ${Mixins.flex('flex-start', 'center')}
`;
const AmountContainer = styled.div`
    ${Mixins.flex('flex-start', 'center')}
`;

interface IBoldProps {
    isBold?: boolean;
}

const Bold = styled.div<IBoldProps>`
    ${({ isBold }): string => `
${isBold ? 'font-weight:700;' : ''}
`}
`;
