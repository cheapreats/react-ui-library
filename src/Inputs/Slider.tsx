import React,{useLayoutEffect,useRef, RefObject,MouseEvent} from 'react';
import styled from 'styled-components';
import { LabelLayout, LabelLayoutProps } from '@Layouts';
import {DefaultTheme} from 'styled-components';
import {Popup} from '../../src';

interface MarkProps {
    key: number;
    mark: string;
}

export interface SliderProps extends LabelLayoutProps {
    theme: DefaultTheme;
    max?: number;
    min?: number;
    step?: number;
    disabled?: boolean;
    value?: number;
    valuestart?:number;
    marks?:MarkProps[];
    rail?:boolean;
    twoinputs?:boolean;
    popup?:boolean;
    popupleft?:number;
    popuptop?:number;
    popupwidth?:number;
    popupheight?:number;
}


export const Slider: React.FunctionComponent<SliderProps> = ({
    children,
    disabled,
    rail,
    twoinputs,
    value,
    valuestart,
    popup,
    step,
    marks,
    min,
    max,
    popupleft=-17,
    popuptop=-51,
    popupwidth="auto",
    popupheight=30,
    ...props
}): React.ReactElement =>{  

    const barRef = useRef() as RefObject<HTMLDivElement>;
    
    const translateToPixels = (theValue:number|undefined, scale:number|undefined, maximum:number|undefined, minimum:number) : string =>{
        const maxmindifference = (maximum as number - minimum as number) as number;
        const pixelTranslator = scale as number / maxmindifference;

        return ((theValue as number - minimum as number) * pixelTranslator) + "px";
    }

    const translateToValue=(theValue:number, scale:number, maximum:number|undefined, minimum:number, step:number)=>{
        return Math.round((((theValue * (maximum as number - minimum)) / scale) + minimum) / step) * step;
    }

    const calculatePosition = (theValue:number, scale:number, maximum:number|undefined, minimum:number, step:number) =>{
        return translateToPixels(translateToValue(theValue,scale,maximum,minimum,step),scale,maximum as number|undefined,minimum);
    }
    useLayoutEffect(():void => {
        if (null !== barRef.current){
            const bar = barRef.current as HTMLElement;

            const selectedBar = bar.firstChild as HTMLElement;
            const finishThumb = bar.lastChild as HTMLElement;
            const startThumb = finishThumb.previousElementSibling as HTMLElement;
            const childrenbar = bar.nextElementSibling as HTMLElement;

            const clientwidth = bar.clientWidth;

            const maxinpixels = translateToPixels(max,clientwidth,max,min as number);
                    


            finishThumb.style.left = translateToPixels(value,clientwidth,max,min as number);
            startThumb.style.left = translateToPixels(valuestart,clientwidth,max,min as number);
            selectedBar.style.left = startThumb.style.left;
            selectedBar.style.width = twoinputs ? (parseInt(finishThumb.style.left) - parseInt(startThumb.style.left)) +"px" :(parseInt(finishThumb.style.left)) + "px";

            bar.style.width = maxinpixels;
            childrenbar.style.width = bar.style.width;


            const theChildren = childrenbar.children as any ;

            theChildren.forEach((child:HTMLElement)=>{
                console.log(typeof(child));
                child.style.left=translateToPixels(parseInt(child.style.left),clientwidth,max,min as number);
            });

            finishThumb.style.zIndex = "1";
            startThumb.style.zIndex = "1";
        }
    },[]);

    const handleMouseDown=(e:MouseEvent)=>{
        if (!disabled) {
        
          let thumb = e.target as HTMLElement;
          let bar = thumb.parentElement as HTMLElement;
          let selectedbar = bar.firstChild as HTMLElement;
          let shiftX = e.clientX - thumb.getBoundingClientRect().left;

          document.addEventListener('mousemove', onMouseMove as any);     
          document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(theevent:MouseEvent) {
            let newLeft = theevent.clientX - shiftX - bar.getBoundingClientRect().left;
            if (newLeft < 0) {
                newLeft = 0;
            }

            let rightEdge = bar.clientWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            const barwidth = bar.clientWidth;

            if (twoinputs){

                if (thumb.previousElementSibling == selectedbar) {
                    let currentLeftofNextThumb = (window.getComputedStyle(thumb.nextElementSibling as HTMLElement, "").left);

                    if (newLeft > parseInt(currentLeftofNextThumb)) {
                        newLeft = (parseInt(currentLeftofNextThumb) -1);
                    }

                    if (newLeft == bar.clientWidth) {
                        thumb.style.zIndex = (thumb.nextElementSibling as HTMLElement).style.zIndex + 1;
                    }
                    selectedbar.style.left = calculatePosition(newLeft, barwidth, max, min as number, step as number);
                    let newWidth = parseInt(currentLeftofNextThumb) - parseInt(selectedbar.style.left);
                    selectedbar.style.width = newWidth+'px';
                }
                else{

                    let currentLeftofPreviousThumb = (window.getComputedStyle(thumb.previousElementSibling as HTMLElement,"").left);
                    
                    if (newLeft < parseInt(currentLeftofPreviousThumb)) {
                        newLeft = (parseInt(currentLeftofPreviousThumb));
                    }

                    if (newLeft == 0) {
                        thumb.style.zIndex = (thumb.previousElementSibling as HTMLElement).style.zIndex + 1;
                    }

                    let newWidth = parseInt(calculatePosition(newLeft, barwidth, max, min as number, step as number)) - parseInt(currentLeftofPreviousThumb) ;
                    selectedbar.style.width = newWidth + 'px';
                }
            }
            else{
                selectedbar.style.width = calculatePosition(newLeft, barwidth, max, min as number, step as number);
            }

            
            if (popup){
                let popUpContainer = (thumb.firstChild as HTMLElement).firstChild as HTMLElement;
                (popUpContainer.textContent as string|number) = translateToValue(newLeft, barwidth, max, min as number, step as number);    
            }
            
            thumb.style.left = calculatePosition(newLeft, barwidth, max, min as number, step as number);

          } 
        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove as any ) ;
          }
        }
      }
