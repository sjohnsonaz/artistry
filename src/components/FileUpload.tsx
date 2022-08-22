import * as React from 'react';

export interface IFileUploadProps {
    id?: string;
    className?: string;
    onSelect: (files: FileList) => Promise<any>;
    value?: string;
    text?: string;
}

export interface IFileUploadState {
    dragging?: boolean;
    uploading?: boolean;
}

export default class FileUpload extends React.Component<IFileUploadProps, IFileUploadState> {
    fileInput: React.RefObject<HTMLInputElement> = React.createRef();
    state: IFileUploadState = {
        dragging: false,
        uploading: false
    };

    handleFiles = (files: FileList) => {
        this.setState({
            uploading: true
        }, async () => {
            await this.props.onSelect(files);
            this.setState({
                uploading: false
            });
        });
    }

    click = () => {
        this.fileInput.current.click();
    }

    clickStop = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    }

    select = () => {
        let fileInput = this.fileInput.current;
        let files = fileInput.files;
        if (files && files.length) {
            this.handleFiles(files);
        }
    }

    drop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.dragLeave(event);
        let files = event.dataTransfer.files;
        if (files && files.length) {
            this.handleFiles(files);
        }
    }

    dragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            dragging: true
        });
    }

    dragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            dragging: false
        });
    }

    render() {
        let {
            id,
            className,
            text,
            value
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('file-upload');

        return (
            <div
                id={id}
                className={classNames.join(' ')}
                onDragOver={this.dragEnter}
                onDragEnter={this.dragEnter}
                onDragLeave={this.dragLeave}
                onDragEnd={this.dragLeave}
                onDrop={this.drop}
                onClick={this.click}
                data-dragging={this.state.dragging}
                data-uploading={this.state.uploading}
            >
                <input
                    type="file"
                    onChange={this.select}
                    value={value}
                    onClick={this.clickStop}
                    multiple
                    ref={this.fileInput}
                />
                {text || 'Click or Drag and Drop to upload'}
            </div>
        );
    }
}