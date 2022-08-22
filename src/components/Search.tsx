import * as React from 'react';

import DepthStack from '../util/DepthStack';

import { ITemplate } from './ITemplate';
import Button from './Button';

export type SearchSize = 'default' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface ISearchProps {
    id?: string;
    className?: string;
    value?: string;
    buttonText?: any;
    options?: string[];
    altActionText?: string;
    showOptions?: boolean;
    fill?: boolean;
    disabled?: boolean;
    disabledButton?: boolean;
    disabledInput?: boolean;
    screenSize?: SearchSize;
    showClear?: boolean;
    clearText?: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
    onSelectOption?: (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>, value: string) => any;
    onSearch?: (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>, value: string) => any;
    onClear?: (event: React.MouseEvent<HTMLButtonElement>) => any;
    onClose?: (event: React.SyntheticEvent<HTMLElement>) => any;
    altAction?: (option: string) => any;

    // Button Props
    type?: 'button' | 'submit' | 'reset';
    theme?: 'default' | 'primary' | 'danger';
    displaySize?: 'default' | 'small' | 'large';
    display?: 'default' | 'textonly' | 'outline';
    tooltip?: string;
    tooltipDirection?: 'top' | 'right' | 'bottom' | 'left';
    tooltipOpen?: boolean;
    popover?: ITemplate;
    popoverDirection?: 'top' | 'right' | 'bottom' | 'left';
    popoverAlign?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    popoverMenu?: boolean;
    popoverOpen?: boolean;
    popoverFill?: boolean;
    lockContent?: any;
    locked?: boolean;
    down?: boolean;
    link?: boolean;
    noTrigger?: boolean;
    noWrap?: boolean;
    noFocus?: boolean;
    onPopoverClose?: (event: React.SyntheticEvent) => boolean | void;
}

export interface ISearchState {
    activeOption?: number;
    value?: string;
    options?: string[];
}

export default class Search extends React.Component<ISearchProps, ISearchState> {
    private closeHandle: (event: React.SyntheticEvent) => void;

    constructor(props: ISearchProps, context: any) {
        super(props, context);
        let {
            value,
            options
        } = this.props;

        options = this.cleanOptions(options, value);

        this.state = {
            activeOption: -1,
            value: value,
            options: options
        };
    }

    cleanOptions(options: string[], value: string) {
        if (value && value.trim) {
            // Push value to top of array
            options = options ? options.slice(0) : [];
            options.unshift(value);
        } else {
            options = options || [];
        }
        return options;
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        let {
            value,
            options
        } = this.state;
        let activeOption: number;
        switch (event.keyCode) {
            case 13: // Enter
                this.onSearch(event);
                break;
            case 27: // Esc
                this.onClose(event);
                break;
            case 38: // Up
                event.preventDefault();
                if (!value || !value.trim()) {
                    activeOption = -1;
                } else {
                    activeOption = this.state.activeOption;
                    activeOption--;
                    if (activeOption < -1) {
                        activeOption = -1;
                    }
                }
                if (activeOption !== -1) {
                    this.setState({
                        activeOption: activeOption,
                        value: options[activeOption]
                    });
                } else {
                    this.setState({
                        activeOption: activeOption
                    });
                }
                break;
            case 40: // Down
                event.preventDefault();
                if (!value || !value.trim()) {
                    activeOption = -1;
                } else {
                    activeOption = this.state.activeOption;
                    activeOption++;
                    if (activeOption >= options.length) {
                        activeOption = options.length - 1;
                    }
                }
                if (activeOption !== -1) {
                    this.setState({
                        activeOption: activeOption,
                        value: options[activeOption]
                    });
                } else {
                    this.setState({
                        activeOption: activeOption
                    });
                }
                break;
        }
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    onSearch = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
        if (this.props.onSearch) {
            this.props.onSearch(event, this.state.value);
        }
    }

