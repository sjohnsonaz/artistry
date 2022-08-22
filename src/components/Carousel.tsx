import * as React from 'react';

import ClassNames from '../util/ClassNames';
import { setState, waitAnimation } from '../util/PromiseUtil';
import { ScrollableType } from './Scrollable';

export interface ICarouselProps {
    className?: string;
    id?: string;
    activeIndex: number;
    animation?: 'slide' | 'slide-fade' | 'fade' | 'flip';
    safe?: boolean;
    staticHeight?: boolean;
    fillHeight?: boolean;
    scroll?: ScrollableType;
    space?: boolean;
}

export interface ICarouselState {
    height?: string;
    activeIndex?: number;
    previousActiveIndex?: number;
    animating?: boolean;
    selected?: boolean;
}

export default class Carousel extends React.Component<ICarouselProps, ICarouselState> {
    container: React.RefObject<HTMLDivElement> = React.createRef();
    state: ICarouselState = {
        height: undefined,
        activeIndex: this.props.activeIndex,
        previousActiveIndex: this.props.activeIndex,
        animating: false,
        selected: true
    };
    running: boolean = false;
    runCount: number = 0;
    transitionCount: number = 0;

    transitionEnd = async (event: React.TransitionEvent<HTMLElement>) => {
        if (event.propertyName === 'transform') {
            this.transitionCount++;
            this.transitionCount %= 2;
            if (!this.transitionCount) {
                if (!this.running) {
                    this.setState({
                        animating: false,
                        height: undefined,
                        previousActiveIndex: this.state.activeIndex
                    });
                }
            }
        }
    }

    async componentWillReceiveProps(nextProps?: ICarouselProps) {
        let { activeIndex } = nextProps;
        let { activeIndex: previousActiveIndex } = this.props;

        activeIndex = activeIndex || 0;
        previousActiveIndex = previousActiveIndex || 0;
        let children = this.props.children;
        if (children instanceof Array && children.length) {
            activeIndex %= children.length;
            previousActiveIndex %= children.length;
            if (activeIndex < 0) {
                activeIndex += children.length;
                activeIndex %= children.length;
            }
            if (previousActiveIndex < 0) {
                previousActiveIndex += children.length;
                previousActiveIndex %= children.length;
            }
        } else {
            activeIndex = 0;
            previousActiveIndex = 0;
        }

        // Only run if we are changing indexes
        if (activeIndex !== previousActiveIndex) {

            // Store runCount in closure
            this.runCount++;
            let runCount = this.runCount;

            // Start run
            this.running = true;

            let node: HTMLDivElement;
            if (!this.props.staticHeight) {
                // Store current height
                node = this.container.current;
                await setState({ height: node.offsetHeight + 'px' }, this);
                if (runCount !== this.runCount) {
                    return;
                }
            }

            // Start animating
            await setState({ animating: true }, this);
            if (runCount !== this.runCount) {
                return;
            }

            // Update indexes
            await setState({
                activeIndex: activeIndex,
                previousActiveIndex: previousActiveIndex,
                selected: false
            }, this);

            // Wait for animationFrame
            await waitAnimation(1);
            if (runCount !== this.runCount) {
                return;
            }

            // Update selected
            await setState({ selected: true }, this);
            if (runCount !== this.runCount) {
                return;
            }

            if (!this.props.staticHeight) {
                // Update height
                let computedStyle = window.getComputedStyle(node, null);
                let paddingHeight =
                    parseFloat(computedStyle.getPropertyValue('border-top-width')) +
                    parseFloat(computedStyle.getPropertyValue('border-bottom-width')) +
                    parseFloat(computedStyle.getPropertyValue('padding-top')) +
                    parseFloat(computedStyle.getPropertyValue('padding-bottom'));
                let activeChild = node.querySelector('.carousel-selected');
                if (activeChild) {
                    await setState({ height: paddingHeight + activeChild.clientHeight + 'px' }, this);
                }
                if (runCount !== this.runCount) {
                    return;
                }
            }

            // Stop run
            if (this.running) {
                if (this.props.staticHeight) {
                    await setState({
                        animating: false,
                        height: undefined,
                        previousActiveIndex: this.state.activeIndex
                    }, this);
                }
                this.running = false;
            }
        }
    }

    componentWillUnmount() {
        this.runCount++;
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('carousel');

        if (this.state.animating) {
            classNames.push('carousel-run');
        }

        if (this.props.fillHeight) {
            classNames.push('fill-height');
        }

        switch (this.props.animation) {
            case 'slide':
                break;
            case 'slide-fade':
                classNames.push('carousel-animate-fade');
                break;
            case 'fade':
                classNames.push('carousel-animate-fade');
                break;
            case 'flip':
                classNames.push('carousel-animate-flip');
                break;
            default:
                break;
        }

        if (this.props.safe) {
            classNames.push('carousel-safe');
        }

        if (this.props.scroll) {
            classNames.push('scrollable');
        }

        if (this.props.space) {
            classNames.push('carousel-space');
        }

        let children;

        if (this.props.children instanceof Array) {
            if (this.state.activeIndex !== this.state.previousActiveIndex) {
                if (this.state.activeIndex < this.state.previousActiveIndex) {
                    children = <>
                        <div
                            key={this.state.activeIndex}
                            className={this.state.selected ? "carousel-selected" : ""}
                        >{this.props.children[this.state.activeIndex]}</div>
                        <div
                            key={this.state.previousActiveIndex}
                            className={this.state.selected ? "" : "carousel-selected"}
                        >{this.props.children[this.state.previousActiveIndex]}</div>
                    </>
                } else {
                    children = <>
                        <div
                            key={this.state.previousActiveIndex}
                            className={this.state.selected ? "" : "carousel-selected"}
                        >{this.props.children[this.state.previousActiveIndex]}</div>
                        <div
                            key={this.state.activeIndex}
                            className={this.state.selected ? "carousel-selected" : ""}
                        >{this.props.children[this.state.activeIndex]}</div>
                    </>
                }
            } else {
                children = <>
                    <div key={this.state.activeIndex} className={this.state.selected ? "carousel-selected" : ""}>{this.props.children[this.state.activeIndex]}</div>
                </>
            }
        } else {
            children = <>
                <div key={this.state.activeIndex} className={this.state.selected ? "carousel-selected" : ""}>{this.props.children}</div>
            </>
        }


        return (
            <div
                className={classNames.join(' ')}
                id={this.props.id}
                style={{ height: this.state.height }}
                data-scroll={this.props.scroll}
                onTransitionEnd={this.transitionEnd}
                ref={this.container}
            >
                {children}
            </div>
        );
    }
}