import { Length, GLOBAL, STATIC, RELATIVE, ABSOLUTE, FIXED, STICKY, VariableProperties } from '@artistry/abstract';

type Position = GLOBAL | typeof STATIC | typeof RELATIVE | typeof ABSOLUTE | typeof FIXED | typeof STICKY;

export interface IPositionSettings {
    position?: Position;
    top?: Length | 0;
    right?: Length | 0;
    bottom?: Length | 0;
    left?: Length | 0;
}

export function Position({
    position = STATIC,
    top,
    right,
    bottom,
    left
}: IPositionSettings = {}): VariableProperties {
    return {
        position: position,
        top,
        right,
        bottom,
        left
    };
}