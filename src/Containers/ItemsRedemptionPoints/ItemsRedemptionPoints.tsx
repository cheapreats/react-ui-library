import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Modal as M } from '@Containers/Modal/Modal';
import { Paragraph as P } from '@Text';
import { MainTheme } from '@Themes';
import { Main, MainInterface } from '@Utils/BaseStyles';
import { Mixins } from '@Utils';
import { Button } from '@Inputs/Button/Button';
import { Input } from '@Inputs/Input/Input';
import { Card } from '@Containers/Card/Card';

const DECIMAL_BASE = 10;
const TITLE_CONTAINER_TIMES_VERTICAL_PADDING = 1.5;
const TITLE_CONTAINER_TIMES_HORIZONTAL_PADDING = 3;
const TITLE_CONTAINER_OPACITY = 0.8;
const ITEMS_CONTAINER_MIN_WIDTH = 260;
const INPUT_WIDTH = 30;
const RED_CARD_MIN_WIDTH = 216;
const TIMES_BATCH_UPDATE_MODAL_PADDING = 2;
const NOT_REDEEMABLE = 0;

interface IModalProps {
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export interface IData {
    name: string;
    redemptionPoints: number;
}

export interface IItemsRedemptionPointsProps {
    modalProps: IModalProps;
    titleText: string;
    titleDescription: string;
    cancelButtonText: string;
    applyButtonText: string;
    batchUpdateButtonText: string;
    onClickCancelButton: () => void;
    onClickApplyButton: (dataItems: IData[]) => void;
    data: IData[];
    applyToAllItemsText: string;
}

export const ItemsRedemptionPoints: React.FC<IItemsRedemptionPointsProps> = ({
    modalProps,
    titleText,
    titleDescription,
    cancelButtonText,
    applyButtonText,
    batchUpdateButtonText,
    onClickApplyButton,
    onClickCancelButton,
    data,
    ...props
}): React.ReactElement => {
    const [isShownBatchUpdateModal, setIsShownBatchUpdateModal] =
        useState(false);
    const [dataItems, setDataItems] = useState(data);

    /**
     * renders the items as ItemRedemptionPoints components
     * @param _dataItems {IData[]} - the array of items
     * @returns {React.ReactElement} the rendered items as an array of ItemRedemptionPoints components
     */
    const renderItems = useCallback(
        (_dataItems: IData[]): React.ReactElement => (
            <>
                {_dataItems.map((dataItem, index) => (
                    <ItemRedemptionPoints
                        key={dataItem.name}
                        index={index}
                        dataItems={dataItems}
                        setDataItems={setDataItems}
                    />
                ))}
            </>
        ),
        [dataItems, setDataItems],
    );

    /**
     * opens batch update modal
     */
    const doBatchUpdate = useCallback(() => {
        setIsShownBatchUpdateModal(true);
    }, [setIsShownBatchUpdateModal]);

    /**
     * this is a wrapper for onClickApplyButton function in case some additional functionality should be added
     */
    const applyChanges = useCallback(() => {
        onClickApplyButton(dataItems);
    }, [dataItems, onClickApplyButton]);

    /**
     * this is a wrapper for onClickCancelButton in case we want to add some new functionality, like reseting state in
     * this case
     */
    const cancel = useCallback(() => {
        setDataItems(data);
        onClickCancelButton();
    }, [onClickCancelButton, setDataItems]);

    return (
        <>
            <Modal {...modalProps} width="fit-content">
                <TitleContainer
                    padding={`${
                        parseInt(
                            MainTheme.dimensions.padding.container as string,
                            DECIMAL_BASE,
                        ) * TITLE_CONTAINER_TIMES_VERTICAL_PADDING
                    }px ${
                        parseInt(
                            MainTheme.dimensions.padding.container as string,
                            DECIMAL_BASE,
                        ) * TITLE_CONTAINER_TIMES_HORIZONTAL_PADDING
                    }px`}
                >
                    <Paragraph bold>{titleText}</Paragraph>
                    <Paragraph size="small" bold>
                        {titleDescription}
                    </Paragraph>
                </TitleContainer>
                <ItemsContainer>{renderItems(dataItems)}</ItemsContainer>
                <ButtonsContainer margin="15px">
                    <LeftButtonsContainer>
                        <Button onClick={cancel} margin="0 5px">
                            {cancelButtonText}
                        </Button>
                        <Button primary onClick={applyChanges} margin="0 5px">
                            {applyButtonText}
                        </Button>
                    </LeftButtonsContainer>
                    <Button primary onClick={doBatchUpdate}>
                        {batchUpdateButtonText}
                    </Button>
                </ButtonsContainer>
            </Modal>
            <Modal
                state={[isShownBatchUpdateModal, setIsShownBatchUpdateModal]}
                width="fit-content"
                padding={`${
                    parseInt(
                        MainTheme.dimensions.padding.container as string,
                        DECIMAL_BASE,
                    ) * TIMES_BATCH_UPDATE_MODAL_PADDING
                }px`}
            >
                <BatchUpdateModalContent
                    setIsBatchUpdateModalShown={setIsShownBatchUpdateModal}
                    cancelBatchUpdateButtonText={cancelButtonText}
                    applyBatchUpdateButtonText={applyButtonText}
                    setDataItems={setDataItems}
                    dataItems={dataItems}
                    {...props}
                />
            </Modal>
        </>
    );
};

interface IBaseContainerProps extends MainInterface {}

const BaseContainer = styled.div<IBaseContainerProps>`
    ${Main}
`;

const Paragraph = styled(P)`
    color: ${MainTheme.colors.background};
`;

const TitleContainer = styled(BaseContainer)`
    background-color: ${MainTheme.colors.statusColors.red};
    opacity: ${TITLE_CONTAINER_OPACITY};
`;

const Modal = styled(M)`
    ${Mixins.flex('column', 'space-between', 'center')}
`;

const ButtonsContainer = styled(BaseContainer)`
    ${Mixins.flex('space-around')}
    min-width:100%;
`;

const LeftButtonsContainer = styled(BaseContainer)`
    ${Mixins.flex('space-around')}
`;

const ItemsContainer = styled(BaseContainer)`
    min-width: ${ITEMS_CONTAINER_MIN_WIDTH}px;
`;

interface IItemRedemptionPoints {
    index: number;
    dataItems: IData[];
    setDataItems: React.Dispatch<React.SetStateAction<IData[]>>;
}

const ItemRedemptionPoints: React.FC<IItemRedemptionPoints> = ({
    index,
    dataItems,
    setDataItems,
}): React.ReactElement => {
    /**
     * updates the dataItems state based on the input value for redemption points of the data item specified by index
     * @param event {React.ChangeEvent<HTMLInputElement>} - the event fired by input element
     */
    const updateRedemptionPoints = useCallback(
        ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            let value = parseInt(target.value, DECIMAL_BASE);
            if (value < NOT_REDEEMABLE) value = NOT_REDEEMABLE;
            setDataItems((_dataItems) => {
                const newDataItems: IData[] = [];
                _dataItems.forEach((dataItem, _index) => {
                    newDataItems.push({ ...dataItem });
                    if (index === _index) {
                        newDataItems[index].redemptionPoints = value;
                    }
                });
                return newDataItems;
            });
        },
        [index, setDataItems],
    );

