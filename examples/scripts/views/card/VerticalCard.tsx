import * as React from 'react';

import { Button, Card, Cell, Closeable, Fillable, Grid, Row, Section } from 'modules/ArtistryReact';

import ImageGenerator from '../../util/ImageGenerator';

export interface IVerticalCardProps {

}

export interface IVerticalCardState {
    closed?: boolean;
}

export default class VerticalCard extends React.Component<IVerticalCardProps, IVerticalCardState> {
    image: string;

    constructor(props?: IVerticalCardProps) {
        super(props);
        this.state = {
            closed: true
        };
        this.image = ImageGenerator.createPlaceholder(350, 150);
    }

    toggleClosed = () => {
        this.setState({
            closed: !this.state.closed
        });
    }

    render() {
        return (
            <Card
                header={<span>Card Content</span>}
                nav={<Button onClick={this.toggleClosed}>Expand</Button>}
                grid
            >
                <Row>
                    <Cell>
                        <img src={this.image} />
                    </Cell>
                </Row>
                <Row>
                    <Cell>
                        Card Content
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
        );
    }
}