return(
    <LabelLayout {...props}>
        <SliderBoard ref = {barRef} disabled = {disabled}>
            <SliderBoardSelected disabled = {disabled} rail = {rail}>
            </SliderBoardSelected>

            { twoinputs && (

                <SliderThumbStart
                                disabled = {disabled} 
                                onMouseDown = {(event):void => 
                                handleMouseDown(event as MouseEvent)}>

                    {popup && (
                    <Popup top={popuptop} 
                            left={popupleft} 
                            width={popupwidth} 
                            height={popupheight}>

                        {valuestart}
                    </Popup>)}
                
                </SliderThumbStart> )
            }

            <SliderThumb 
                        disabled={disabled} 
                        twoinputs={twoinputs}
                        onMouseDown={(event):any => handleMouseDown(event as MouseEvent)} >
                {popup && (<Popup   top={popuptop} 
                                    left={popupleft} 
                                    width={popupwidth} 
                                    height={popupheight}>
                                {value}
                            </Popup>)}
            </SliderThumb>
        </SliderBoard>
            {marks && (<SliderBoardMarks>  
                            {marks.map(
                                ({ key, mark }): React.ReactElement => (
                                    <div style={{position:'absolute', left:`${key}px`}}>
                                        {mark}
                                    </div>
                                ),
                            )}
                        </SliderBoardMarks> 
                )} 


    </LabelLayout>
);};

Slider.defaultProps = {
    step:1,
    min:0,
    max:100,
    value:0,
  };

const SliderBoard = styled.div<SliderProps>`
        width: 100%;
        height: 4px;
        animate: 0.2s;
        background: #e9e9e9;
        cursor:pointer;
        ${({ theme }): string => `
            border-radius: ${theme.dimensions.radius};
            box-shadow: ${theme.depth[1]};
        `}
        // Disabled
        ${({ disabled }): string =>
            disabled
                ? `
            cursor: not-allowed;
            opacity: 0.6;
        `
                : ''}
        `;

const SliderBoardSelected = styled.div<SliderProps>`
        top:1px;
        height: 4px;
        animate: 0.2s;
        position:relative;
        ${({ theme,rail }): string => `
            border-radius: ${theme.dimensions.radius};
            box-shadow: ${theme.depth[1]};
            background: ${rail ? theme.colors.primary : '#e9e9e9' };
        `}
        ${({ disabled }): string =>
        disabled
            ? `
        cursor: not-allowed;
        opacity: 0.6;
    `
            : ''}
        `;

        const SliderBoardMarks = styled.div<SliderProps>`
        display:flex;
        width: 100%;
        animate: 0.2s;
        position:relative;
        font-weight:bold;
        top:6px;
        ${({ disabled }): string =>
            disabled
                ? `
            cursor: not-allowed;
            opacity: 0.6;
        `
                : ''}
                ${({ theme }): string => `
                border-radius: ${theme.dimensions.radius};
                box-shadow: ${theme.depth[1]};
            `}
        `;

    
const SliderThumb = styled.div<SliderProps>`
        width: 14px;
        height: 14px;
        border-radius: 50%;
        position: relative;
        ${({ twoinputs }): string =>
        twoinputs
        ? `
         top: -21px;
`
        : 'top: -7px; '}

        
        cursor: grab;
        ${({ theme }): string => `
            background: ${theme.colors.primary};
        `}
        &:active {
            border: solid 2px #96dbfa;
            cursor: grabbing;
        }
        ${({ disabled }): string =>
        disabled
            ? `
        cursor: not-allowed;
        opacity: 0.6;
    `
            : ' '}
        `;

const SliderThumbStart = styled.div<SliderProps>`
        width: 14px;
        height: 14px;
        border-radius: 50%;
        position: relative;
        top: -7px;
        cursor: grab;
        title:startthumb;
        ${({ disabled }): string =>
        disabled
            ? `
        cursor: not-allowed;
        opacity: 0.6;
    `
            : ' '}
        ${({ theme }): string => `
            background: ${theme.colors.primary};
        `}
        &:active {
            border: solid 2px #96dbfa;
            cursor: grabbing;
        }`;


        

export default Slider;