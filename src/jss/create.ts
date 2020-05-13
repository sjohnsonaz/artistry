import jss, { JssStyle } from 'jss';

export { JssStyle };

type CreateSheetParameters = Parameters<(typeof jss)["createStyleSheet"]>;

interface SheetDefinition<T extends CreateSheetParameters[0], U extends CreateSheetParameters[1]> {
    styles: T;
    options: U;
}

export function createSheet<T extends CreateSheetParameters[0], U extends CreateSheetParameters[1]>(styles: T, options?: U): SheetDefinition<T, U> {
    return {
        styles,
        options
    };
}

export function classMerge(...styles: JssStyle[]) {
    return Object.assign({}, ...styles);
}
