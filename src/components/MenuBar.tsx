import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Portal from '../util/Portal';

export interface IMenuBarProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    title?: any;
    top?: boolean;
    open?: boolean;
    onOpen?: React.MouseEventHandler;
}

export default class MenuBar extends React.Component<IMenuBarProps, any> {
    element: HTMLDivElement;

    constructor(props: IMenuBarProps) {
        super(props);
        this.element = document.createElement('div');
    }

    componentDidMount() {
        let fixedLayer = Portal.getElement('layer-fixed');

        if (!fixedLayer.contains(this.element)) {
            fixedLayer.appendChild(this.element);
        }
    }

    componentWillUnmount() {
        let fixedLayer = Portal.getElement('layer-fixed');

        if (fixedLayer.contains(this.element)) {
            fixedLayer.removeChild(this.element);
        }
    }

    onOpen: React.MouseEventHandler = (event) => {
        event.preventDefault();
        if (this.props.onOpen) {
            this.props.onOpen(event);
        }
    };

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('menu-bar');

        if (this.props.top) {
            classNames.push('menu-bar-top');
        }

        if (this.props.open) {
            classNames.push('menu-bar-open');
        }

        let menuBarTitle;
        if (this.props.title) {
            menuBarTitle = (
                <div className="menu-bar-title">{this.props.title}</div>
            );
        }

        return ReactDOM.createPortal(
            <div className={classNames.join(' ')} id={this.props.id}>
                {this.props.top ? (
                    <div className="menu-bar-expander">
                        <a href="#" onClick={this.onOpen}>
                            &#9776;
                        </a>
                    </div>
                ) : undefined}
                {menuBarTitle}
                <ul>{this.props.children}</ul>
            </div>,
            this.element
        );
    }
}
