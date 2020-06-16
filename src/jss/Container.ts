import { Size } from './Size';
import { context, px, percent, block, Block, AUTO, only, MediaType, minWidth, calc, value } from '@artistry/jss';

export default context(() => {
    const Container = block('container', {
        margin: px(0, AUTO),
        padding: 0,
        border: 0,
        width: percent(100)
    });

    const ContainerAll = Container.extend('container-all', {});
    const ContainerXSmall = Container.extend('container-xs', {});
    const ContainerSmall = Container.extend('container-sm', {});
    const ContainerMedium = Container.extend('container-md', {});
    const ContainerLarge = Container.extend('container-lg', {});
    const ContainerXLarge = Container.extend('container-xl', {});

    function containerSize(style: Block, ...sizes: Size[]) {
        sizes.forEach(size => {
            style.media(only(MediaType.Screen, minWidth(px(size))), {
                width: calc(`${px(size)} - ${value('scrollbar-width')}`)
            });
        });
    }

    containerSize(ContainerAll, Size.XSmall, Size.Small, Size.Medium, Size.Large, Size.XLarge);
    containerSize(ContainerXSmall, Size.XSmall);
    containerSize(ContainerSmall, Size.Small);
    containerSize(ContainerMedium, Size.Medium);
    containerSize(ContainerLarge, Size.Large);
    containerSize(ContainerXLarge, Size.XLarge);

    return {
        Container,
        ContainerAll,
        ContainerXSmall,
        ContainerMedium,
        ContainerLarge,
        ContainerXLarge
    };
});