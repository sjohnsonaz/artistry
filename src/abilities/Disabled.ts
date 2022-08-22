export interface IDisableable {
    disabled?: boolean
}

export function disabledClass(disabled: boolean, classNames: string[]) {
    if (disabled) {
        classNames.push('disabled');
    }
}