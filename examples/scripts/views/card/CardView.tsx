import * as React from 'react';

import { Button, Card, CardCarousel, CardContainer, CardControl, CardSection, Cell, Closeable, Fillable, Grid, Row, Section } from 'modules/ArtistryReact';

import VerticalCard from './VerticalCard';

export interface ICardViewProps {

}

export interface ICardViewState {
    closed?: boolean;
    filled?: boolean;
    index?: number;
}

export default class CardView extends React.Component<ICardViewProps, ICardViewState> {
    constructor(props?: ICardViewProps) {
        super(props);
        this.state = {
            closed: false,
            index: 0
        };
    }

    toggleClosed = () => {
        this.setState({
            closed: !this.state.closed
        });
    }

    toggleFilled = () => {
        this.setState({
            filled: !this.state.filled
        });
    }

    clickNext = () => {
        this.setState({
            index: this.state.index + 1
        });
    }

    clickPrevious = () => {
        this.setState({
            index: this.state.index - 1
        });
    }

    render() {
        return (
            <Section header="Card" space headerSpace>
                <h3>Card</h3>
                <CardContainer>
                    <VerticalCard />
                    <Fillable card filled={this.state.filled}>
                        <Card grid space fill>
                            <Row>
                                <Cell>
                                    Card Content
                            </Cell>
                                <Cell>
                                    <Button onClick={this.toggleClosed}>Expand</Button>
                                    <Button onClick={this.toggleFilled}>Fill</Button>
                                </Cell>
                            </Row>
                            <Closeable closed={this.state.closed}>
                                <Grid>
                                    <Row>
                                        <Cell>
                                            Card Content
                                </Cell>
                                    </Row>
                                </Grid>
                            </Closeable>
                        </Card>
                    </Fillable>
                </CardContainer>
                <Card type="success" handle="left" square>
                    <CardSection multiColumn>
                        <CardControl title="Title 1">Data 1</CardControl>
                        <CardControl title="Title 2">Data 2</CardControl>
                        <CardControl title="Title 3">Data 3</CardControl>
                        <CardControl title="Title 4">Data 4</CardControl>
                    </CardSection>
                </Card>
                <div>
                    <Button onClick={this.clickPrevious}>&lt;</Button>
                    <CardCarousel activeIndex={this.state.index}>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                        <Card type="success" handle="left" square>
                            <CardSection multiColumn>
                                <CardControl title="Title 1">Data 1</CardControl>
                                <CardControl title="Title 2">Data 2</CardControl>
                                <CardControl title="Title 3">Data 3</CardControl>
                                <CardControl title="Title 4">Data 4</CardControl>
                            </CardSection>
                        </Card>
                    </CardCarousel>
                    <Button onClick={this.clickNext}>&gt;</Button>
                </div>
            </Section>
        );
    }
}