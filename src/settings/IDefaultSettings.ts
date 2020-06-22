import { Length, ColorPair } from "@artistry/abstract";

export interface IDefaultSettings {
    // Layout
    spacing: Length;
    borderWidth: Length;
    borderRadius: Length;
    dividerWidth: Length;

    // Color
    colors: {
        background: ColorPair;
        surface: ColorPair;
        border: ColorPair;
        primary: ColorPair;
        secondary: ColorPair;
        error: ColorPair;
        success: ColorPair;
        info: ColorPair;
        warning: ColorPair;
        danger: ColorPair;
    };

    // Times
    // TODO: Change to time Units
    times: {
        fast: number;
        slow: number;
    };
}