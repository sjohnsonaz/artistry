import { createSheet, classMerge, JssStyle } from './create';
import Media from './Media';
import { Size } from './Size';

function container(): JssStyle {
    return {
        margin: [[0, 'auto']],
        padding: 0,
        border: 0,
        width: '100%'
    };
}

function containerSize(...sizes: Size[]) {
    return classMerge(...sizes.map(size => {
        return {
            [Media.minWidth(size)]: {
                width: `calc(${size} - var(--scrollbar-width))`
            }
        };
    }));
}

export default createSheet({
    'container': classMerge(
        container(), {
        '&.container-all': containerSize(Size.XSmall, Size.Small, Size.Medium, Size.Large, Size.XLarge),
        '&.container-xs': containerSize(Size.XSmall),
        '&.container-sm': containerSize(Size.Small),
        '&.container-md': containerSize(Size.Medium),
        '&.container-lg': containerSize(Size.Large),
        '&.container-xl': containerSize(Size.XLarge),
    })
});