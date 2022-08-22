export interface ICloseHandle {
    (event: React.SyntheticEvent): boolean | void;
}

export interface ICloseItem {
    close: ICloseHandle;
    confirm: ICloseHandle;
}

export default class DepthStack {
    static items: ICloseItem[] = [];

    static push(close: ICloseHandle, confirm?: ICloseHandle) {
        this.items.push({
            close: close,
            confirm: confirm
        });
    }

    static remove(close: ICloseHandle) {
        let index = this.items.findIndex(closeItem => {
            return (closeItem.close === close) || (closeItem.confirm === close);
        });
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    static close(event: React.SyntheticEvent) {
        let item = this.items[this.items.length - 1];
        if (item && item.close) {
            let result = item.close(event);
            if (result !== false) {
                // Use remove instead of pop in case already removed.
                DepthStack.remove(item.close);
            }
        }
    }

    static confirm(event: React.SyntheticEvent) {
        let item = this.items[this.items.length - 1];
        if (item && item.confirm) {
            let result = item.confirm(event);
            if (result !== false) {
                // Use remove instead of pop in case already removed.
                DepthStack.remove(item.confirm);
            }
        }
    }

    static init() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 13: // Enter
                    this.confirm(event as any);
                    break;
                case 27: // Escape
                    // TODO: Fix this
                    this.close(event as any);
                    break;
                default:
                    break;
            }
        });
        // Use onclick for iOS Safari
        window.onclick = (event: MouseEvent) => {
            // TODO: Fix this
            this.close(event as any);
        };
    }

    static blur() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
}