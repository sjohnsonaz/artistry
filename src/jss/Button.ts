import { context, px, block, rule } from "@artistry/jss";
import { defaultValues } from "./Settings";

export default context(() => {
    const button = block('button', {
        padding: px(1)
    });
    const html = rule('html', {
        backgroundColor: defaultValues.infoColor + '',
        WebkitAlignContent: ''
    });
    (window as any).primaryColor = defaultValues.primaryColor;
    (window as any).infoColor = defaultValues.infoColor

    return {
        button
    };
});
