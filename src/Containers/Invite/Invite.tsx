import React from 'react'; 
import styled from 'styled-components';
import Button from '@Inputs/Button/Button';
import Input from '@Inputs/Input/Input';
import Textarea from '@Inputs/Textarea/Textarea';
import { flex, media, transition } from '@Utils/Mixins';
import { Heading, Paragraph, SmallText } from '../../index'; 
import { ChevronRight } from "@styled-icons/bootstrap/ChevronRight";
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight";

export interface InviteProps { 
    title: string;
    heading: string;
    description: string;
    footer: string;
    buttonText: string; 
    inviteArgs: any[]; 
}
export const Invite: React.FC<InviteProps> = ({ 
    title,
    heading,
    description,
    footer,
    buttonText,
    inviteArgs,
    ...args
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
                <FormGroup key={item}>
                    <Label>{item.label}</Label> 
                    <IDiv>
                        <Input 
                            placeholder={item.placeholder}
                            value={''}
                        /> 
                    </IDiv>   
                </FormGroup>                     
                :      
                <FormGroup key={item}>              
                    <Label>
                        {item.label}
                        <Paragraph color="">{item.subLabel}</Paragraph>
                    </Label> 
                    <IDiv>
                        <Textarea 
                                rows="3"
                                placeholder={item.placeholder}
                                value={''}
                                onChange={''}                     
                            />
                    </IDiv>
                </FormGroup>  
            ),
        )
    };

    return (
        <Wrapper>
            <Row {...args}>
                <Col>
                    <Heading color="primary" type="h5" bold>{title}</Heading>
                    <Heading type="h1" bold>{heading}</Heading>
                    <Paragraph>{description}</Paragraph>
                </Col>
                <Col>  
                    <Form>
                        {formFields()}
                        <FormButton>
                            <IButton> 
                                {buttonText}
                                <IChevronRight />
                                <IArrowRight />
                            </IButton>
                        </FormButton>
                    </Form>
                    <FormFooter>
                        <SmallText >{footer}</SmallText>
                    </FormFooter>
                </Col>
            </Row>
        </Wrapper>
    );
};

/** styled */
const Wrapper = styled.div`
    padding: 1rem;
`;
const Row = styled.div`
    margin-bottom: .6rem;
    ${flex('row')}
    ${media('phone', 'flex-direction: column;')}
`;
const Col = styled.div`
    flex: 1;
`;
const FormFooter = styled.div`
    padding: 1rem;
`;
/** inviteArgs */
const Form = styled.form`
    padding: 1rem;
    align-items: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.occupancyStatusColors.Occupied};
`;
const FormGroup= styled.form`
    margin-bottom: .6rem;
    ${flex('row')}
    ${media('phone', 'flex-direction: column;')}
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
`;
const IArrowRight = styled(ArrowRight)`
    ${transition(['width', '1s'])}
    display: none; 
    width: 0;
    margin-left: -10px;
`;
const FormButton = styled.div`
    ${flex('row', 'flex-end')};
    ${media('phone', 'justify-content: flex-start;')} 
`;
const IButton = styled(Button)`
    &:hover ${IChevronRight} {
        display: none;
    }
    &:hover ${IArrowRight} {
        display: inline-block;
        width: 15px; 
        margin-left: 10px;
    }
`;