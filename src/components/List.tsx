import * as React from 'react';

export interface IListProps<T> {
    id?: string;
    className?: string;
    data: T[];
    space?: boolean;
    active?: number;
    selected?: number[];
    template?: (item: T, index?: number) => any;
}

export default class List<T> extends React.Component<IListProps<T>, any> {
    render() {
        let {
            className,
            id,
            data,
            space,
            selected,
            active,
            template
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('list');

        if (space) {
            classNames.push('list-space');
        }

        let hash: { [index: number]: boolean; } = {};
        if (selected) {
            for (let x of selected) {
                hash[x] = true;
            }
        }

        return (
            <ul className={classNames.join(' ')} id={id}>
                {data ? data.map((item, index) => {
                    let className: string = undefined;
                    if (active === index) {
                        className = 'list-option-active';
                    } else if (hash[index]) {
                        className = 'list-option-selected';
                    }
                    return (
                        <li
                            key={index}
                            className={className}
                        >
                            {template ? template(item, index) : item}
                        </li>
                    );
                }) : undefined}
            </ul>
        );
    }
}