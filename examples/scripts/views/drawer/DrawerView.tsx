import * as React from 'react';

import { ActionBar, Button, Drawer, Divider, Form, FormGroup, Section, } from 'modules/ArtistryReact';

export interface IDrawerViewProps {

}

export interface IDrawerViewState {
    drawerOpen: boolean;
}

export default class DrawerView extends React.Component<IDrawerViewProps, IDrawerViewState> {
    constructor(props?: IDrawerViewProps) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    openDrawer = () => {
        this.setState({ drawerOpen: true });
    }

    closeDrawer = () => {
        this.setState({ drawerOpen: false });
    }

    render() {
        return (
            <Section header="Drawer" space headerSpace>
                <Button onClick={this.openDrawer}>Open Drawer</Button>
                <Drawer open={this.state.drawerOpen} onClose={this.closeDrawer}>
                    <Button onClick={this.closeDrawer} className="pull-right">Close</Button>
                    <p>Drawer Content</p>
                    <br />
                    <Form>
                        <FormGroup label="Input">
                            <input className="input" />
                        </FormGroup>
                        <Divider />
                        <ActionBar>
                            <Button theme="primary">OK</Button>
                        </ActionBar>
                    </Form>
                </Drawer>
            </Section>
        );
    }
}
