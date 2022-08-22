import * as React from 'react';
import Mask, { ISelection, KeyboardMovement, IMaskUpdate } from '../util/Mask';

export interface IMaskedInputProps<T> extends React.HTMLProps<HTMLInputElement> {
    id?: string;
    className?: string;
    mask: string;
    value?: any;
    fill?: boolean;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => (void | boolean);
}

export default class MaskedInput<T> extends React.Component<IMaskedInputProps<T>, any> {
    inputRef: React.RefObject<HTMLInputElement> = React.createRef();
    command: boolean = false;
    mask: Mask;

    value?: string;
    selectionStart?: number;
    selectionEnd?: number;

    constructor(props: IMaskedInputProps<T>, context?: any) {
        super(props, context);
        let {
            value
        } = this.props;

        this.mask = new Mask(this.props.mask);

        this.value = this.mask.formatValue(value, true);
        this.selectionStart = 0;
        this.selectionEnd = 0;
    }

    componentDidMount() {
        this.updateElement({
            value: this.value
        });
    }

    updateElement(maskUpdate: IMaskUpdate) {
        let input = this.inputRef.current;
        if (typeof maskUpdate.value !== 'undefined') {
            input.value = maskUpdate.value;
            this.value = maskUpdate.value;
        }
        if (typeof maskUpdate.selectionEnd !== 'undefined' && typeof maskUpdate.selectionEnd !== 'undefined') {
            input.setSelectionRange(maskUpdate.selectionStart, maskUpdate.selectionEnd, 'none');
            this.selectionStart = maskUpdate.selectionStart;
            this.selectionEnd = maskUpdate.selectionEnd;
        }
    }

    componentWillReceiveProps(nextProps: IMaskedInputProps<T>): void {
        let {
            value
        } = nextProps;
        if (this.props.value !== value) {
            try {
                this.updateElement(this.mask.updateValue(
                    value,
                    this.value
                ));
            }
            catch (e) {
                this.rollback();
            }
        }
    }

    onFocus = (event?: React.FocusEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.updateElement(this.mask.updateSelection(
            event.target.value,
            this.getSelection()
        ));
    }

    onBlur = () => {
        this.command = false;
    }

    onClick = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.updateElement(this.mask.updateSelection(
            (event.target as HTMLInputElement).value,
            this.getSelection()
        ));
    }

    onSelect = (event?: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.updateElement(this.mask.updateSelection(
            (event.target as HTMLInputElement).value,
            this.getSelection()
        ));
    }

    onChange = (event?: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        try {
            this.updateElement(this.mask.updateValue(
                (event.target as HTMLInputElement).value,
                this.value
            ));
            if (this.props.onChange) {
                this.props.onChange(event);
            }
        }
        catch (e) {
            this.rollback();
        }
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 8: // Backspace
                event.preventDefault();
                try {
                    this.updateElement(this.mask.deleteCharacter(
                        (event.target as HTMLInputElement).value,
                        this.getSelection(),
                        false
                    ));
                }
                catch (e) {
                    this.rollback();
                }
                break;
            case 35: // End
                event.preventDefault();
                this.updateElement(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    KeyboardMovement.end
                ));
                break;
            case 36: // Home
                event.preventDefault();
                this.updateElement(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    KeyboardMovement.home
                ));
                break;
            case 37: // Left
                event.preventDefault();
                this.updateElement(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    this.command ? KeyboardMovement.home : KeyboardMovement.left
                ));
                break;
            case 39: // Right
                event.preventDefault();
                this.updateElement(this.mask.updateSelection(
                    (event.target as HTMLInputElement).value,
                    this.getSelection(),
                    this.command ? KeyboardMovement.end : KeyboardMovement.right
                ));
                break;
            case 46: // Delete
                event.preventDefault();
                try {
                    this.updateElement(this.mask.deleteCharacter(
                        (event.target as HTMLInputElement).value,
                        this.getSelection(),
                        true
                    ));
                }
                catch (e) {
                    this.rollback();
                }
                break;
            case 91: // Command Left
            case 93: // Command Right
            case 224: // Command - Firefox
                this.command = true;
                break;
        }
    }

    onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            case 91: // Command Left
            case 93: // Command Right
            case 224: // Command - Firefox
                this.command = false;
                break;
        }
    }

    getSelection(): ISelection {
        let input = this.inputRef.current;
        return {
            start: input.selectionStart,
            end: input.selectionEnd,
            direction: input.selectionDirection as any
        };
    }

    rollback() {
        this.updateElement({
            value: this.value,
            selectionStart: this.selectionStart,
            selectionEnd: this.selectionEnd
        });
    }

    render() {
        let {
            id,
            className,
            value,
            fill,
            onChange,
            ...props
        } = this.props;

        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('input');

        if (fill) {
            classNames.push('fill-width');
        }

        return (
            <input
                ref={this.inputRef}
                id={id}
                className={classNames.join(' ')}
                onFocus={this.onFocus}
                onClick={this.onClick}
                onSelect={this.onSelect}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                {...props}
            />
        );
    }
}