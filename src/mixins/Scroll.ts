import { VariableProperties, AUTO, Block, TOUCH, SCROLL, HIDDEN } from '@artistry/abstract';

export enum ScrollType {
    Auto = 'Auto',
    Both = 'Both',
    None = 'None',
    X = 'X',
    Y = 'Y',
    XAlways = 'XAlways',
    YAlways = 'YAlways',
    XNever = 'XNever',
    YNever = 'YNever'
}

export interface IScrollSettings {
    scrollType: ScrollType | keyof typeof ScrollType;
}

export function Scroll({
    scrollType
}: IScrollSettings): VariableProperties {
    switch (scrollType) {
        case ScrollType.Both:
            return {
                WebkitOverflowScrolling: TOUCH,
                overflow: SCROLL
            };
        case ScrollType.None:
            return {
                overflow: HIDDEN
            }
        case ScrollType.X:
            return {
                overflowX: AUTO,
                overflowY: HIDDEN
            };
        case ScrollType.Y:
            return {
                overflowX: HIDDEN,
                overflowY: AUTO
            };
        case ScrollType.XAlways:
            return {
                overflowX: SCROLL,
                overflowY: HIDDEN
            };
        case ScrollType.YAlways:
            return {
                overflowX: HIDDEN,
                overflowY: SCROLL
            };
        case ScrollType.XNever:
            return {
                overflowX: HIDDEN
            };
        case ScrollType.YNever:
            return {
                overflowY: HIDDEN
            };
        case ScrollType.Auto:
        default:
            return {
                WebkitOverflowScrolling: TOUCH,
                overflow: AUTO
            }
    }
}
export function ScrollAttribute(block: Block, name: string, ...scrollType: ScrollType[]) {
    type Mods = {
        [index: string]: VariableProperties;
    };
    let mods: Mods = {};
    scrollType.forEach(scrollType => {
        mods[(name + '-' + scrollType).toLowerCase()] = Scroll({ scrollType });
    });
    block.modifiers(mods);
}

Scroll({ scrollType: 'Auto' })

// .scrollable


//     &:not([data-scroll])
//     &[data-scroll="auto"]
//         overflow: auto

//     &[data-scroll="both"]
//         overflow: scroll

//     &[data-scroll="none"]
//         overflow: hidden

//     &[data-scroll="x"]
//         overflowX: auto
//         overflowY: hidden

//     &[data-scroll="y"]
//         overflowX: hidden
//         overflowY: auto

//     &[data-scroll="x-always"]
//         overflowX: scroll
//         overflowY: hidden

//     &[data-scroll="y-always"]
//         overflowX: hidden
//         overflowY: scroll

//     &[data-scroll="x-never"]
//         overflowX: hidden

//     &[data-scroll="y-never"]
//         overflowY: hidden

// .scrollable-y
//     overflowY: auto

// .scrollable-x
//     overflowX: auto

// :root {
//     --scrollable-bumper-size: $scrollable-bumper-size;
// }

// .scrollable
//     & > .scrollable-bumper
//         position: relative;

//         & > .scrollable-bumper-top
//             position: absolute;
//             height: var(--scrollable-bumper-size);
//             width: 100%;
//             z-index: -100;

//         & > .scrollable-bumper-bottom
//             position: absolute;
//             height: var(--scrollable-bumper-size);
//             width: 100%;
//             bottom: 0;
//             z-index: -100;

//         & > .scrollable-bumper-right
//             position: absolute;
//             top: 0;
//             bottom: 0;
//             right: 0;
//             width: var(--scrollable-bumper-size);
//             z-index: -100;

//         & > .scrollable-bumper-left
//             position: absolute;
//             top: 0;
//             bottom: 0;
//             left: 0;
//             width: var(--scrollable-bumper-size);
//             z-index: -100;
