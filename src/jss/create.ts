// import jss, { JssStyle, create } from 'jss';

// export { JssStyle };

// type CreateSheetParameters = Parameters<(typeof jss)["createStyleSheet"]>;
// type Styles = CreateSheetParameters[0];
// export { Styles };

// interface SheetDefinition<T extends CreateSheetParameters[0], U extends CreateSheetParameters[1]> {
//     styles: T;
//     options: U;
// }

// export function createSheet<T extends CreateSheetParameters[0], U extends CreateSheetParameters[1]>(styles: T, options?: U): SheetDefinition<T, U> {
//     return {
//         styles,
//         options
//     };
// }

// export function classMerge<T extends Styles>(a: T): T;
// export function classMerge<T extends Styles, U extends Styles>(a: T, b: U): T & U;
// export function classMerge<T extends Styles, U extends Styles, V extends Styles>(a: T, b: U): T & U & V;
// export function classMerge<T extends Styles, U extends Styles, V extends Styles, W extends Styles>(a: T, b: U): T & U & V & W;
// export function classMerge<T extends Styles, U extends Styles, V extends Styles, W extends Styles, X extends Styles>(a: T, b: U): T & U & V & W & X;
// export function classMerge<T extends Styles, U extends Styles, V extends Styles, W extends Styles, X extends Styles, Y extends Styles>(a: T, b: U): T & U & V & W & X & Y;
// export function classMerge<T extends Styles, U extends Styles, V extends Styles, W extends Styles, X extends Styles, Y extends Styles, Z extends Styles>(a: T, b: U): T & U & V & W & X & Y & Z;
// export function classMerge<T extends Styles>(...styles: T[]): T {
//     return Object.assign({}, ...styles);
// }

// export function classMap<T, U>(data: T[], map: (value: T, index: number, array: T[]) => U): U {
//     return Object.assign({}, ...data.map(map));
// }