import * as React from 'react';

import DepthStack from '../util/DepthStack';

import { ITemplate } from './ITemplate';
import Popover from './Popover';

export interface IUserThumbnailProps {
    className?: string;
    id?: string;
    src?: string;
    size?: 'default' | 'small' | 'medium' | 'large';
    placeholder?: string;
    popover?: ITemplate;
    popoverDirection?: 'top' | 'right' | 'bottom' | 'left';
    popoverAlign?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    popoverSpace?: boolean;
    popoverOpen?: boolean;
    popoverMenu?: boolean;
    menuBarTop?: boolean;
    onPopoverClose?: (event: React.MouseEvent<HTMLElement>) => boolean | void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => boolean | void;
}

export default class UserThumbnail extends React.Component<IUserThumbnailProps, any> {
    private closeHandle: (event: React.MouseEvent<HTMLElement>) => void;

    close(event: React.MouseEvent<HTMLElement>) {
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

    componentWillReceiveProps(nextProps: IUserThumbnailProps) {
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

    onClick = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.onClick) {
            if (this.props.popover) {
                event.stopPropagation();
            }
            this.props.onClick(event);
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('thumbnail');

        switch (this.props.size) {
            case 'small':
                classNames.push('thumbnail-user-small');
                break;
            case 'large':
                classNames.push('thumbnail-user-large');
                break;
            default:
                //case 'medium':
                classNames.push('thumbnail-user-medium');
                break;
        }

        let thumbnail = this.props.src ?
            (
                <img className={classNames.join(' ')} src={this.props.src} />
            ) : (
                <span className={classNames.join(' ')}>{this.props.placeholder}</span>
            );

        if (this.props.popover) {
            let popover = (
                <Popover
                    align={this.props.popoverAlign}
                    direction={this.props.popoverDirection}
                    open={!this.props.popoverMenu ? this.props.popoverOpen : undefined}
                    space={this.props.popoverSpace}
                    preventClick
                >
                    {typeof this.props.popover === 'function' ?
                        this.props.popover() :
                        this.props.popover
                    }
                </Popover>
            );
            if (this.props.popoverMenu) {
                let triggerClassNames = ['clickable', 'popover-trigger']
                if (this.props.popoverOpen) {
                    triggerClassNames.push('popover-open');
                } else {
                    triggerClassNames.push('popover-closed');
                }
                if (this.props.menuBarTop) {
                    triggerClassNames.push('popover-menu-bar-top');
                }
                return (
                    <span role="button" className={triggerClassNames.join(' ')} id={this.props.id}
                        onClick={this.onClick}
                    >
                        {thumbnail}
                        {popover}
                    </span>
                )
            } else {
                return (
                    <span className="popover-trigger" id={this.props.id}
                        onClick={this.onClick} >
                        {thumbnail}
                        {popover}
                    </span>
                )
            }
        } else {
            (thumbnail.props as any).id = this.props.id;
            return thumbnail;
        }
    }
}