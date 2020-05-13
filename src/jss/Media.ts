export default class Media {
    static minWidth(size: number) {
        let mediaQuery = new MediaQuery();
        mediaQuery.only(MediaType.Screen, minWidth(size));
        return mediaQuery.toString();
    }
}

export function minWidth(size: number) {
    return `(min-width: ${size})`;
}

export class Query {
    not: boolean;
    only: boolean;
    clauses: string[];

    toString() {
        if (this.clauses && this.clauses.length) {
            let output = this.clauses.join(' and ');
            if (this.only) {
                output = 'only ' + output;
            }
            if (this.not) {
                output = 'not ' + output;
            }
            return output;
        } else {
            return '';
        }
    }
}

export class MediaQuery {
    queries: Query[];

    constructor(...queries: Query[]) {
        this.queries = queries;
    }

    query(...clauses: string[]) {
        let query = new Query();
        query.clauses = clauses;
        this.queries.push(query);
        return query;
    }

    not(...clauses: string[]) {
        let query = new Query();
        query.clauses = clauses;
        query.not = true;
        this.queries.push(query);
        return query;
    }

    only(...clauses: string[]) {
        let query = new Query();
        query.clauses = clauses;
        query.only = true;
        this.queries.push(query);
        return query;
    }

    notOnly(...clauses: string[]) {
        let query = new Query();
        query.clauses = clauses;
        query.not = true;
        query.only = true;
        this.queries.push(query);
        return query;
    }

    toString() {
        return '@media ' + this.queries.join(', ');
    }
}

export enum MediaType {
    All = 'all',
    Print = 'print',
    Screen = 'screen',
    Speech = 'speech'
}