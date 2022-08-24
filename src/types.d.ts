declare global {
    interface BlockArray extends Array<BlockType> {
        /**
         * Swap elements of index at indexA and indexB;
         * MODIFIES array, and returns a SHALLOW COPY.
         * @param indexA first element to swap with
         * @param indexB second element to swap with
         */
        swap(indexA: number, indexB:number): T[];
        /**
         * remove an element from index of indexFrom, and place element into indexTo
         * MODIFIES array, and returns a SHALLOW COPY.
         * @param indexFrom the index to switch the element from
         * @param indexTo the index to swith the element to
         */
        insert(indexFrom:number, indexTo:number): T[];

        /**
         * compares the height of element at indexA to height of element at indexB
         * returns true if element at indexA is taller
         * @param indexA index of first element for comparison 
         * @param indexB index of second element for comparison
         */
        isFirstTaller(indexA:number, indexB:number): boolean;
    }
}


export type BlockType = {
    state: stateType,
    height: number,
    position: number,
    transition?: string
}

export {};