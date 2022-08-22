import * as React from 'react';

import { Cell, Grid, Row, Section } from 'modules/ArtistryReact';

export interface IGridViewProps {

}

export default class GridView extends React.Component<IGridViewProps, any> {
    render() {
        return (
            <Section header="Grid" headerSpace>
                <h3>Grid</h3>
                <Grid screenSize="small" space>
                    <Row>
                        <Cell>Item 1</Cell>
                        <Cell>Item 2</Cell>
                        <Cell>Item 3</Cell>
                    </Row>
                    <Row>
                        <Cell columns={12}>Item 1</Cell>
                    </Row>
                    <Row>
                        <Cell columns={6}>Item 1</Cell>
                        <Cell columns={6}>Item 2</Cell>
                    </Row>
                    <Row>
                        <Cell columns={4}>Item 1</Cell>
                        <Cell columns={4}>Item 2</Cell>
                        <Cell columns={4}>Item 3</Cell>
                    </Row>
                    <Row>
                        <Cell columns={3}>Item 1</Cell>
                        <Cell columns={3}>Item 2</Cell>
                        <Cell columns={3}>Item 3</Cell>
                        <Cell columns={3}>Item 4</Cell>
                    </Row>
                    <Row>
                        <Cell columns={1} offset={1}>Item 1</Cell>
                        <Cell columns={3} offset={2}>Item 2</Cell>
                        <Cell columns={1}>Item 3</Cell>
                        <Cell columns={1}>Item 4</Cell>
                    </Row>
                </Grid>
            </Section>
        );
    }
}
