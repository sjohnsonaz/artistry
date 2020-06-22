import { Color, Length, VariableProperties, ColorPair, Settings } from '@artistry/abstract';
import { IBaseProps } from './IBaseProps';
import { IDefaultSettings } from '../settings/IDefaultSettings';

export interface IPaperProps extends IBaseProps {
    color?: ColorPair;
    borderColor?: Color;
    borderRadius?: Length | 0;
    borderWidth?: Length | 0;
    padding?: Length | 0;
    margin?: Length | 0;
}

export interface ArtistryStyle<T, U extends (VariableProperties | VariableProperties[]) = any> {
    (options?: T): U;
}

type PropertiesHash<T> = {
    [P in keyof T]: VariableProperties;
}

export function propertiesExport<T extends VariableProperties>(properties: T): T;
export function propertiesExport<T>(hash: PropertiesHash<T>): PropertiesHash<T> {
    return hash;
}

export function Paper({
    base = Settings.get<IDefaultSettings>(),
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