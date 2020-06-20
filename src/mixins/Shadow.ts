import { Color, Length, VariableProperties, px, rgb, boxShadow, boxShadowInset, boxShadows, RGBA, rgba, opacity } from '@artistry/abstract';

export interface IShadowSettings {
    offsetX?: Length;
    offsetY?: Length;
    blurRadius?: Length;
    spreadRadius?: Length;
    color?: Color;
    inset?: boolean;
}

export function Shadow({
    offsetX = px(0),
    offsetY = px(0),
    blurRadius = px(0),
    spreadRadius = px(0),
    color = rgb(0, 0, 0),
    inset = false
}: IShadowSettings = {}): VariableProperties {
    if (inset) {
        return {
            boxShadow: boxShadowInset(offsetX, offsetY, blurRadius, spreadRadius, color)
        };
    } else {
        return {
            boxShadow: boxShadow(offsetX, offsetY, blurRadius, spreadRadius, color)
        };
    }
}

export function ShadowDepth(height: number, color?: Color, opacityBoost?: number) {
    return {
        boxShadow: dp(height, color, opacityBoost)
    }
}

export function dp(height: number, color: Color = rgba(0, 0, 0), opacityBoost: number = 0) {
    if (height < 0) {
        height = 0;
    } else if (height > 24) {
        height = 24;
    }

    let colorNew = color.copy();
    color.a = UmbraOpacity + opacityBoost;
    let umbra = Umbra[height] + ' ' + color;

    color.a = PenumbraOpacity + opacityBoost;
    let penumbra = Penumbra[height] + ' ' + color;

    color.a = AmbientOpacity + opacityBoost;
    let ambient = Ambient[height] + ' ' + color;

    return `${umbra}, ${penumbra}, ${ambient}`;
}

const UmbraOpacity = 0.2;
const PenumbraOpacity = 0.14;
const AmbientOpacity = 0.12;

const Umbra = [
    '0px 0px 0px 0px',
    '0px 2px 1px -1px',
    '0px 3px 1px -2px',
    '0px 3px 3px -2px',
    '0px 2px 4px -1px',
    '0px 3px 5px -1px',
    '0px 3px 5px -1px',
    '0px 4px 5px -2px',
    '0px 5px 5px -3px',
    '0px 5px 6px -3px',
    '0px 6px 6px -3px',
    '0px 6px 7px -4px',
    '0px 7px 8px -4px',
    '0px 7px 8px -4px',
    '0px 7px 9px -4px',
    '0px 8px 9px -5px',
    '0px 8px 10px -5px',
    '0px 8px 11px -5px',
    '0px 9px 11px -5px',
    '0px 9px 12px -6px',
    '0px 10px 13px -6px',
    '0px 10px 13px -6px',
    '0px 10px 14px -6px',
    '0px 11px 14px -7px',
    '0px 11px 15px -7px'
];

const Penumbra = [
    '0px 0px 0px 0px',
    '0px 1px 1px 0px',
    '0px 2px 2px 0px',
    '0px 3px 4px 0px',
    '0px 4px 5px 0px',
    '0px 5px 8px 0px',
    '0px 6px 10px 0px',
    '0px 7px 10px 1px',
    '0px 8px 10px 1px',
    '0px 9px 12px 1px',
    '0px 10px 14px 1px',
    '0px 11px 15px 1px',
    '0px 12px 17px 2px',
    '0px 13px 19px 2px',
    '0px 14px 21px 2px',
    '0px 15px 22px 2px',
    '0px 16px 24px 2px',
    '0px 17px 26px 2px',
    '0px 18px 28px 2px',
    '0px 19px 29px 2px',
    '0px 20px 31px 3px',
    '0px 21px 33px 3px',
    '0px 22px 35px 3px',
    '0px 23px 36px 3px',
    '0px 24px 38px 3px'
];

const Ambient = [
    '0px 0px 0px 0px',
    '0px 1px 3px 0px',
    '0px 1px 5px 0px',
    '0px 1px 8px 0px',
    '0px 1px 10px 0px',
    '0px 1px 14px 0px',
    '0px 1px 18px 0px',
    '0px 2px 16px 1px',
    '0px 3px 14px 2px',
    '0px 3px 16px 2px',
    '0px 4px 18px 3px',
    '0px 4px 20px 3px',
    '0px 5px 22px 4px',
    '0px 5px 24px 4px',
    '0px 5px 26px 4px',
    '0px 6px 28px 5px',
    '0px 6px 30px 5px',
    '0px 6px 32px 5px',
    '0px 7px 34px 6px',
    '0px 7px 36px 6px',
    '0px 8px 38px 7px',
    '0px 8px 40px 7px',
    '0px 8px 42px 7px',
    '0px 9px 44px 8px',
    '0px 9px 46px 8px'
];
