/**
 * Positioning with defaulting built in
 * @param {string} [value='absolute'] - The CSS positioning used
 * @param {number|string} [margin=0] - The margin used
 * @param {number|string} [top='auto'] - CSS top attribute
 * @param {number|string} right - CSS right attribute (Defaults to top)
 * @param {number|string} bottom - CSS bottom attribute (Defaults to top)
 * @param {number|string} left - CSS left attribute (Defaults to right)
 * @returns {string} Styling for consistent and stable positioning
 */

interface PositionArgs{
    value?: string;
    margin?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
}

enum SideBarCollapseType {
    LEFT = "left",
    RIGHT = "right",
    NONE = "none"
}

interface WrapperDirectionProps {
        toggle: PositionArgs;
        wrapper: PositionArgs;
        translation: string; 
        isLeft: boolean;
}

interface WrapperPosition {
    left: WrapperDirectionProps;
    right: WrapperDirectionProps;
    none: WrapperDirectionProps;
} 

const WrapperPos: WrapperPosition = {
    left: {
        wrapper: {value:'absolute', margin:'auto', top:0, right:'auto', bottom: 0, left:0},
        toggle: {value: 'absolute', margin:0, top:'20px', right:'-32px', bottom:'auto', left:'auto'},
        isLeft: true,
        translation: '-100%'
    },
    right: {
        wrapper: {value:'absolute', margin:'auto', top:0, right:0, bottom: 0, left:'auto'},
        toggle: {value: 'absolute', margin:0, top:'20px', right:'auto', bottom:'auto', left:'-32px'},
        isLeft: false,
        translation: '100%'
    },
    none: {
        wrapper: {value: 'absolute', margin:0, top:'auto', right:'auto', bottom:'auto', left:'auto'},
        toggle: {value: 'absolute', margin:0, top:'auto', right:'auto', bottom:'auto', left:'auto'},
        isLeft: false,
        translation: ''
    }
}



export { PositionArgs, WrapperPos, SideBarCollapseType };