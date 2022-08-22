import * as React from 'react';

import ClassNames from '../util/ClassNames';

interface IActionBarItem {
    title: string;
    onClick?: () => any;
    link?: string;
}

export interface IActionBarBreadcrumbProps {
    className?: string;
    id?: string;
    items?: IActionBarItem[];
}

export interface IActionBarBreadcrumbState {
    observer?: IntersectionObserver;
}

export default class ActionBarBreadcrumb extends React.Component<IActionBarBreadcrumbProps, IActionBarBreadcrumbState> {
    ref: React.RefObject<HTMLDivElement> = React.createRef();
    state: IActionBarBreadcrumbState = {
    };

    componentDidMount() {
        let breadcrumbHeader = this.ref.current;
        //let breadcrumbDropdown = document.querySelector('.action-bar-dropdown');

        this.setState({
            observer: new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('action-bar-breadcrumb-item-hidden')) {
                            entry.target.classList.remove('action-bar-breadcrumb-item-hidden');
                        }
                    } else {
                        if (!entry.target.classList.contains('action-bar-breadcrumb-item-hidden')) {
                            entry.target.classList.add('action-bar-breadcrumb-item-hidden');
                        }
                    }
                });
                let hiddenCount = 0;
                breadcrumbHeader.childNodes.forEach(child => {
                    if (child instanceof Element) {
                        if (child.classList.contains('action-bar-breadcrumb-item-hidden')) {
                            hiddenCount++;
                        }
                    }
                })
                if (hiddenCount > 0) {
                    breadcrumbHeader.setAttribute('data-align', 'end');
                    //breadcrumbDropdown.classList.remove('action-bar-breadcrumb-item-hidden');
                } else {
                    breadcrumbHeader.removeAttribute('data-align');
                    //breadcrumbDropdown.classList.add('action-bar-breadcrumb-item-hidden');
                }
            }, {
                root: breadcrumbHeader,
                rootMargin: '0px',
                threshold: 1
            })
        });

        breadcrumbHeader.childNodes.forEach(child => {
            if (child instanceof Element) {
                this.state.observer.observe(child);
            }
        });
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.state.observer.disconnect();
    }

    render() {
        let {
            id,
            className,
        } = this.props;

        let classNames = new ClassNames(className, 'action-bar', 'action-bar-breadcrumb');

        return (
            <div
                ref={this.ref}
                className={classNames.toString()}
                id={id}
            >
                {this.state.observer ?
                    React.Children.map(this.props.children, (child, index) => {
                        return (
                            <ActionBarItem
                                key={index}
                                observer={this.state.observer}
                            >
                                {child}
                            </ActionBarItem>
                        );
                    }) :
                    undefined}
            </div>
        );
    }
}

export interface IActionBarItemProps {
    observer: IntersectionObserver;
}

export interface IActionBarItemState {
    hidden?: boolean;
}

export class ActionBarItem extends React.Component<IActionBarItemProps, IActionBarItemState> {
    ref: React.RefObject<HTMLDivElement> = React.createRef();
    state: IActionBarItemState = {
        hidden: false
    };

    componentDidMount() {
        this.props.observer.observe(this.ref.current);
    }

    componentWillUnmount() {
        this.props.observer.unobserve(this.ref.current);
    }

    render() {
        return (
            <div
                ref={this.ref}
            >
                {this.props.children}
            </div>
        )
    }

}