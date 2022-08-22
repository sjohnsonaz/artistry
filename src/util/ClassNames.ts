
export default class ClassNames {
    parts: { [index: string]: string } = {};

    constructor(...names: string[]) {
        for (let index = 0, length = names.length; index < length; index++) {
            let name = names[index];
            if (name) {
                this.parts[name] = name;
            }
        }
    }

    add(...names: string[]) {
        for (let index = 0, length = names.length; index < length; index++) {
            let name = names[index];
            this.parts[name] = name;
        }
    }

    remove(...names: string[]) {
        for (let index = 0, length = names.length; index < length; index++) {
            let name = names[index];
            delete this.parts[name];
        }
    }

    addTest(name: string | string[], show: boolean) {
        if (show) {
            if (name instanceof Array) {
                this.add(...name);
            } else {
                this.add(name);
            }
        }
    }

    toString() {
        return Object.values(this.parts).join(' ');
    }

    static test(name: string | string[], show: boolean) {
        let output;
        if (show) {
            if (name instanceof Array) {
                output = name.join(' ');
            } else {
                output = name;
            }
        } else {
            output = '';
        }
        return output;
    }

    static classListAdd(element: HTMLElement, className: string) {
        className = className.trim();

        let classNames = element.className.split(' ');
        let hash = {};
        for (let index = 0, length = classNames.length; index < length; index++) {
            let name = classNames[index].trim();
            if (name) {
                hash[name] = name;
            }
        }

        hash[className] = className;

        classNames = Object.keys(hash);
        element.className = Object.keys(hash).join(' ');
    }

    static classListRemove(element: HTMLElement, className: string) {
        className = className.trim();

        let classNames = element.className.split(' ');
        let hash = {};
        for (let index = 0, length = classNames.length; index < length; index++) {
            let name = classNames[index].trim();
            if (name) {
                hash[name] = name;
            }
        }

        delete hash[className];

        element.className = Object.keys(hash).join(' ');
    }
}
