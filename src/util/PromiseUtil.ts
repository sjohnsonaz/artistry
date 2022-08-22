import * as React from 'react';

export function wait(time: number) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, time);
    });
}

export function waitAnimation(time?: number) {
    return new Promise((resolve) => {
        if (time) {
            window.setTimeout(() => {
                window.requestAnimationFrame(resolve);
            }, time);
        } else {
            window.requestAnimationFrame(resolve);
        }
    });
}

export function setState<T>(state: T, thisArg: React.Component<any, T>): Promise<void> {
    return new Promise((resolve) => {
        thisArg.setState(state, () => {
            resolve();
        });
    })
}