import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BlockType } from './types';






export class BlockArray extends Array<BlockType> {
    /**
     * Swap elements of index at indexA and indexB;
     * MODIFIES array, and returns a SHALLOW COPY.
     * @param indexA first element to swap with
     * @param indexB second element to swap with
     */
    swap: (indexA: number, indexB:number) => BlockArray;
    /**
     * remove an element from index of indexFrom, and place element into indexTo
     * MODIFIES array, and returns a SHALLOW COPY.
     * @param indexFrom the index to switch the element from
     * @param indexTo the index to swith the element to
     */
    insert: (indexFrom:number, indexTo:number) => BlockArray;

    /**
     * compares the height of element at indexA to height of element at indexB
     * returns true if element at indexA is taller
     * @param indexA index of first element for comparison 
     * @param indexB index of second element for comparison
     */
    isFirstTaller: (indexA:number, indexB:number) => boolean;
    /**
     * performs a shallow copy of the Block Array
     */
    copy: () => BlockArray
  constructor(...items:T[]){
    super(...items);
    this.copy = () => {
      const newBlocks = new BlockArray();
      for(let i in this){
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
      const isLarger = indexFrom < indexTo;
      for(let i = indexFrom; isLarger? i < indexTo: i > indexTo ;isLarger? i++ : i--){
        if(isLarger){
          this[i] = this[i + 1];
        } else {
          this[i] = this[i - 1];
        }
      }
      this[indexTo] = temp;
      return this.copy();
    }
    this.isFirstTaller = (indexA, indexB) => {
      return (this[indexA].height > this[indexB].height)
    }
  }

}

// if( ! Array.prototype.swap) {
//   Array.prototype.swap = (indexA, indexB) => {
//     const temp = this[indexA];
//     this[indexA] = this[indexB];
//     this[indexB] = temp;
//     return this;
//   }
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
