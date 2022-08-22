import * as React from 'react';

export interface ICardContainerProps {
    id?: string;
    className?: string;
    space?: boolean;
    minWidth?: number | string;
    maxWidth?: number | string;
}

export default class CardContainer extends React.Component<ICardContainerProps, any> {
    render() {
        let {
            id,
            className,
            space,
            minWidth,
            maxWidth
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-container');

        if (space) {
            classNames.push('space');
        }

        if (minWidth && typeof minWidth === 'number') {
            minWidth += 'px' as any;
        }

        if (maxWidth && typeof maxWidth === 'number') {
            maxWidth += 'px' as any;
        }

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                style={{
                    '--card-min-width': minWidth,
                    '--card-max-width': maxWidth
                } as any}
            >
                {this.props.children}
            </div>
        )
    }
}