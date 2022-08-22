export default class BodyScroll {
    static lockStack: {
        scrollTop: number;
        hideScroll: boolean;
    }[] = [];
    static rootSelector: string = '.layer-root';
    static bodyLockClass: string = 'body-scroll';
    static scrollbarWidth: string;

    static lock(hideScroll: boolean) {
        let body = document.body;
        let root = document.querySelector(this.rootSelector) as HTMLElement;
        if (root) {
            // We must query multiple objects for the scrollTop.
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || body.scrollTop || root.scrollTop;
            let currentHideScroll = body.getAttribute('data-lock') === 'hide';
            this.lockStack.push({
                scrollTop: scrollTop,
                hideScroll: currentHideScroll
            });
            if (this.lockStack.length === 1) {
                root.setAttribute('data-status', 'locked');
            }
            root.scrollTop = scrollTop;
            if (hideScroll) {
                body.setAttribute('data-lock', 'hide');
                root.setAttribute('data-pad-scroll', 'true');
            } else {
                body.setAttribute('data-lock', '');
                root.setAttribute('data-pad-scroll', '');
            }
        }
    }

    static unlock() {
        let body = document.body;
        let root = document.querySelector(this.rootSelector) as HTMLElement;
        if (root) {
            let lockConfig = this.lockStack.pop();
            if (!this.lockStack.length) {
                root.setAttribute('data-status', '');
            }
            if (lockConfig) {
                body.scrollTop = lockConfig.scrollTop;
                if (lockConfig.hideScroll) {
                    body.setAttribute('data-lock', 'hide');
                    root.setAttribute('data-pad-scroll', 'true');
                } else {
                    body.setAttribute('data-lock', '');
                    root.setAttribute('data-pad-scroll', '');
                }
                document.documentElement.scrollTop = lockConfig.scrollTop;
            }
        }
    }

    static init() {
        let body = document.body;
        body.classList.add(this.bodyLockClass);
        body.setAttribute('data-lock', 'init');
        this.scrollbarWidth = getComputedStyle(body).marginRight;
        body.setAttribute('data-lock', '');
        body.style.setProperty('--scrollbar-width', this.scrollbarWidth);

        let root = document.querySelector(this.rootSelector) as HTMLElement;
        if (root) {
            root.setAttribute('data-status', '');
        }

        window.addEventListener('beforeunload', () => {
            this.unlock();
        });
    }
}