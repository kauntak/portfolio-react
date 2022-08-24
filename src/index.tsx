import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class BlockArray<T> extends Array<T> {
  constructor(...items){
    super(...items);
    this.swap = (indexA, indexB) => {
      const temp = this[indexA];
      this[indexA] = this[indexB];
      this[indexB] = temp;
      return this;
    }
    this.insert = (indexFrom, indexTo) => {
      const temp = this[indexFrom];
      const isLarger = indexFrom < indexTo;
      for(let i = indexFrom; isLarger? i < indexTo: i > indexTo ;isLarger? i++ : i--){
        if(isLarger){
          
        }
      }
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
