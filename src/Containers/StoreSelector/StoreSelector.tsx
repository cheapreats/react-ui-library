import React, { useState } from 'react';
import styled from 'styled-components';
import { PersonSquare } from '@styled-icons/bootstrap/PersonSquare';
import { ChevronDown } from '@styled-icons/bootstrap/ChevronDown';
import { ChevronUp } from '@styled-icons/bootstrap/ChevronUp';

export enum VendorApprovalStatus {
    /* Vendor is not approved, referenced by 0  */
    NOT_APPROVED,
    /* Vendor status is pending, referenced by 1 */
    PENDING,
    /* Vendor status is approved, referenced by 2 */
    APPROVED,
}

export interface StoreSelectorArrayProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Name of the shop */
    storeSelectorName: string,
    /* Id of the store, servers as array key */
    storeSelectorId: number,
    /* Status of the store, border changes colour depnding on sates */
    storeStatus: VendorApprovalStatus,
}

export interface StoreSelectorProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /* Store name, store ID, and store status used from storeSelectorProps */
    storeProfileData: StoreSelectorArrayProps[];
    /* For use of VendorApprovalStatus from current object */
    storeBorderStatus?: VendorApprovalStatus,
    /* Toggles the up arrow and up arrow click action */
    upArrowEnabled?: boolean,
    /* Toggles the down arrow and down click action */
    downArrowEnabled?: boolean,
    /* General onclick handler */
    onClickArrows?: () => void,
    /* Up arrow click handler */
    onClickUp?: () => void,
    /* Down arrow click handler */
    onClickDown?: () => void, 
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({
    storeProfileData,
    onClickArrows,
    onClickUp,
    onClickDown,
    downArrowEnabled,
    upArrowEnabled, 
    ...props
}): React.ReactElement => {
    const [currentIndex, setCurrentIndex] = useState(0);
    /* Gets the props for the current store by comparing its storeSelectorId to the current index state */
    const currentCardObject = storeProfileData.find(storeProfile => storeProfile.storeSelectorId === currentIndex);
    /**
    * Takes the state, and increases the value by 1 conditionally. 
    * If the value is equal to the size of the array, then the value gets set to the bottom of the array instead (loops back around)
    * @param currentIndex - Stateful value, used to get the current object of the array
    * @param setCurrentIndex - Function to update currentIndex stateful value
    * @param storeProfileData - Array that currentIndex is used on
    */
    const indexIncrease = () => {
        let indexIncreaseVar = currentIndex;
        if (indexIncreaseVar === storeProfileData.length - 1) {
            indexIncreaseVar -= storeProfileData.length - 1
        } else {
            indexIncreaseVar += 1   
        }
        setCurrentIndex(indexIncreaseVar);
    }
    /**
     * Takes the state, and decreases the value by 1 conditionally.
     * If the value is equal to 0, then value gets set to the top of the array instead (loops back around)
     * @param currentIndex - Stateful value, used to get the current object of the array
     * @param setCurrentIndex - Function to update that stateful value
     * @param storeProfileData - Array that currentIndex is used on
     */
    const indexDecrease = () => {
        let indexDecreaseVar = currentIndex;
        if (indexDecreaseVar === 0) {
            indexDecreaseVar += storeProfileData.length - 1
        } else {
            indexDecreaseVar -= 1
        }
        setCurrentIndex(indexDecreaseVar);
    }
    /**
    * Returns text based on vendorApprovalStatus of the array. 
    * @param storeBorderStatus - Value of current object's VendorApprovalStatus 
    */
    const storeAccessibilitySwitch = (storeBorderStatus: VendorApprovalStatus | undefined) => {
        switch (storeBorderStatus) {
        case VendorApprovalStatus.APPROVED:
            return "Approved!";
        case VendorApprovalStatus.PENDING:
            return "Pending";
        default:
            return "Not Approved";
        }
    }
    return (
        <StoreSelectorBox {...props}>
            <StoreTextFlex>
                <StoreSelectorText>{currentCardObject?.storeSelectorName}</StoreSelectorText>
                <StoreSelectorTextFaded>Super Dashboard</StoreSelectorTextFaded>
                <StoreAccessibilityText>Store: {currentIndex}. Status: {storeAccessibilitySwitch(currentCardObject?.storeStatus)} </StoreAccessibilityText>
            </StoreTextFlex>
            <StoreSelectorBorder storeProfileData={storeProfileData} storeBorderStatus={currentCardObject?.storeStatus} />
            <ShopUser />
            <ArrowsDiv downArrowEnabled={downArrowEnabled} upArrowEnabled={upArrowEnabled}
                storeProfileData={storeProfileData} onClick={downArrowEnabled || upArrowEnabled ? undefined : onClickArrows}>
                <UpArrowDiv upArrowEnabled={upArrowEnabled} storeProfileData={storeProfileData} onClick={onClickUp}>
                    <SelectorArrowUp onClick={() => indexIncrease()} />
                </UpArrowDiv>
                <DownArrowDiv downArrowEnabled={downArrowEnabled} storeProfileData={storeProfileData} onClick={onClickDown}>
                    <SelectorArrowDown onClick={() => indexDecrease()} />
                </DownArrowDiv>
            </ArrowsDiv>
        </StoreSelectorBox>
    )
};

const StoreSelectorBox = styled.div`
    width: 350px; 
    height: fit-content;
    min-height: 100px;
    border-style: solid;
    border-width: 2px;
    position: relative;
    border-radius: 20px;
    ${({ theme }): string => `
        background-color: ${theme.colors.background};
        border-color: ${theme.colors.border};
    `}
`;

const StoreSelectorBorder = styled.div<StoreSelectorProps>`
    width: 70px;
    height: 70px;
    border-style: solid;
    border-width: 5px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 15px;
    border-color: ${({ theme, storeBorderStatus }): string => {
        switch (storeBorderStatus) {
        case VendorApprovalStatus.APPROVED:
            return theme.colors.reachIndicatorColors.green
        case VendorApprovalStatus.PENDING:
            return theme.colors.reachIndicatorColors.yellow
        default:
            return theme.colors.reachIndicatorColors.red
        }
    }
};
`;

const ArrowsDiv = styled.div<StoreSelectorProps>`
    padding: 5px;
    right: 10px;
    top: 20px; 
    position: absolute;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    padding-top: 5px;
    padding-bottom: 5px;
    };
`;

const UpArrowDiv = styled.div<StoreSelectorProps>`
    pointer-events: ${({upArrowEnabled}) => upArrowEnabled ? `auto` : `none` };
`;

const SelectorArrowUp = styled(ChevronUp)`
    height: 25px;
    width: 25px;
`;

const DownArrowDiv = styled.div<StoreSelectorProps>`
     pointer-events: ${({downArrowEnabled}) => downArrowEnabled ? `auto` : `none` }; 
`;

const SelectorArrowDown = styled(ChevronDown)`
    height: 25px;
    width: 25px;
`;

const StoreTextFlex = styled.div`
    padding: 20px 45px 10px 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StoreSelectorText = styled.header`
    font-weight: bold;
    font-size: 20px;
    ${({ theme }): string => `
        color: ${theme.colors.text}
    `}
`;

const StoreSelectorTextFaded = styled(StoreSelectorText)`
    font-size: 12px;
    ${({ theme }): string => `
        color: ${theme.colors.bannerBackgroundColor}
    `}
`;

const StoreAccessibilityText = styled(StoreSelectorText)`
    font-size: 13px;
`;

const ShopUser = styled(PersonSquare) `
    width: 60px;
    height: 60px;
    position: absolute;
    top: 20px;
    left: 20px;
`;

