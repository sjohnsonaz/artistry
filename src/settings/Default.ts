import { rgb, px, hex } from '@artistry/abstract';
import { ColorSetting } from './ColorSetting';

export const Default = {
    // Layout
    spacing: px(8),
    borderWidth: px(1),
    borderRadius: px(5),
    dividerWidth: px(1),

    // Color
    backgroundColor: rgb(255, 255, 255),
    surfaceColor: rgb(255, 255, 255),
    borderColor: rgb(0, 0, 0),

    primary: {
        main: new ColorSetting(hex('#6300ee')),
        dark: new ColorSetting(hex('#4100e0')),
        light: new ColorSetting(hex('#9a66f4'))
    },
    secondary: {
        main: hex('#03dac6'),
        dark: hex('#00b798'),
        light: hex('#d4f6f2')
    },
    text: {
        onBackground: rgb(0, 0, 0),
        onSurface: rgb(0, 0, 0),
        onPrimary: rgb(0, 0, 0),
        onSecondary: rgb(0, 0, 0),
        onError: rgb(0, 0, 0)
    }
};
