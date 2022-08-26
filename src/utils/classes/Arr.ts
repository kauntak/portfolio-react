export class Arr<T> extends Array<T> {
    /**
     * Swap elements of index at indexA and indexB;
     * MODIFIES array, and returns a SHALLOW COPY.
     * @param indexA first element to swap with
     * @param indexB second element to swap with
     */
    swap: (indexA: number, indexB:number) => Arr<T>;
    /**
     * remove an element from index of indexFrom, and place element into indexTo
     * MODIFIES array, and returns a SHALLOW COPY.
     * @param indexFrom the index to switch the element from
     * @param indexTo the index to swith the element to
     */
    insert: (indexFrom:number, indexTo:number) => Arr<T>;

    /**
     * compares the height of element at indexA to height of element at indexB
     * returns true if element at indexA is taller
     * @param indexA index of first element for comparison 
     * @param indexB index of second element for comparison
     */
    isFirstLarger: (indexA:number, indexB:number) => boolean;
    /**
     * performs a shallow copy of the Block Array
     */
    copy: () => Arr<T>
    
  constructor(items:number = 0){
    super(items);
    this.copy = () => {
      const newBlocks = new Arr<T>();
      for(let i = 0; i < this.length; i++){
        newBlocks[i] = this[i];
      }
      return newBlocks;
    }
    this.swap = (indexA, indexB) => {
      const temp = this[indexA];
      this[indexA] = this[indexB];
      this[indexB] = temp;
      return this.copy();
    }
    this.insert = (indexFrom, indexTo) => {
      const temp = this[indexFrom];
      const toIsLarger = indexFrom < indexTo;
      for(let i = indexFrom; toIsLarger? i < indexTo: i > indexTo ;toIsLarger? i++ : i--){
        if(toIsLarger){
          this[i] = this[i + 1];
        } else {
          this[i] = this[i - 1];
        }
      }
      this[indexTo] = temp;
      return this.copy();
    }
    this.isFirstLarger = (indexA, indexB) => {
      return (this[indexA] > this[indexB])
    }
  }
}