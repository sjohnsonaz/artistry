export default class Portal {
    static elements: {
        [index: string]: HTMLElement;
    } = {};

    static addElement(name: string, element: HTMLElement | string) {
        const newElement =
            typeof element === 'string'
                ? document.getElementById(element)
                : element;
        if (!newElement) {
            throw new Error('No Portal element found');
        }
        this.elements[name] = newElement;
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
