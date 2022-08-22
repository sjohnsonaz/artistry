import * as React from 'react';

import { Button, ButtonBar, Modal, Section } from 'modules/ArtistryReact';

export interface IModalViewProps {

}

export interface IModalViewState {
    modalOpen: boolean;
    modalLock: boolean;
    innerModalOpen: boolean;
}

export default class ModalView extends React.Component<IModalViewProps, IModalViewState> {
    constructor(props?: IModalViewProps) {
        super(props);
        this.state = {
            modalOpen: false,
            modalLock: false,
            innerModalOpen: false
        };
    }

    openModal = () => {
        this.setState({ modalOpen: true });
    }

    closeModal = () => {
        this.setState({ modalOpen: false });
        console.log('close');
    }

    confirmModal = () => {
        this.setState({ modalOpen: false });
        console.log('confirm');
    }

    openInnerModal = () => {
        this.setState({ innerModalOpen: true });
    }

    closeInnerModal = () => {
        this.setState({ innerModalOpen: false });
    }

    lockModal = () => {
        this.setState({ modalLock: true });
        window.setTimeout(() => {
            this.setState({ modalLock: false });
        }, 1000);
    }

    render() {
        return (
            <Section header="Modal" space headerSpace>
                <Button onClick={this.openModal}>Open Modal</Button>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}
                    onConfirm={this.confirmModal}
                    title="Modal"
                    animation="top"
                    screenSize="small"
                    lockable
                    locked={this.state.modalLock}
                    closeable
                    space
                >
                    <div>test</div>
                    <ButtonBar>
                        <Button onClick={this.openInnerModal}>Open Inner Modal</Button>
                        <Button onClick={this.lockModal}>Lock Modal</Button>
                    </ButtonBar>
                    <Modal
                        open={this.state.innerModalOpen}
                        onClose={this.closeInnerModal}
                        title="Inner Modal"
                        animation="center"
                        closeable
                    >
                        <div>inner test</div>
                    </Modal>
                </Modal>
            </Section>
        );
    }
}
