import * as React from 'react';

export type ContainerSize = 'none' | 'all' | 'small' | 'medium' | 'large' | 'x-large';

export interface IContainerProps {
    className?: string;
    id?: string;
    menuBarTop?: boolean;
    screenSize?: ContainerSize | ContainerSize[];
}

export default class Container extends React.Component<IContainerProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('container');

        if (this.props.menuBarTop) {
            classNames.push('container-menu-bar-top');
        }

        if (this.props.screenSize) {
            let sizes = (this.props.screenSize instanceof Array) ? this.props.screenSize : [this.props.screenSize];

            sizes.forEach(size => {
                switch (size) {
                    case 'all':
                        classNames.push('container-all');
                        break;
                    case 'small':
                        classNames.push('container-sm');
                        break;
                    case 'medium':
                        classNames.push('container-md');
                        break;
                    case 'large':
                        classNames.push('container-lg');
                        break;
                    case 'x-large':
                        classNames.push('container-xl');
                        break;
                }
            });
        }

        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}
