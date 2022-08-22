import * as React from 'react';

import { ActionBar, AmountInput, Button, Divider, Form, FormGroup, Input, FormText, Section, TimePicker } from 'modules/ArtistryReact';
import TimeInput from '../../../../src/components/TimeInput';

export interface IFormViewProps {

}

export interface IFormViewState {
    date?: Date;
    amount: number;
}

export default class FormView extends React.Component<IFormViewProps, any> {
    state: IFormViewState = {
        date: new Date(Date.now()),
        amount: 0
    }

    render() {
        return (
            <Section header="Form" headerSpace>
                <Form
                    screenSize="small"
                    onEnter={(event: KeyboardEvent) => {
                        event.preventDefault();
                        console.log('enter')
                    }}
                    onEscape={(event: KeyboardEvent) => {
                        event.preventDefault();
                        console.log('escape')
                    }}
                >
                    <FormGroup label="Value">
                        <Input type="text" fill />
                    </FormGroup>
                    <FormGroup label="Text" text="Text">
                        <Input type="text" fill required />
                    </FormGroup>
                    <FormGroup label="Success" theme="success" text="Success">
                        <Input type="text" fill />
                    </FormGroup>
                    <FormGroup label="Info" theme="info" text="Info">
                        <Input type="text" fill />
                    </FormGroup>
                    <FormGroup label="Warning" theme="warning" text="Warning">
                        <Input type="text" fill />
                    </FormGroup>
                    <FormGroup label="Error" theme="danger" text="Error">
                        <Input type="text" fill />
                    </FormGroup>
                    <Divider />
                    <FormText fill>
                        <h2>Masked Inputs</h2>
                    </FormText>
                    <FormGroup label="Time">
                        <Input mask="[[0-23]]:[[0-59]]" fill />
                    </FormGroup>
                    <FormGroup label="Phone">
                        <Input mask="(999) 999-9999" fill />
                    </FormGroup>
                    <FormGroup label="Color">
                        <Input mask="#000000" fill />
                    </FormGroup>
                    <Divider />
                    <FormText fill>
                        <h3>Test Examples</h3>
                    </FormText>
                    <FormGroup label="99999">
                        <Input mask="99999" fill />
                    </FormGroup>
                    <FormGroup label="aaaaa">
                        <Input mask="aaaaa" fill />
                    </FormGroup>
                    <FormGroup label="nnnnn">
                        <Input mask="nnnnn" fill />
                    </FormGroup>
                    <FormGroup label="[[0-23]]00000">
                        <Input mask="[[0-23]]00000" fill />
                    </FormGroup>
                    <FormGroup label="99aa99aa99aa">
                        <Input mask="99aa99aa99aa" fill />
                    </FormGroup>
                    <Divider />
                    <FormText fill>
                        <h3>Advanced Input</h3>
                    </FormText>
                    <FormGroup label="Time Input">
                        <TimeInput
                            fill
                            value={this.state.date.toUTCString()}
                            onChange={(event) => {
                                let value = (event.target as any).value;
                                let date = new Date(this.state.date);
                                let parts = value.split(':').map(part => parseInt(part));
                                if (parts) {
                                    date.setHours(parts[0], parts[1]);
                                }
                                this.setState({
                                    date: date
                                });
                                console.log(date);
                            }}
                        />
                    </FormGroup>
                    <FormGroup label="Time Picker">
                        <TimePicker
                            value={this.state.date}
                            onChange={(event, date?: Date) => {
                                event;
                                if (date) {
                                    this.setState({
                                        date: date
                                    });
                                    console.log(date);
                                }
                            }}
                        />
                    </FormGroup>
                    <FormGroup label="Time with Seconds">
                        <TimeInput
                            fill
                            seconds
                            value={this.state.date.toUTCString()}
                            onChange={(event) => {
                                let value = (event.target as any).value;
                                let date = new Date(this.state.date);
                                let parts = value.split(':').map(part => parseInt(part));
                                if (parts) {
                                    date.setHours(parts[0], parts[1], parts[2]);
                                }
                                this.setState({
                                    date: date
                                });
                                console.log(date);
                            }}
                        />
                    </FormGroup>
                    <FormGroup label="Amount" nonLabel>
                        <AmountInput value={this.state.amount} minimum={1} maximum={10} onChange={(value) => {
                            this.setState({
                                amount: value
                            });
                        }} />
                    </FormGroup>
                    <Divider />
                    <ActionBar>
                        <Button>Cancel</Button>
                        <Button theme="primary">Save</Button>
                    </ActionBar>
                </Form>
            </Section>
        );
    }
}
