import * as React from 'react';

import { alignClass, AlignType } from '../util/Align';
import ClassNames from '../util/ClassNames';

export interface ICardRowProps {
    id?: string;
    className?: string;
    align?: AlignType;
}

export default class CardRow extends React.Component<ICardRowProps, any> {
    render() {
        let {
            id,
            className,
            align
        } = this.props;

        let classNames = new ClassNames(className);
        classNames.add('card-row');

        if (align) {
            alignClass(align, classNames);
        }

        return (
            <div className={classNames.toString()} id={id}>
                {this.props.children}
            </div>
        );
    }
}