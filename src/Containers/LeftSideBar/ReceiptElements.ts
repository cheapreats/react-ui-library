export interface IDraggableComponent {
    [key: string]: {
        key: string;
        field: string;
        isRequired: boolean;
        isRecommended: boolean;
    };
}

export interface ICategoryInterface {
    key: string;
    editorCategory: string;
    draggableComponents: IDraggableComponent;
}

export interface ILeftSideBarInterface {
    textElements: ICategoryInterface;
    imageElements: ICategoryInterface;
    layoutElements: ICategoryInterface;
    numberElements: ICategoryInterface;
    priceElements: ICategoryInterface;
    codesElements: ICategoryInterface;
    settingsElements: ICategoryInterface;
}

export interface IElementWithCategory {
    editorCategory: string;
    field: string[];
}
