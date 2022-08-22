import * as React from 'react';

import Carousel from './Carousel';

export interface ITabTitleProps {
    className?: string;
    id?: string;
    title: any;
    active?: boolean;
    onSelectPanel?: (event: React.MouseEvent<HTMLElement>) => boolean | void;
}

export default class TabTitle extends React.Component<ITabTitleProps, any> {
    selectPanel = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.onSelectPanel) {
            return this.props.onSelectPanel(event);
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('tab-title');

        if (this.props.active) {
            classNames.push('tab-active');
        }

        return (
            <li className={classNames.join(' ')} id={this.props.id}>
                <a onClick={this.selectPanel}>{this.props.title}</a>
            </li>
        );
    }
}
