import * as React from 'react';

export type FormSize = 'none' | 'small' | 'medium' | 'large' | 'x-large' | 'stacked';

export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
    // TODO: Change this to size when the React typings allow.
    screenSize?: FormSize;
    lockable?: boolean;
    locked?: boolean;
    nonForm?: boolean;
    onEnter?: (event: KeyboardEvent) => any;
    onEscape?: (event: KeyboardEvent) => any;
}

export default class Form extends React.Component<IFormProps, any> {
    onKeyDown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 13:
                this.props.onEnter(event);
                break;
            case 27:
                this.props.onEscape(event);
                break;
        }
    }

    render() {
        let {
            id,
            className,
            screenSize,
            lockable,
            locked,
            nonForm,
            onEnter,
            onEscape,
            ...props
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('form');
        if (locked) {
            classNames.push('form-lock');
        }

        switch (screenSize) {
            case 'small':
                classNames.push('form-sm');
                break;
            case 'medium':
                classNames.push('form-md');
                break;
            case 'large':
                classNames.push('form-lg');
                break;
            case 'x-large':
                classNames.push('form-xl');
                break;
            case 'stacked':
                classNames.push('form-stacked');
                break;
        }

        let onKeyDown = (onEnter || onEscape) ? this.onKeyDown.bind(this) : undefined;
        if (nonForm) {
            return (
                <div id={id} className={classNames.join(' ')} onKeyDown={onKeyDown} {...props as any}>
                    {lockable ?
                        <div className="form-lock-screen"></div> :
                        null}
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <form id={id} className={classNames.join(' ')} onKeyDown={onKeyDown} {...props}>
                    {lockable ?
                        <div className="form-lock-screen"></div> :
                        null}
                    {this.props.children}
                </form>
            );
        }
    }
}
