import { Color, Length, VariableProperties, ColorPair } from '@artistry/abstract';
import { IBaseProps, getSettings } from './IBaseProps';

export interface IPaperProps extends IBaseProps {
    color?: ColorPair;
    borderColor?: Color;
    borderRadius?: Length | 0;
    borderWidth?: Length | 0;
    padding?: Length | 0;
    margin?: Length | 0;
}

export function Paper({
    base = getSettings(),
    color = base.colors.surface,
    borderColor = base.colors.border.color,
    borderRadius = base.borderRadius,
    borderWidth = base.borderWidth,
    padding = base.spacing,
    margin = 0
}: IPaperProps = {}): VariableProperties {
    return {
        backgroundColor: color.color + '',
        color: color.text + '',
        borderColor: borderColor + '',
        borderRadius,
        borderWidth,
        padding: padding,
        margin: margin
    };
}