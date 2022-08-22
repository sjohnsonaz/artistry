import * as React from 'react';

import { setState, waitAnimation } from '../util/PromiseUtil';
import BodyScroll from '../util/BodyScroll';

export interface IFillableProps {
    id?: string;
    className?: string;
    filled?: boolean;
    card?: boolean;
}

export interface IFillableState {
    filled?: boolean;
    height?: string;
    width?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export default class Fillable extends React.Component<IFillableProps, IFillableState> {
    root: React.RefObject<HTMLDivElement> = React.createRef();
    state: IFillableState = {
        filled: this.props.filled
    };
    runCount: number = 0;

    constructor(props?: IFillableProps) {
        super(props);
        if (props.filled) {
            BodyScroll.lock(true);
        }
    }

    async componentWillReceiveProps(nextProps: IFillableState) {
        if (this.props.filled !== nextProps.filled) {
            let node = this.root.current;
            this.runCount++;
            let runCount = this.runCount;

            if (!nextProps.filled) {
                let rect = node.getBoundingClientRect();
                await setState({
                    top: rect.top + 'px',
                    bottom: window.innerHeight - rect.top - rect.height + 'px',
                    left: rect.left + 'px',
                    right: document.body.scrollWidth - rect.left - rect.width + 'px'
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                await waitAnimation(220);
                if (runCount !== this.runCount) {
                    return;
                }

                await setState({
                    height: undefined,
                    width: undefined,
                    top: undefined,
                    right: undefined,
                    bottom: undefined,
                    left: undefined,
                    filled: false
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                BodyScroll.unlock();
            } else {
                let rect = node.getBoundingClientRect();
                await setState({
                    height: rect.height + 'px',
                    width: rect.width + 'px',
                    top: rect.top + 'px',
                    bottom: window.innerHeight - rect.top - rect.height + 'px',
                    left: rect.left + 'px',
                    right: document.body.scrollWidth - rect.left - rect.width + 'px',
                    filled: true
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                await waitAnimation(220);
                if (runCount !== this.runCount) {
                    return;
                }

                await setState({
                    top: 0 + 'px',
                    right: 0 + 'px',
                    bottom: 0 + 'px',
                    left: 0 + 'px'
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                BodyScroll.lock(true);
            }
        }
    }

    componentWillUnmount() {
        // If we were locked, unlock
        if (this.state.filled) {
            BodyScroll.unlock();
        }
        this.runCount++;
    }

    render() {
        let {
            id,
            className,
            card
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('fillable');

        if (card) {
            classNames.push('card-fillable');
        }

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                data-filled={this.state.filled}
                style={{
                    height: this.state.height,
                    width: this.state.width
                }}
                ref={this.root}
            >
                <div
                    className="fillable-content"
                    style={{
                        top: this.state.top,
                        right: this.state.right,
                        bottom: this.state.bottom,
                        left: this.state.left,
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}