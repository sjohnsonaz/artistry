import * as React from 'react';

import { Button, ButtonBar, ButtonGroup, Section, ActionBarBreadcrumb, ActionBar, Scrollable, Divider } from 'modules/ArtistryReact';

export interface IButtonViewProps {

}

export interface IButtonViewState {
    locked: boolean;
    popoverOpen: boolean;
}

export default class ButtonView extends React.Component<IButtonViewProps, IButtonViewState> {
    constructor(props?: IButtonViewProps) {
        super(props);
        this.state = {
            locked: false,
            popoverOpen: false
        };
    }

    lockButton = () => {
        this.setState({ locked: true });
        window.setTimeout(() => {
            this.setState({ locked: false });
        }, 1000);
    }

    openPopover = () => {
        this.setState({ popoverOpen: true });
    }

    closePopover = () => {
        this.setState({ popoverOpen: false });
    }

    render() {
        return (
            <>
                <Section header="Buttons" headerSpace className="explode">
                    <Scrollable>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Standard</th>
                                    <th>Disabled</th>
                                    <th>Primary</th>
                                    <th>Disabled</th>
                                    <th>Danger</th>
                                    <th>Disabled</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Standard</th>
                                    <td>
                                        <Button>Edit</Button>
                                    </td>
                                    <td>
                                        <Button disabled>Edit</Button>
                                    </td>
                                    <td>
                                        <Button theme="primary">Save</Button>
                                    </td>
                                    <td>
                                        <Button theme="primary" disabled>Save</Button>
                                    </td>
                                    <td>
                                        <Button theme="danger">Delete</Button>
                                    </td>
                                    <td>
                                        <Button theme="danger" disabled>Delete</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Text</th>
                                    <td>
                                        <Button display="textonly">Edit</Button>
                                    </td>
                                    <td>
                                        <Button display="textonly" disabled>Edit</Button>
                                    </td>
                                    <td>
                                        <Button display="textonly" theme="primary">Save</Button>
                                    </td>
                                    <td>
                                        <Button display="textonly" theme="primary" disabled>Save</Button>
                                    </td>
                                    <td>
                                        <Button display="textonly" theme="danger">Delete</Button>
                                    </td>
                                    <td>
                                        <Button display="textonly" theme="danger" disabled>Delete</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Outline</th>
                                    <td>
                                        <Button display="outline">Edit</Button>
                                    </td>
                                    <td>
                                        <Button display="outline" disabled>Edit</Button>
                                    </td>
                                    <td>
                                        <Button display="outline" theme="primary">Save</Button>
                                    </td>
                                    <td>
                                        <Button display="outline" theme="primary" disabled>Save</Button>
                                    </td>
                                    <td>
                                        <Button display="outline" theme="danger">Delete</Button>
                                    </td>
                                    <td>
                                        <Button display="outline" theme="danger" disabled>Delete</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Underline</th>
                                    <td>
                                        <button className="button button-underline">Edit</button>
                                    </td>
                                    <td>
                                        <button className="button button-underline" disabled>Edit</button>
                                    </td>
                                    <td>
                                        <button className="button button-underline button-primary">Save</button>
                                    </td>
                                    <td>
                                        <button className="button button-underline button-primary" disabled>Save</button>
                                    </td>
                                    <td>
                                        <button className="button button-underline button-danger">Delete</button>
                                    </td>
                                    <td>
                                        <button className="button button-underline button-danger" disabled>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Scrollable>

                    <Divider />
                    <div className="space">
                        <h3>Sizes</h3>
                        <div className="align-center">
                            <Button displaySize="small">Small</Button>{' '}
                            <Button>Medium</Button>{' '}
                            <Button displaySize="large">Large</Button>
                        </div>
                    </div>

                    <Divider />
                    <div className="space">
                        <h3>Lockable Buttons</h3>
                        <ActionBar align="center">
                            <Button lockContent="Locked" locked={this.state.locked} onClick={this.lockButton}>Lockable Edit</Button>
                            <Button lockContent="Locked" locked={this.state.locked} onClick={this.lockButton} theme="primary">Lockable Save</Button>
                            <Button lockContent="Locked" locked={this.state.locked} onClick={this.lockButton} theme="danger">Lockable Delete</Button>
                        </ActionBar>
                    </div>
                </Section>
                <Section header="Button Group" space headerSpace>
                    <h3>Button Group</h3>
                    <div className="align-center">
                        <p>
                            <ButtonGroup>
                                <Button>View</Button>
                                <Button theme="primary" popover="Popover" popoverAlign="left" popoverSpace>Edit</Button>
                                <Button theme="danger">Delete</Button>
                            </ButtonGroup>
                        </p>
                        <p>
                            <ButtonGroup>
                                <Button display="textonly">View</Button>
                                <Button display="textonly" theme="primary">Edit</Button>
                                <Button display="textonly" theme="danger">Delete</Button>
                            </ButtonGroup>
                        </p>
                        <p>
                            <ButtonGroup>
                                <Button display="outline" >View</Button>
                                <Button display="outline" theme="primary">Edit</Button>
                                <Button display="outline" theme="danger">Delete</Button>
                            </ButtonGroup>
                        </p>
                    </div>

                    <h3>Button Bar</h3>
                    <div className="align-center">
                        <ButtonBar>
                            <Button>View</Button>
                            <Button theme="primary" popover="Popover" popoverAlign="left" popoverSpace>Edit</Button>
                            <Button theme="danger">Delete</Button>
                        </ButtonBar>
                    </div>

                    <h3>Action Bar</h3>
                    <div className="align-center">
                        <ActionBar>
                            <Button>View</Button>
                            <Button theme="primary" popover="Popover" popoverAlign="left" popoverSpace>Edit</Button>
                            <Button theme="danger">Delete</Button>
                        </ActionBar>
                    </div>

                    <h3>Tooltip</h3>
                    <div className="align-center">
                        <Button tooltip="Information..." tooltipDirection="right">Tooltip</Button>
                    </div>

                    <h3>Popover</h3>
                    <div className="align-center">
                        <Button
                            popover={<span><strong>Popover</strong> Text</span>}
                            popoverDirection="right"
                            popoverSpace
                        >Popover</Button>
                    </div>

                    <h3>Popover Menu</h3>
                    <div className="align-center">
                        <Button popover={<span><strong>Popover</strong> Text</span>} popoverDirection="right"
                            popoverMenu
                            popoverSpace
                            popoverOpen={this.state.popoverOpen}
                            onPopoverClose={this.closePopover}
                            onClick={this.openPopover}
                        >Popover Menu</Button>
                    </div>

                    <h3>Action Bar Breadcrumbs</h3>
                    <div className="explode-width">
                        <ActionBarBreadcrumb>
                            <Button display="underline">Home</Button>
                            <Button display="underline">Home</Button>
                            <Button display="underline">Home</Button>
                            <Button display="underline">Home</Button>
                            <Button display="underline">Home</Button>
                            <Button display="underline">Home</Button>
                            <Button display="underline">Home</Button>
                            <Button display="underline">Home</Button>
                            <Button display="underline">Home</Button>
                        </ActionBarBreadcrumb>
                    </div>
                </Section>
            </>
        );
    }
}
