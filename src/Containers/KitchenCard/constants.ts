export interface ModifierChoiceInput {
    name: string;
    choice_type: string;
}
export interface OrderModifier {
    name?: string;
    choices: ModifierChoiceInput[];
}
export interface OrderItem {
    name: string;
    modifiers: OrderModifier[];
}
export enum ModifierChoiceTypeEnum {
    ADD = 'ADD',
    NO = 'NO',
    DEFAULT = 'DEFAULT',
}
