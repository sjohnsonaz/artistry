import * as React from 'react';

import { ITemplate } from './ITemplate';
import Popover from './Popover';
import DepthStack from '../util/DepthStack';

export interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
    id?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    theme?: 'default' | 'primary' | 'danger';
    displaySize?: 'default' | 'small' | 'large';
    display?: 'default' | 'textonly' | 'outline' | 'underline';
    fill?: boolean;
    tooltip?: string;
    tooltipDirection?: 'top' | 'right' | 'bottom' | 'left';
    tooltipOpen?: boolean;
    popover?: ITemplate;
    popoverDirection?: 'top' | 'right' | 'bottom' | 'left';
    popoverAlign?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    popoverMenu?: boolean;
    popoverOpen?: boolean;
    popoverFill?: boolean;
    popoverSpace?: boolean;
    onPopoverClose?: (event: React.SyntheticEvent) => boolean | void;
    lockContent?: any;
    locked?: boolean;
    down?: boolean;
    link?: boolean;
    noCaps?: boolean;
    noTrigger?: boolean;
    noWrap?: boolean;
    noFocus?: boolean;
}


export interface IButtonState {
    open?: boolean;
}

export default class Button extends React.Component<IButtonProps, any> {
    private closeHandle: (event: React.SyntheticEvent) => void;

    constructor(props?: IButtonState) {
        super(props);
        this.state = {
            open: this.props.open || false
        };
    }

    onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onClick) {
            if (this.props.popover && !this.props.popoverOpen) {
                event.stopPropagation();
            }
            this.props.onClick(event);
        }
    }

    close(event: React.SyntheticEvent) {
        if (this.props.onPopoverClose) {
            this.props.onPopoverClose(event);
        }
    }

    componentWillMount() {
        if (this.props.popover) {
            if (!this.closeHandle) {
                this.closeHandle = this.close.bind(this);
            }
            if (this.props.popoverOpen) {
                DepthStack.push(this.closeHandle);
            }
        }
    }

    // TODO: Fix leak when popover status changes
    componentWillReceiveProps(nextProps: IButtonProps) {
        if (nextProps.popover) {
            if (!this.closeHandle) {
                this.closeHandle = this.close.bind(this);
            }
            // We did not have a popover
            if (!this.props.popover) {
                if (nextProps.popoverOpen) {
                    DepthStack.push(this.closeHandle);
                }
            } else {
                // We are changing popoverOpen
                if (nextProps.popoverOpen !== this.props.popoverOpen) {
                    if (nextProps.popoverOpen) {
                        DepthStack.push(this.closeHandle);
                    } else {
                        DepthStack.remove(this.closeHandle);
                    }
                }
            }
        } else {
            // We are no longer open
            if (this.props.popover && this.props.popoverOpen) {
                DepthStack.remove(this.closeHandle);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.popoverOpen) {
            DepthStack.remove(this.closeHandle);
        }
    }

    render() {
        const {
            id,
            className,
            type,
            theme,
            displaySize,
            display,
            fill,
            down,
            lockContent,
            locked,
            tooltip,
            tooltipDirection,
            tooltipOpen,
            popover,
            popoverAlign,
            popoverDirection,
            popoverMenu,
            popoverOpen,
            popoverFill,
            popoverSpace,
            onPopoverClose,
            link,
            noCaps,
            noTrigger,
            noWrap,
            noFocus,
            onClick,
            ...props
        } = this.props;

        let classNames = className ? [className] : [];
        let injectedProps = {};

        classNames.push('button');
        switch (theme) {
            case 'primary':
                classNames.push('button-primary');
                break;
            case 'danger':
                classNames.push('button-danger');
                break;
        }

        switch (displaySize) {
            case 'small':
                classNames.push('button-small');
                break;
            case 'large':
                classNames.push('button-large');
                break;
        }

        switch (display) {
            case 'textonly':
                classNames.push('button-textonly');
                break;
            case 'outline':
                classNames.push('button-outline');
                break;
            case 'underline':
                classNames.push('button-underline');
                break;
        }

        if (fill) {
            classNames.push('fill-width');
        }

        if (noCaps) {
            classNames.push('button-no-caps');
        }

        if (noWrap) {
            classNames.push('button-nowrap');
        }

        if (noFocus) {
            classNames.push('button-no-focus');
        }

        // Always set button type
        let buttonType = type || 'button';

        if (typeof tooltip !== 'undefined') {
            injectedProps['aria-label'] = tooltip;
            classNames.push('tooltip');
            switch (tooltipDirection) {
                case 'top':
                    classNames.push('tooltip-top');
                    break;
                case 'right':
                    classNames.push('tooltip-right');
                    break;
                case 'bottom':
                    classNames.push('tooltip-bottom');
                    break;
                case 'left':
                    classNames.push('tooltip-left');
                    break;
                default:
                    classNames.push('tooltip-top');
                    break;
            }
            if (tooltipOpen) {
                classNames.push('tooltip-open');
            }
        }

        let popOver;
        if (typeof popover !== 'undefined') {
            if (!noTrigger) {
                classNames.push('popover-trigger');
            }
            if (popoverMenu) {
                if (popoverOpen) {
                    classNames.push('popover-open');
                    if (!down) {
                        classNames.push('button-down');
                    }
                } else {
                    classNames.push('popover-closed');
                }
            }
            popOver = (
                <Popover
                    align={popoverAlign}
                    direction={popoverDirection}
                    open={!popoverMenu ? popoverOpen : undefined}
                    fill={popoverFill}
                    space={popoverSpace}
                    preventClick
                >
                    {typeof popover === 'function' ?
                        popover() :
                        popover
                    }
                </Popover>
            );
        }

        if (down) {
            classNames.push('button-down');
        }

        if (lockContent) {
            classNames.push('button-lockable');
        }

        if (locked) {
            classNames.push('button-locked');
            injectedProps['disabled'] = true;
        }

        return !(popoverMenu || link) ?
            (
                <button
                    {...props as any}
                    className={classNames.join(' ')}
                    id={id}
                    type={buttonType}
                    onClick={this.onClick}
                    {...injectedProps}>
                    {popOver}
                    {lockContent ?
                        <>
                            <div className="button-text">{this.props.children}</div>
                            <div className="button-spinner">{lockContent}</div>
                        </> :
                        this.props.children}
                </button>
            ) : (
                <a
                    {...props as any}
                    className={classNames.join(' ')}
                    id={id}
                    onClick={this.onClick}
                    {...injectedProps}>
                    {popOver}
                    {lockContent ?
                        <>
                            <div className="button-text">{this.props.children}</div>
                            <div className="button-spinner">{lockContent}</div>
                        </> :
                        this.props.children}
                </a>
            );
    }
}