    return (
        <Card margin="10px" padding="0">
            <ItemCardContentContainer
                padding={MainTheme.dimensions.padding.container}
            >
                <DotNameContainer margin="0 10px 0 0">
                    <Dot redemptionPoints={dataItems[index].redemptionPoints} />
                    <P bold size="small" margin="0 0 0 10px">
                        {dataItems[index].name}
                    </P>
                </DotNameContainer>
                <Input
                    type="number"
                    value={dataItems[index].redemptionPoints}
                    onChange={updateRedemptionPoints}
                    width={INPUT_WIDTH}
                    error
                />
            </ItemCardContentContainer>
        </Card>
    );
};

const ItemCardContentContainer = styled(BaseContainer)`
    ${Mixins.flex('space-between', 'center')}
`;

interface IDotProps {
    redemptionPoints: number;
}

const Dot = styled.div<IDotProps>`
    ${({ redemptionPoints }): string => `
background-color:${
        redemptionPoints === 0
            ? MainTheme.colors.statusColors.red
            : MainTheme.colors.statusColors.green
    };
`}
    width:18px;
    height: 18px;
    border-radius: 50%;
`;

const DotNameContainer = styled(BaseContainer)`
    ${Mixins.flex('flext-start', 'center')}
`;

interface IBatchUpdateModalContentProps {
    cancelBatchUpdateButtonText: string;
    applyBatchUpdateButtonText: string;
    setIsBatchUpdateModalShown: React.Dispatch<React.SetStateAction<boolean>>;
    applyToAllItemsText: string;
    setDataItems: React.Dispatch<React.SetStateAction<IData[]>>;
    dataItems: IData[];
}

