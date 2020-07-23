import { Length, VariableProperties, AUTO } from '@artistry/abstract';
import { IBaseProps, getSettings } from '../base';

export interface IBoxProps extends IBaseProps {
    borderWidth?: Length | 0;
    padding?: number | (number | typeof AUTO)[];
    margin?: number | (number | typeof AUTO)[];
    height?: Length | 0;
    minHeight?: Length | 0;
    maxHeight?: Length | 0;
    width?: Length | 0;
    minWidth?: Length | 0;
    maxWidth?: Length | 0;
}

// TODO: Find better 0 check.
// TODO: Find better spacing.
export function Box({
    base = getSettings(),
    padding = 0,
    margin = 0,
    borderWidth,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth
}: IBoxProps = {}): VariableProperties {
    let paddingSpace: Length | Length[];
    if (padding instanceof Array) {
        paddingSpace = base.space(...padding);
    } else {
        paddingSpace = base.space(padding);
    }
    let marginSpace: Length | Length[];
    if (margin instanceof Array) {
        marginSpace = base.space(...margin);
    } else {
        marginSpace = base.space(margin);
    }
    return {
        borderWidth: borderWidth ? borderWidth : undefined,
        padding: paddingSpace ? paddingSpace : undefined,
        margin: marginSpace ? marginSpace : undefined,
        height,
        minHeight,
        maxHeight,
        width,
        minWidth,
        maxWidth
    };
}