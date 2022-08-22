import * as React from 'react';

import { alignClass, AlignType } from '../util/Align';
import ClassNames from '../util/ClassNames';

export interface ICellProps {
    className?: string;
    id?: string;
    columns?: number;
    offset?: number;
    align?: AlignType;
    width?: number | string;
    leftMargin?: number | string;
}

export default class Cell extends React.Component<ICellProps, any> {
    render() {
        let {
            id,
            className,
            columns,
            offset,
            align,
            width,
            leftMargin
        } = this.props;

        let classNames = new ClassNames(className);
        if (columns) {
            classNames.add('col-' + columns);
        } else {
            classNames.add('col');
        }
        if (offset) {
            classNames.add('offset-' + offset);
        }
        if (align) {
            alignClass(align, classNames);
        }

        let fixed = false;
        let style = {};
        if (width) {
            if (typeof width === 'number') {
                width += 'px' as any;
            }
            style['--col-width'] = width;
            fixed = true;
        }
        if (leftMargin) {
            if (typeof leftMargin === 'number') {
                leftMargin += 'px' as any;
            }
            style['--col-offset'] = width;
            fixed = true;
        }
        if (fixed) {
            classNames.add('col-fixed');
        }

        return <div
            className={classNames.toString()}
            id={id}
            style={style as any}
        >
            {this.props.children}
        </div>
    }
}