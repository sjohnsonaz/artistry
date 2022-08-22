import * as React from 'react';

import { Table, Section } from 'modules/ArtistryReact';

export interface ITableViewProps {

}

interface ITableData {
    id: number;
    ingredient: string;
    quantity: string | number;
    unit: string;
}

let data: ITableData[] = [{
    id: 0,
    ingredient: 'Potato',
    quantity: '8 - 10',
    unit: 'potato'
}, {
    id: 1,
    ingredient: 'Salt',
    quantity: 1,
    unit: 'teaspoon'
}, {
    id: 2,
    ingredient: 'Butter',
    quantity: '2',
    unit: 'tablespoon'
}, {
    id: 3,
    ingredient: 'Pepper',
    quantity: 1,
    unit: 'dash'
}, {
    id: 4,
    ingredient: 'Hot Milk',
    quantity: '1/4',
    unit: 'cup'
}];

export default class TableView extends React.Component<ITableViewProps, any> {
    render() {
        return (
            <Section header="Table" headerSpace>
                <Table
                    id="table-component"
                    data={data}
                    columns={[{
                        header: 'Ingredient',
                        property: 'ingredient'
                    }, {
                        header: 'Quantity',
                        property: 'quantity',
                        template: item => <th key={item.id}><strong>{item.quantity}</strong></th>
                    }, {
                        header: 'Unit',
                        property: 'unit'
                    }]}
                />
            </Section>
        );
    }
}
