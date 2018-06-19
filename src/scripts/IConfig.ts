export interface IConfig {
    $default?: IDefault;
}

export interface IBackground {
    color?: string;
}

export interface IFont {
    style?: string
    variant?: string
    weight?: string
    stretch?: string
    size?: string
    family?: string;
}

export interface IBox {
    padding?: string | ISide;
    margin?: string | ISide;
    color?: string;
    background?: string | IBackground;
    "line-height"?: string;
    font?: IFont;
}

export interface IBorder {
    width?: string | ISide;
    radius?: string | ISide;
    color?: string | ISide;
}

export interface ISide {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export interface IDefault {
    "font-family"?: string;
    "padding"?: string;
    "padding-small"?: string;
    "margin"?: string;
    "margin-layout"?: string;
    "border-width"?: string;
    "border-radius"?: string;

    /* Color Properties */
    "background-color"?: string;
    "color"?: string;
    "border-color"?: string;
    "foreground-background-color"?: string;
    "header-color"?: string;
    "header-color-alt"?: string;
    /*
    $basic- color ?: $white;
    $basic-color-alt ?: $black;
    $widget-color ?: #ddd;
    $widget-color-alt ?: #000;
    $primary-color ?: $blue;
    $primary-color-alt ?: $white;
    $success-color ?: $green;
    $success-color-alt ?: $white;
    $info-color ?: $blue-light;
    $info-color-alt ?: $white;
    $warning-color ?: $orange;
    $warning-color-alt ?: $white;
    $danger-color ?: $red;
    $danger-color-alt ?: $white;
    
    Size Properties
    $size-sm ?: string;
    $size-md ?: string;
    $size-lg ?: string;
    $size-xl ?: string;
    
    Shadow Properties
    $box-shadow-height-0 ?: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
    $box-shadow-height-1 ?: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
    $box-shadow-height-2 ?: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    $background-color-layer-0 ?: #eee;
    $background-color-layer-1 ?: #fafafa;
    $background-color-layer-2 ?: #fff;
    
    Animation Properties
    "animation-time ?: 0.2s;
    "animation-time-slow ?: 0.5s;
    
    */
}

let config: IConfig = {
    $default: {
        padding: "10px"
    }
}