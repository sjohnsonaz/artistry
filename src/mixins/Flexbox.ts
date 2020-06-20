import { VariableProperties, INLINE_FLEX, FLEX, ROW, COLUMN, COLUMN_REVERSE, ROW_REVERSE, GLOBAL } from '@artistry/abstract';

type Direction = GLOBAL | typeof ROW | typeof COLUMN | typeof COLUMN_REVERSE | typeof ROW_REVERSE;

export interface IFlexContainerSettings {
    inline?: boolean;
    direction?: Direction;
}

export function FlexContainer({
    inline = false,
    direction = ROW,
}: IFlexContainerSettings = {}): VariableProperties {
    return {
        display: inline ? INLINE_FLEX : FLEX,
        flexDirection: direction,
    };
}

export interface IFlexElementSettings {
    grow?: number;
    shrink?: number;
}

export function FlexElement({
    grow = 0,
    shrink = 0
}: IFlexElementSettings = {}): VariableProperties {
    return {
        flexGrow: grow,
        flexShrink: shrink
    };
}