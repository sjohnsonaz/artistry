import ClassNames from "./ClassNames";

export type AlignType = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

export function alignClass(align: AlignType, classNames: ClassNames) {
    switch (align) {
        case 'start':
            classNames.add('align-start');
            break;
        case 'end':
            classNames.add('align-end');
            break;
        case 'left':
            classNames.add('align-left');
            break;
        case 'right':
            classNames.add('align-right');
            break;
        case 'center':
            classNames.add('align-center');
            break;
        case 'justify':
            classNames.add('align-justify');
            break;
        case 'initial':
            classNames.add('align-initial');
            break;
        case 'inherit':
            classNames.add('align-inherit');
            break;
    }
}