import { JustifySelfProperty } from 'csstype'
import { VariableProperties, AlignSelfProperty } from '@artistry/abstract';

export interface IFlexItemProps {
    grow?: number;
    shrink?: number;
    align?: AlignSelfProperty;
    justify?: JustifySelfProperty;
}

export function FlexItem({
    grow = 0,
    shrink = 0,
    align,
    justify
}: IFlexItemProps = {}): VariableProperties {
    return {
        flexGrow: grow,
        flexShrink: shrink,
        alignSelf: align,
        justifySelf: justify
    };
}