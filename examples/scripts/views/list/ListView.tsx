import * as React from 'react';

import { Cell, Grid, Icon, List, Search, Section, Row } from 'modules/ArtistryReact';
import { wait } from '../../../../src/util/PromiseUtil';

export interface IListViewProps {

}

export interface IListViewState {
    searchValue?: string;
    showOptions?: boolean;
    options?: IListData[];
}

interface IListData {
    ingredient: string;
    quantity: string | number;
    unit: string;
}

let data: IListData[] = [{
    ingredient: 'Potato',
    quantity: '8 - 10',
    unit: 'potato'
}, {
    ingredient: 'Salt',
    quantity: 1,
    unit: 'teaspoon'
}, {
    ingredient: 'Butter',
    quantity: '2',
    unit: 'tablespoon'
}, {
    ingredient: 'Pepper',
    quantity: 1,
    unit: 'dash'
}, {
    ingredient: 'Hot Milk',
    quantity: '1/4',
    unit: 'cup'
}, {
    ingredient: 'Scallions',
    quantity: '1/8',
    unit: 'cup'
}, {
    ingredient: 'Cheese',
    quantity: '1/8',
    unit: 'cup'
}];

export default class ListView extends React.Component<IListViewProps, IListViewState> {
    constructor(props: IListViewProps, context: any) {
        super(props, context);
        this.state = {
            searchValue: '',
            showOptions: false,
            options: []
        };
    }

    onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchValue: event.target.value
        });
        await wait(1000);
        this.setState({
            showOptions: true,
            options: data
        });
    }

    onSelectOption = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>, value?: string) => {
        this.setState({
            searchValue: value,
            showOptions: false
        });
    }

    onSearch = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>, value?: string) => {
        this.setState({
            searchValue: value,
            showOptions: false
        });
    };

    onClose = (event: React.SyntheticEvent<HTMLElement>) => {
        this.setState({
            showOptions: false
        });
    }

    altAction?: (option: string) => any;

    render() {
        return (
            <Section header="List" headerSpace>
                <Grid space>
                    <Row>
                        <Cell>
                            <Search
                                value={this.state.searchValue}
                                options={[
                                    'Option 1',
                                    'Option 2',
                                    'Option 3'
                                ]}
                                showOptions={this.state.showOptions}
                                onChange={this.onChange}
                                onSelectOption={this.onSelectOption}
                                onSearch={this.onSearch}
                                onClose={this.onClose}
                                altAction={this.altAction}
                                fill
                                buttonText={<span className="nowrap"><Icon name="search" /> Search</span>}
                                screenSize="small"
                            />
                        </Cell>
                    </Row>
                </Grid>
                <List
                    data={this.state.options}
                    template={item => item.ingredient}
                    active={3}
                    selected={[1, 3, 5]}
                    space
                />
            </Section>
        );
    }
}
