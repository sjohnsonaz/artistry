import { AlignContentProperty, FlexDirectionProperty, AlignSelfProperty, JustifySelfProperty } from 'csstype'
import { VariableProperties, INLINE_FLEX, FLEX, ROW, AlignItemsProperty, JustifyContentProperty } from '@artistry/abstract';

export interface IFlexContainerProps {
    inline?: boolean;
    direction?: FlexDirectionProperty;
    align?: AlignItemsProperty;
    alignContent?: AlignContentProperty;
    justify?: JustifyContentProperty;
}

export function FlexContainer({
    inline = false,
    direction = ROW,
    align,
    alignContent
}: IFlexContainerProps = {}): VariableProperties {
    return {
        display: inline ? INLINE_FLEX : FLEX,
        flexDirection: direction,
        alignItems: align,
        alignContent
    };
}

export interface IFlexElementProps {
    grow?: number;
    shrink?: number;
    align?: AlignSelfProperty;
    justify?: JustifySelfProperty;
}

export function FlexElement({
    grow = 0,
    shrink = 0,
    align,
    justify
}: IFlexElementProps = {}): VariableProperties {
    return {
        flexGrow: grow,
        flexShrink: shrink,
        alignSelf: align,
        justifySelf: justify
    };
}