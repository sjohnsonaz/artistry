export interface CustomEventListener<T = any> extends EventListener {
    (evt: CustomEvent<T>): void;
}

export interface CustomEventTarget<T = any> extends EventTarget {
    addEventListener<U extends keyof T>(type: U, callback: CustomEventListener<T[U]>): void;
    addEventListener<U extends keyof T>(type: U | string, callback: CustomEventListener<T[U]>): void;
    removeEventListener<U extends keyof T>(type: U, callback: CustomEventListener<T[U]>): void;
    removeEventListener<U extends keyof T>(type: U | string, callback: CustomEventListener<T[U]>): void;
    sendEvent<U extends keyof T>(type: U, detail?: T[U]): void;
    sendEvent<U extends keyof T>(type: U | string, detail?: T[U]): void;
}

export default class BaseEventTarget<T = any> implements EventTarget {
    listeners: {
        [index: string]: CustomEventListener[];
    } = {};

    addEventListener(type: string, callback: CustomEventListener): void;
    addEventListener<U extends keyof T>(type: U, callback: CustomEventListener<T[U]>): void;
    addEventListener<U extends keyof T>(type: U | string, callback: CustomEventListener<T[U]>): void {
        if (!(type in this.listeners)) {
            this.listeners[type as string] = [];
        }
        this.listeners[type as string].push(callback);
    }

    removeEventListener(type: string, callback: CustomEventListener): void;
    removeEventListener<U extends keyof T>(type: U, callback: CustomEventListener<T[U]>): void;
    removeEventListener<U extends keyof T>(type: U | string, callback: CustomEventListener<T[U]>): void {
        if (!(type in this.listeners)) {
            return;
        }
        var stack = this.listeners[type as string];
        for (var i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return;
            }
        }
    }

    dispatchEvent(event: CustomEvent) {
        if (!(event.type in this.listeners)) {
            return true;
        }
        var stack = this.listeners[event.type];

        for (var i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, event);
        }
        return !event.defaultPrevented;
    }

    sendEvent<U extends keyof T>(type: U, detail?: T[U]): void;
    sendEvent<U extends keyof T>(type: U | string, detail?: T[U]): void {
        this.dispatchEvent(new CustomEvent(type as string, detail ? { detail: detail } : undefined));
    }
}

export interface DOMEvent<T extends Node = Node> extends Event {
    target: T;
}