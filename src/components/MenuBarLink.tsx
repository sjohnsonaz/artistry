import * as React from 'react';

export interface IMenuBarLinkProps {
    className?: string;
    id?: string;
    title?: any;
    href?: string;
    active?: boolean;
    noLink?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => any;
}

export default class MenuBarLink extends React.Component<IMenuBarLinkProps, any> {
    onClick = (event: React.MouseEvent<HTMLElement>) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('menu-link');
        if (this.props.active) {
            classNames.push('menu-active');
        }
        return (
            <li className={classNames.join(' ')} id={this.props.id}>
                {!this.props.noLink ?
                    <a
                        href={this.props.href || ''}
                        onClick={this.onClick}
                    >
                        {this.props.title}
                    </a> :
                    <span
                        onClick={this.onClick}
                    >
                        {this.props.title}
                    </span>}
            </li>
        );
    }
}
