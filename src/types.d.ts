declare global {
    interface Array<T> {
        swap(indexA: number, indexB:number): T[];
        insert(indexFrom:number, indexTo:number): T[];
    }
}

export {};