import * as React from 'react';

import { setState } from '../util/PromiseUtil';

export interface ICloseableProps {
    id?: string;
    className?: string;
    closed?: boolean;
}

export interface ICloseableState {
    closed?: boolean;
    running?: boolean;
    animating?: boolean;
    height?: string;
}

export default class Closeable extends React.Component<ICloseableProps, ICloseableState> {
    root: React.RefObject<HTMLDivElement> = React.createRef();
    state: ICloseableState = {
        closed: this.props.closed,
        running: false,
        animating: false,
        height: undefined
    };
    runCount: number = 0;

    transitionEnd = async (event: React.TransitionEvent<HTMLDivElement>) => {
        if (event.propertyName === 'height') {
            let animating = this.state.animating;
            if (!animating) {
                if (this.state.closed) {
                    await setState({
                        running: false
                    }, this);
                } else {
                    await setState({
                        height: undefined,
                        running: false
                    }, this);
                }
            }
        }
    }

    async componentWillReceiveProps(nextProps: ICloseableProps) {
        if (this.props.closed !== nextProps.closed) {
            let node = this.root.current;

            this.runCount++;
            let runCount = this.runCount;

            await setState({
                running: true,
                animating: true,
            }, this);
            if (runCount !== this.runCount) {
                return;
            }

            if (nextProps.closed) {
                await setState({
                    height: node.offsetHeight + 'px'
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                await setState({
                    closed: true
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                let border = node.offsetHeight - node.clientHeight;
                await setState({
                    height: border / 2 + 'px'
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                await setState({
                    animating: false
                }, this);
            } else {
                let border = node.offsetHeight - node.clientHeight;
                await setState({
                    height: border / 2 + 'px'
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                await setState({
                    closed: false
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                await setState({
                    height: border / 2 + node.scrollHeight + 'px'
                }, this);
                if (runCount !== this.runCount) {
                    return;
                }

                await setState({
                    animating: false
                }, this);
            }
        }
    }

    componentWillUnmount() {
        this.runCount++;
    }

    render() {
        let {
            id,
            className,
            closed
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('closeable');

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                data-closed={this.state.closed}
                data-running={this.state.running}
                style={{ height: this.state.height }}
                onTransitionEnd={this.transitionEnd}
                ref={this.root}
            >
                {this.props.children}
            </div>
        )
    }
}