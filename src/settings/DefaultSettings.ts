import { rgb, px, hex, brighten, ColorPair, space } from '@artistry/abstract';
import { IDefaultSettings } from './IDefaultSettings';

let spacer = space(8);
let value = spacer(1);
export const DefaultSettings: IDefaultSettings = {
    // Layout
    space: space(8),
    borderWidth: px(1),
    borderRadius: px(5),
    dividerWidth: px(1),

    // Color
    colors: {
        background: new ColorPair(rgb(255, 255, 255)),
        surface: new ColorPair(rgb(255, 255, 255)),
        border: new ColorPair(rgb(0, 0, 0)),
        primary: new ColorPair(hex('#6300ee')),
        secondary: new ColorPair(hex('#03dac6')),
        error: new ColorPair(hex('#aa0000')),
        success: new ColorPair(hex('#2ECC40')),
        info: new ColorPair(brighten(hex('#0074D9'), 50)),
        warning: new ColorPair(hex('#FF851B')),
        danger: new ColorPair(hex('#FF4136'))
    },

    // Times
    // TODO: Change to time Units
    times: {
        fast: 0.3,
        slow: 0.5
    }
};