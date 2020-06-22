import { Color, HSLA, RGBA, WCAGContrast, WCAGLuminance } from "@artistry/abstract";

export class ColorSetting {
    color: Color;
    text: Color;

    constructor(color: Color, text?: Color) {
        this.color = color;
        if (text) {
            this.text = text;
        } else {
            if (color instanceof RGBA) {
                let luminance = WCAGLuminance(color.r, color.g, color.b);
                let contrastBlack = WCAGContrast(blackLuminance, luminance);
                let contrastWhite = WCAGContrast(whiteLuminance, luminance);
                if (contrastBlack >= contrastWhite) {
                    this.text = new RGBA(0, 0, 0);
                } else {
                    this.text = new RGBA(255, 255, 255);
                }
            } else if (color instanceof HSLA) {
                if (color.l > 0.5) {
                    this.text = new RGBA(0, 0, 0);
                } else {
                    this.text = new RGBA(255, 255, 255);
                }
            } else {
                this.text = new RGBA(0, 0, 0);
            }
        }
    }
}

let black = new RGBA(0, 0, 0);
let blackLuminance = WCAGLuminance(black.r, black.g, black.b);
let white = new RGBA(255, 255, 255);
let whiteLuminance = WCAGLuminance(white.r, white.g, white.b);
