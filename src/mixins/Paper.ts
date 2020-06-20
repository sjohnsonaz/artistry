import { Color, Length, VariableProperties } from '@artistry/abstract';
import { Default } from './Default';

export interface IPaperSettings {
    backgroundColor?: Color;
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
    backgroundColor = Default.backgroundColor,
    borderColor = Default.borderColor,
    borderRadius = Default.borderRadius,
    borderWidth = Default.borderWidth,
    padding = Default.spacing,
    margin = 0
}: IPaperSettings = {}): VariableProperties {
    return {
        backgroundColor: backgroundColor + '',
        borderColor: borderColor + '',
        borderRadius,
        borderWidth,
        padding: padding,
        margin: margin
    };
}