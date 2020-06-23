import { AlignContentProperty, FlexDirectionProperty, JustifySelfProperty } from 'csstype'
import { VariableProperties, INLINE_FLEX, FLEX, AlignItemsProperty, AlignSelfProperty, JustifyContentProperty } from '@artistry/abstract';

export interface IFlexContainerProps {
    inline?: boolean;
    direction?: FlexDirectionProperty;
    align?: AlignItemsProperty;
    alignContent?: AlignContentProperty;
    justify?: JustifyContentProperty;
}

export function FlexContainer({
    inline = false,
    direction,
    align,
    alignContent,
    justify
}: IFlexContainerProps = {}): VariableProperties {
    return {
        display: inline ? INLINE_FLEX : FLEX,
        flexDirection: direction,
        alignItems: align,
        alignContent,
        justifyContent: justify
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