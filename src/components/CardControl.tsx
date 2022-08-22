import * as React from 'react';

import ClassNames from '../util/ClassNames';

export interface ICardControlProps {
    id?: string;
    className?: string;
    title?: string;
    label?: boolean;
    width?: number | string;
    stacked?: boolean;
}

export default class CardControl extends React.Component<ICardControlProps, any> {
    render() {
        let {
            id,
            className,
            title,
            label,
            width,
            stacked
        } = this.props;

        let classNames = new ClassNames(className, 'card-control');
        classNames.addTest('card-control-stacked', stacked);

        if (width && typeof width === 'number') {
            width += 'px' as any;
        }

        let content = (
            <>
                <div className="card-control-title">{title}</div>
                <div className="card-control-data">{this.props.children}</div>
            </>
        );
        if (label) {
            return (
                <label
                    className={classNames.toString()}
                    id={id}
                    style={{ '--card-control-min-width': width } as any}
                >
                    {content}
                </label>
            );
        } else {
            return (
                <div
                    className={classNames.toString()}
                    id={id}
                    style={{ '--card-control-min-width': width } as any}
                >
                    {content}
                </div>
            );
        }
    }
}