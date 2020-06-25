import { AlignContentProperty, FlexDirectionProperty, JustifySelfProperty, FlexFlowProperty, FlexWrapProperty } from 'csstype'
import { VariableProperties, INLINE_FLEX, FLEX, AlignItemsProperty, AlignSelfProperty, JustifyContentProperty } from '@artistry/abstract';

export interface IFlexProps {
    display?: typeof FLEX | typeof INLINE_FLEX;
    direction?: FlexDirectionProperty;
    alignItems?: AlignItemsProperty;
    alignContent?: AlignContentProperty;
    alignSelf?: AlignSelfProperty;
    justifyContent?: JustifyContentProperty;
    justifySelf?: JustifySelfProperty;
    grow?: number;
    shrink?: number;
    basis?: number,
    flow?: FlexFlowProperty;
    wrap?: FlexWrapProperty;
    order?: number;
}

export function Flex({
    display,
    direction,
    alignItems,
    alignContent,
    alignSelf,
    justifyContent,
    justifySelf,
    grow,
    shrink,
    basis,
    flow,
    wrap,
    order
}: IFlexProps = {}): VariableProperties {
    return {
        display,
        flexDirection: direction,
        alignItems,
        alignContent,
        alignSelf,
        justifyContent,
        justifySelf,
        flexGrow: grow,
        flexShrink: shrink,
        flexBasis: basis,
        flexFlow: flow,
        flexWrap: wrap,
        order
    };
}