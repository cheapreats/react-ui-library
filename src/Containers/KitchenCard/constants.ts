export interface Choice{
    name: string;
    choice_type: string;
}

export interface ItemModifier {
    name?: string;
    choices: Choice[];
}

export interface Item {
    name: string;
    modifiers: ItemModifier[];
}
export enum ModifierChoiceTypeEnum {
    ADD = 'ADD',
    NO = 'NO',
    DEFAULT = 'DEFAULT'
}