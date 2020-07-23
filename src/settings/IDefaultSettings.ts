import { Length, ColorPair, space } from "@artistry/abstract";

export interface IDefaultSettings {
    // Layout
    space: ReturnType<typeof space>;
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

    // Sizes
    sizes: {
        xSmall: Length,
        small: Length,
        medium: Length,
        large: Length,
        xLarge: Length
    }
}

export interface IPaperSettings extends IDefaultSettings {

}