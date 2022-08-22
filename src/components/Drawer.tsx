import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IGridExternalProps, gridConfig } from './Grid';
import { IScrollableExternalProps } from './Scrollable';
import BodyScroll from '../util/BodyScroll';
import { waitAnimation } from '../util/PromiseUtil';
import Portal from '../util/Portal';
import DepthStack from '../util/DepthStack';

export interface IDrawerProps extends IGridExternalProps, IScrollableExternalProps {
    className?: string;
    id?: string;
    direction?: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    full?: boolean;
    onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
    background?: boolean;
    space?: boolean;
}

export interface IDrawerState {
    open?: boolean;
    remove?: boolean;
}

export default class Drawer extends React.Component<IDrawerProps, IDrawerState> {
    element: HTMLDivElement;
    runCount: number = 0;

    constructor(props: IDrawerProps) {
        super(props);
        this.state = {
            open: props.open,
            remove: !props.open
        };
        this.element = document.createElement('div');
        if (props.open) {
            BodyScroll.lock(true);
            DepthStack.push(this.close);
        }
    }

    preventClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    close = (event: React.MouseEvent<HTMLDivElement>) => {
        // TODO: Create a prop for preventing mask clicks.
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    transitionEnd = async (event: React.TransitionEvent<HTMLDivElement>) => {
        if (event.propertyName === 'transform') {
            if (!this.props.open) {
                await this.setState({
                    remove: true
                });
                this.updateModalRoot();
            }
        }
    }

    onScroll = (event: React.UIEvent<HTMLElement>) => {
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    }

    async componentDidUpdate(prevProps?: IDrawerProps) {
        if (this.props.open != prevProps.open) {
            if (this.props.open) {
                let runCount = this.runCount;
                await this.setState({
                    remove: false
                });
                if (runCount !== this.runCount) {
                    return;
                }
                this.updateModalRoot();
                BodyScroll.lock(true);
                // Wait for two animation frames
                await waitAnimation();
                await waitAnimation();
                this.setState({
                    open: this.props.open
                });
                DepthStack.push(this.close);
            } else {
                BodyScroll.unlock();
                this.setState({
                    open: this.props.open
                });
                DepthStack.remove(this.close);
            }
        }
    }

    updateModalRoot() {
        let modalRoot = Portal.getElement('layer-overlay');

        if (!modalRoot.contains(this.element)) {
            if (!this.state.remove) {
                modalRoot.appendChild(this.element);
            }
        } else {
            if (this.state.remove) {
                modalRoot.removeChild(this.element);
            }
        }
    }

    componentWillUnmount() {
        // If we were locked, unlock
        if (this.state.open) {
            BodyScroll.unlock();
            DepthStack.remove(this.close);
        }
        let modalRoot = Portal.getElement('layer-overlay');
        if (modalRoot.contains(this.element)) {
            modalRoot.removeChild(this.element);
        }
    }

    render() {
        let {
            className,
            id,
            direction,
            full,
            background,
            space
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('drawer');

        direction = direction || 'bottom';
        classNames.push('drawer-' + direction);

        if (this.state.open) {
            classNames.push('drawer-open');
        }

        if (full) {
            classNames.push('drawer-full');
        }

        if (background) {
            classNames.push('drawer-background');
        }

        if (space) {
            classNames.push('drawer-space');
        }

        let innerClassNames = ['drawer-content'];
        if (this.props.grid) {
            gridConfig(innerClassNames, this.props);
        }

        return ReactDOM.createPortal((
            <div className={classNames.join(' ')} id={id} onTransitionEnd={this.transitionEnd}>
                <div className="drawer-background" onScroll={this.onScroll}>
                    <div className="drawer-scroller">
                        <div className={innerClassNames.join(' ')} onClick={this.preventClick}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        ), this.element);
    }
}
