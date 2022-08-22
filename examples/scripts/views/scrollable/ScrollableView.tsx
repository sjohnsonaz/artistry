import * as React from 'react';
import { Scrollable, Section, CardContainer, Card } from 'modules/ArtistryReact';

export interface IScrollableViewProps {

}

export default class ScrollableView extends React.Component<IScrollableViewProps> {
    bottom = async () => {
        console.log('bottom!');
    }

    render() {
        let values = [];
        for (let index = 0; index < 100; index++) {
            values.push(index);
        }
        return (
            <Section header="Scrollable" headerSpace>
                <Scrollable type="y" height="200px" bumper={10} onBottomEnter={this.bottom}>
                    <CardContainer space>
                        {values.map((value, index) => <Card key={index}
                            header="Card"
                            space
                        >
                            {value}
                        </Card>)}
                    </CardContainer>
                </Scrollable>
            </Section>
        );
    }
}