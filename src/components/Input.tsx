import * as React from 'react';
import MaskedInput from './MaskedInput';

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
    fill?: boolean;
    mask?: string;
    displaySize?: 'default' | 'small' | 'large';
}

export default class Input extends React.Component<IInputProps, any> {
    render() {
        let {
            id,
            className,
            fill,
            mask,
            displaySize,
            ...props
        } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        if (fill) {
            classNames.push('fill-width');
        }

        let _displaySize: string;
        switch (displaySize) {
            case 'small':
                _displaySize='input-small';
                break;
            case 'large':
                _displaySize='input-large';
                break;
        }

        if (mask) {
            return (
                <MaskedInput
                    id={id}
                    className={classNames.join(' ')}
                    data-size={_displaySize}
                    mask={mask}
                    {...props as any}
                />
            );
        } else {
            return (
                <input
                    id={id}
                    className={classNames.join(' ')}
                    data-size={_displaySize}
                    {...props}
                />
            );
        }
    }
}
