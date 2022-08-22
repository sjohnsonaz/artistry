import * as React from 'react';

import { FileUpload, Section } from 'modules/ArtistryReact';

export interface ITableViewProps {

}

export default class TableView extends React.Component<ITableViewProps, any> {
    select = async (files: FileList) => {
        console.log('files:', files);
        return undefined;
    }

    render() {
        return (
            <Section
                header="File Upload"
                headerSpace
                space
            >
                <FileUpload onSelect={this.select} />
            </Section>
        );
    }
}
