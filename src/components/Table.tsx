import * as React from 'react';

import ClassNames from '../util/ClassNames';

export interface IColumn<T> {
    property?: keyof T;
    header?: string | (() => any);
    footer?: string | (() => any);
    template?: (item: T, index?: number) => any;
    hidden?: boolean;
    action?: boolean;
}

export interface ITableProps<T> {
    className?: string;
    id?: string;
    data: T[];
    headers?: any[];
    footers?: any[];
    columns?: IColumn<T>[];
    template?: (item: T, index?: number) => any;
    templateTop?: any | (() => any);
    templateBottom?: any | (() => any);
    list?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    form?: boolean;
}

export default class Table<T> extends React.Component<ITableProps<T>, any> {
    render() {
        let {
            className,
            id,
            data,
            headers,
            columns,
            template,
            templateTop,
            templateBottom,
            striped,
            hoverable,
            form
        } = this.props;

        let classNames = new ClassNames(className);
        classNames.add('table');

        classNames.addTest('table-striped', striped);
        classNames.addTest('table-hoverable', hoverable);
        classNames.addTest('table-form', form);

        let renderedTitles: any = undefined;
        if (headers) {
            renderedTitles = headers.map((header, index) => {
                return (
                    <th key={index}>{header}</th>
                );
            });
        } else if (columns) {
            renderedTitles = columns.map((column, index) => {
                return (
                    <th key={index} className={column.action ? 'action-column' : undefined}>
                        {typeof column.header === 'function' ?
                            column.header() :
                            column.header}
                    </th>
                );
            });
        }

        let renderedBody;
        if (data) {
            if (template) {
                renderedBody = data.map((item, index) => template(item, index));
            } else if (columns) {
                renderedBody = data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((column, index) => {
                            if (column.template) {
                                return column.template(item);
                            } else if (column.property) {
                                return <td key={'td-' + index}>{item[column.property]}</td>
                            } else {
                                return <td key={'td-' + index}></td>
                            }
                        })}
                    </tr>
                ));
            } else {
                renderedBody = data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((value, index) => <td key={index}>{value}</td>)}
                    </tr>
                ));
            }
        }

        return (
            <table className={classNames.toString()} id={id}>
                {renderedTitles ?
                    <thead>
                        <tr>
                            {renderedTitles}
                        </tr>
                    </thead>
                    : undefined}
                <tbody className={this.props.list ? 'list' : ''}>
                    {typeof templateTop === 'function' ? templateTop() : templateTop}
                    {renderedBody}
                    {typeof templateBottom === 'function' ? templateBottom() : templateBottom}
                </tbody>
                <tfoot>
                    <tr>
                    </tr>
                </tfoot>
            </table>
        );
    }
}
