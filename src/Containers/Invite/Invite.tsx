import React from 'react'; 
import styled from 'styled-components';
import Button from '@Inputs/Button/Button';
import Input from '@Inputs/Input/Input';
import Textarea from '@Inputs/Textarea/Textarea';
import { flex, media } from '@Utils/Mixins';
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight";
import { Heading, Paragraph, SmallText } from '../../index'; 

export interface InviteProps { 
    title: string;
    heading: string;
    description: string;
    footer: string;
    buttonText: string; 
    inviteArgs: {
        label: string;
        placeholder: string;
        type: string;
        subLabel?: string;
    }[]; 
}
export const Invite: React.FC<InviteProps> = ({ 
    title,
    heading,
    description,
    footer,
    buttonText,
    inviteArgs
}) => {
    /**
     * @returns all elements of inviteArgs
     */
    const formFields = (): React.ReactElement[] => {
        /**
        * get the last key 
        */
        const lastKey = inviteArgs.length - 1;
        return inviteArgs.map(
            (item, key ): React.ReactElement => (
                (key !== lastKey) ? 
                    <FormGroup>
                        <Label>{item.label}</Label> 
                        <IDiv>
                            <Input 
                                placeholder={item.placeholder}
                                value=""
                            /> 
                        </IDiv>   
                    </FormGroup>                     
                    :      
                    <FormGroup>              
                        <Label>
                            {item.label}
                            <Paragraph color="">{item.subLabel}</Paragraph>
                        </Label> 
                        <IDiv>
                            <ITextarea 
                                rows="3"
                                placeholder={item.placeholder}
                                value=""
                                onChange=""                     
                            />
                        </IDiv>
                    </FormGroup>  
            ),
        )
    };

    return ( 
        <Row>
            <Col>
                <Heading color="primary" type="h5" bold>{title}</Heading>
                <Heading type="h1" bold>{heading}</Heading>
                <Paragraph>{description}</Paragraph>
            </Col>
            <Col>  
                <Form>
                    {formFields()} 
                    <FormGroup> 
                        <IButton> 
                            {buttonText}
                            <IChevronRight />
                            <IArrowRight />
                        </IButton> 
                    </FormGroup> 
                </Form>
                <FormFooter>
                    <SmallText >{footer}</SmallText>
                </FormFooter>
            </Col>
        </Row> 
    );
};

/** styled */ 
const Row = styled.div`
    margin-bottom: .6rem;
    ${flex('row')}
    ${media('phone', 'flex-direction: column;')}
`;
const Col = styled.div`
    flex: 1;
`;
const FormFooter = styled.div`
    padding: 1rem;z
`;
/** inviteArgs */
const Form = styled.form`
    padding: 1rem;
    align-items: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.occupancyStatusColors.Occupied};
    ${media('phone', 'margin-top: 1rem;')}
`;
const FormGroup= styled.div`
    margin-bottom: .6rem;
    ${flex('row')};
    &:last-child {
        ${flex('flex-end')};
        ${media('phone', 'align-items: flex-start;')};
    }
    ${media('phone', 'flex-direction: column;')};
`;
const Label = styled.div`
    flex: 35%;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.input.default};
`;
const IDiv = styled.div`
    width: 100%;
`;
const IChevronRight = styled(ChevronRight)` 
    width: 12px;
    margin-left: 5px;
    animation: SlideLeft .6s forwards;
    @keyframes SlideLeft {        
        0% {transform: translateX(5px);}
        100% {transform: translateX(0px);}
    }
`;
const IArrowRight = styled(ArrowRight)`
    display: none; 
    margin-left: 5px;
    animation: SlideRight .6s forwards;
    @keyframes SlideRight {        
        0% {width: 5px;}
        100% {width: 15px;}
    }
`;
const ITextarea = styled(Textarea)`
    min-height: 2.8rem;
`;
const IButton = styled(Button)`
    &:hover ${IChevronRight} {
        display: none;
    }
    &:hover ${IArrowRight} {
        display: inline-block;
        width: 15px;       
    }
`;