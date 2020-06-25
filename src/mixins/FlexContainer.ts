import { AlignContentProperty, FlexDirectionProperty } from 'csstype'
import { VariableProperties, INLINE_FLEX, FLEX, AlignItemsProperty, JustifyContentProperty } from '@artistry/abstract';

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