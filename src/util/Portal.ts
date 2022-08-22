export default class Portal {
    static elements: {
        [index: string]: HTMLElement;
    } = {};

    static addElement(name: string, element: HTMLElement | string) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (!element) {
            throw new Error('No Portal element found');
        }
        this.elements[name] = element;
    }

    static removeElement(name: string) {
        delete this.elements[name];
    }

    static getElement(name: string) {
        if (!this.elements[name]) {
            throw new Error('No Portal element found');
        }
        return this.elements[name];
    }
}