const BatchUpdateModalContent: React.FC<IBatchUpdateModalContentProps> = ({
    cancelBatchUpdateButtonText,
    applyBatchUpdateButtonText,
    setIsBatchUpdateModalShown,
    applyToAllItemsText,
    setDataItems,
    dataItems,
}): React.ReactElement => {
    const [redemptionPoints, setRedemptionPoints] = useState(NOT_REDEEMABLE);

    /**
     * sets the redemptionPoints value based on the value of the input field
     * @param event {React.ChangeEvent<HTMLInputElement>} - the event fired by input element
     */
    const updateRedemptionPoints = useCallback(
        ({ target }: React.ChangeEvent<HTMLInputElement>) => {
            let value = parseInt(target.value, DECIMAL_BASE);
            if (value < NOT_REDEEMABLE) value = NOT_REDEEMABLE;
            setRedemptionPoints(value);
        },
        [setRedemptionPoints],
    );

    /**
     * closes batch update modal
     */
    const closeBatchUpdateModal = useCallback(() => {
        setIsBatchUpdateModalShown(false);
    }, [setIsBatchUpdateModalShown]);

    /**
     * applyes the value redemptionPoints to all data items and closes batch update modal
     */
    const onBatchUpdate = useCallback(() => {
        const newDataItems: IData[] = [];
        dataItems.forEach((dataItem) => {
            newDataItems.push({ ...dataItem, redemptionPoints });
        });
        setDataItems(newDataItems);
        closeBatchUpdateModal();
    }, [redemptionPoints, dataItems, setDataItems, closeBatchUpdateModal]);

    return (
        <RootContainer>
            <RedCard margin="0 0 10px 0">
                <ApplyToAllItemsCardContentContainer>
                    <Paragraph bold size="small" margin="0 10px 0 0">
                        {applyToAllItemsText}
                    </Paragraph>
                    <Input
                        type="number"
                        width={INPUT_WIDTH}
                        value={redemptionPoints}
                        onChange={updateRedemptionPoints}
                    />
                </ApplyToAllItemsCardContentContainer>
            </RedCard>
            <BatchUpdateButtonsContainer margin="10px 0 0 0">
                <Button onClick={closeBatchUpdateModal} margin="0 10px 0 0">
                    {cancelBatchUpdateButtonText}
                </Button>
                <Button primary onClick={onBatchUpdate}>
                    {applyBatchUpdateButtonText}
                </Button>
            </BatchUpdateButtonsContainer>
        </RootContainer>
    );
};

const RedCard = styled(Card)`
    background-color: ${MainTheme.colors.statusColors.red};
    min-width: ${RED_CARD_MIN_WIDTH}px;
`;

const ApplyToAllItemsCardContentContainer = styled(ItemCardContentContainer)``;

const RootContainer = styled(BaseContainer)`
    ${Mixins.flex('column')}
`;

const BatchUpdateButtonsContainer = styled(BaseContainer)`
    ${Mixins.flex('center')}
`;
