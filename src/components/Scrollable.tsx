import * as React from 'react';

export type ScrollableType =
    'auto' |
    'both' |
    'none' |
    'x' |
    'y' |
    'xAlways' |
    'yAlways' |
    'xNever' |
    'yNever';

export enum ScrollableTypeEnum {
    auto = "auto",
    both = "both",
    none = "none",
    x = "x",
    y = "y",
    xAlways = "x-always",
    yAlways = "y-always",
    xNever = "x-never",
    yNever = "y-never"
}

export interface IScrollableExternalProps {
    scrollType?: ScrollableType;
    bumper?: number;
    onScroll?: (event?: React.UIEvent<HTMLElement>) => any;
    onTopEnter?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onTopExit?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onRightEnter?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onRightExit?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onBottomEnter?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onBottomExit?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onLeftEnter?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onLeftExit?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
}

export interface IScrollableProps {
    id?: string;
    className?: string;
    type?: ScrollableType;
    height?: number | string;
    maxHeight?: number | string;
    bumper?: number | string;
    onScroll?: (event?: React.UIEvent<HTMLElement>) => any;
    onTopEnter?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onTopExit?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onRightEnter?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onRightExit?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onBottomEnter?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onBottomExit?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onLeftEnter?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
    onLeftExit?: (entries: IntersectionObserverEntry, observer: IntersectionObserver) => any;
}

export default class Scrollable extends React.Component<IScrollableProps, any> {
    root: React.RefObject<HTMLDivElement> = React.createRef();
    topBumper: React.RefObject<HTMLDivElement> = React.createRef();
    rightBumper: React.RefObject<HTMLDivElement> = React.createRef();
    bottomBumper: React.RefObject<HTMLDivElement> = React.createRef();
    leftBumper: React.RefObject<HTMLDivElement> = React.createRef();
    rootObserver: IntersectionObserver;

    topIntersected: boolean = false;
    rightIntersected: boolean = false;
    bottomIntersected: boolean = false;
    leftIntersected: boolean = false;

    onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    }

    componentDidMount() {
        let root = this.root.current;
        let topBumper = this.topBumper.current;
        let rightBumper = this.rightBumper.current;
        let bottomBumper = this.bottomBumper.current;
        let leftBumper = this.leftBumper.current;
        this.rootObserver = new IntersectionObserver(
            (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                entries.forEach(entry => {
                    switch (entry.target.className) {
                        case 'scrollable-bumper-top':
                            if (entry.isIntersecting !== this.topIntersected) {
                                if (entry.isIntersecting) {
                                    if (this.props.onTopEnter) {
                                        this.props.onTopEnter(entry, observer);
                                    }
                                    this.topIntersected = true;
                                } else {
                                    if (this.props.onTopExit) {
                                        this.props.onTopExit(entry, observer);
                                    }
                                    this.topIntersected = false;
                                }
                            }
                            break;
                        case 'scrollable-bumper-right':
                            if (entry.isIntersecting !== this.rightIntersected) {
                                if (entry.isIntersecting) {
                                    if (this.props.onRightEnter) {
                                        this.props.onRightEnter(entry, observer);
                                    }
                                    this.rightIntersected = true;
                                } else {
                                    if (this.props.onRightExit) {
                                        this.props.onRightExit(entry, observer);
                                    }
                                    this.rightIntersected = false;
                                }
                            }
                            break;
                        case 'scrollable-bumper-bottom':
                            if (entry.isIntersecting !== this.bottomIntersected) {
                                if (entry.isIntersecting) {
                                    if (this.props.onBottomEnter) {
                                        this.props.onBottomEnter(entry, observer);
                                    }
                                    this.bottomIntersected = true;
                                } else {
                                    if (this.props.onBottomExit) {
                                        this.props.onBottomExit(entry, observer);
                                    }
                                    this.bottomIntersected = false;
                                }
                            }
                            break;
                        case 'scrollable-bumper-left':
                            if (entry.isIntersecting !== this.leftIntersected) {
                                if (entry.isIntersecting) {
                                    if (this.props.onLeftEnter) {
                                        this.props.onLeftEnter(entry, observer);
                                    }
                                    this.leftIntersected = true;
                                } else {
                                    if (this.props.onLeftExit) {
                                        this.props.onLeftExit(entry, observer);
                                    }
                                    this.leftIntersected = false;
                                }
                            }
                            break;
                    }
                });
            }, {
                root: root,
                rootMargin: '0px',
                threshold: [0]
            });
        this.rootObserver.observe(topBumper);
        this.rootObserver.observe(rightBumper);
        this.rootObserver.observe(bottomBumper);
        this.rootObserver.observe(leftBumper);
    }

    componentWillUnmount() {
        if (this.rootObserver) {
            this.rootObserver.disconnect();
        }
    }

    render() {
        let {
            id,
            className,
            type,
            height,
            maxHeight,
            bumper
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('scrollable');

        if (typeof height === 'number') {
            height = height + 'px';
        }

        if (typeof maxHeight === 'number') {
            maxHeight = maxHeight + 'px';
        }

        if (typeof bumper === 'number') {
            bumper = bumper + 'px';
        }

        let style: React.CSSProperties = {};
        if (bumper) {
            style['--scrollable-bumper-size'] = bumper
        }
        if (height) {
            style.height = height;
        } else if (maxHeight) {
            style.maxHeight = maxHeight;
        }

        return (
            <div
                ref={this.root}
                className={classNames.join(' ')}
                id={id}
                data-scroll={ScrollableTypeEnum[type]}
                onScroll={this.onScroll}
                style={style}
            >
                <div className="scrollable-bumper">
                    <div
                        ref={this.topBumper}
                        className="scrollable-bumper-top"
                    ></div>
                    <div
                        ref={this.rightBumper}
                        className="scrollable-bumper-right"
                    ></div>
                    <div
                        ref={this.bottomBumper}
                        className="scrollable-bumper-bottom"
                    ></div>
                    <div
                        ref={this.leftBumper}
                        className="scrollable-bumper-left"
                    ></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}