    onSelectOption(option: string, index: number, event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>) {
        this.setState({
            activeOption: index,
            value: option
        });
        if (this.props.onSelectOption) {
            this.props.onSelectOption(event, option);
        }
    }

    onClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onClear) {
            this.props.onClear(event);
        }
    }

    onClose = (event: React.SyntheticEvent<HTMLElement>) => {
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    componentWillMount() {
        if (!this.closeHandle) {
            this.closeHandle = this.onClose.bind(this);
        }
        if (this.props.showOptions) {
            DepthStack.push(this.closeHandle);
        }
    }

    componentWillReceiveProps(nextProps: ISearchProps) {
        let {
            value,
            options,
            showOptions
        } = nextProps;
        options = this.cleanOptions(options, value);
        this.setState({
            value: value,
            options: options
        });
        if (showOptions !== this.props.showOptions) {
            if (showOptions) {
                DepthStack.push(this.closeHandle);
            } else {
                DepthStack.remove(this.closeHandle);
            }
        }
        if (value !== this.props.value) {
            this.setState({
                activeOption: -1
            });
        }
    }

    componentWillUnmount() {
        if (this.props.showOptions) {
            DepthStack.remove(this.closeHandle);
        }
    }

    render() {
        let {
            id,
            className,
            buttonText,
            altAction,
            altActionText,
            showOptions,
            fill,
            disabled,
            disabledButton,
            disabledInput,
            screenSize,
            showClear,
            clearText,

            // Unused
            value: _value,
            options: _options,
            onChange,
            onSelectOption,
            onSearch,
            onClear,
            onClose,
            ...buttonProps
        } = this.props;

        let {
            value,
            options,
            activeOption
        } = this.state;

        let classNames = className ? [className] : [];
        classNames.push('search');

        let open: string = undefined;
        if (options.length && !disabled && !disabledInput && showOptions) {
            open = "true";
        }

        let inputClassNames = ['input', 'search-input'];
        if (fill) {
            inputClassNames.push('fill-width');
        }

        switch (screenSize) {
            case 'x-small':
                classNames.push('search-xs');
                break;
            case 'small':
                classNames.push('search-sm');
                break;
            case 'medium':
                classNames.push('search-md');
                break;
            case 'large':
                classNames.push('search-lg');
                break;
            case 'x-large':
                classNames.push('search-xl');
                break;
        }

        return (
            <div
                id={id}
                className={classNames.join(' ')}
                data-open={open}
            >
                <div className="button-group search-button-group">
                    <input
                        className={inputClassNames.join(' ')}
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                        value={value || ''}
                        disabled={disabled || disabledInput}
                    />
                    {showClear && onClear ?
                        <Button
                            className="search-button"
                            onClick={this.onClear}
                            disabled={!value}
                        >
                            {clearText || 'Clear'}
                        </Button> :
                        undefined
                    }
                    <Button
                        className="search-button"
                        onClick={this.onSearch}
                        disabled={disabled || disabledButton}
                        {...buttonProps}
                    >
                        {buttonText || 'Search'}
                    </Button>
                </div>
                <div className="search-option-box">
                    <ul role="listbox" className="search-option-list">
                        {!options ? undefined : options.map((option, index) => {
                            let optionClassName = ['search-option'];
                            if (index === activeOption) {
                                optionClassName.push('search-option-active');
                            }
                            return (
                                <li className={optionClassName.join(' ')} role="presentation" key={option + '_' + index}>
                                    <div className="search-option-action" role="option" onClick={this.onSelectOption.bind(this, option, index)}>
                                        <div className="search-option-action-text">
                                            <span><b>{option}</b></span>
                                        </div>
                                    </div>
                                    {altAction && altActionText ?
                                        <div className="search-option-alt-action" onClick={altAction.bind(this, option)}>
                                            <div className="search-option-alt-action-text">{altActionText}</div>
                                        </div> :
                                        undefined}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}