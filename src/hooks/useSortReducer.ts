import { Dispatch, Reducer, ReducerState, useReducer, } from "react";
import { BlockArray } from "..";

export const SORT_STATE = {
    SORTED:"sorted",
    UNSORTED:"unsorted",
    TARGET: "target",
    CURRENT_TARGET: "currentTarget"
} as const;

export const SORT_ACTION = {
    RESET:"reset",
    COMPLETE:"complete",
    SWAP:"swap",
    INSERT:"insert",
    COMPARE:"compare"
} as const;

type ResetAction = {
    type:"reset",
    payload?:number
}
type CompareAction = {
    type: "compare",
    payload: {
        indexA: number,
        indexB: number
    }
}
type SwapAction = {
    type: "swap",
    payload: {
        blocks:BlockArray,
        indexA: number,
        indexB?: number
    }
}

type InsertAction = {
    type: "insert",
    payload: {
        blocks:BlockArray,
        indexFrom: number,
        indexTo: number,
    }
}

type CompleteAction = {
    type: "complete",
    payload: number
}

type Action = ResetAction | CompareAction | SwapAction | InsertAction | CompleteAction;

type StateType = {
    blocks: BlockArray,
    compare: [number, number]|[],
    swap: [number, number|undefined]|[],
    complete: number[]
}

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 5
const WIDTH = 40;

const getRandomHeight = ():number =>{
    return Math.floor(Math.random() * MAX_HEIGHT) + MIN_HEIGHT;
}

function init(amount:number = 100):StateType{
    const blocks:BlockArray = new BlockArray(amount);
    for(let i = 0; i < blocks.length; i++){
        blocks[i] = {
            height: getRandomHeight()
        };
    }

    return {
        blocks,
        compare: [],
        swap: [],
        complete:[]
    };
}

function swap(state:StateType, blocks:BlockArray, indexA:number, indexB?:number):StateType{
    return {
        ...state,
        blocks,
        swap: [indexA, indexB],
        compare: []
    };
}

function compare(state:StateType, indexA:number, indexB:number):StateType{
    return {
        ...state,
        compare: [indexA, indexB],
        swap: []
    };
}

function complete(state:StateType, index:number):StateType{
    return {
        ...state,
        compare: [],
        swap: [],
        complete: [...state.complete, index]
    };
}


function reducer(state:StateType, action:Action):StateType{
    switch(action.type){
        case SORT_ACTION.RESET:
            return init(action.payload);
        case SORT_ACTION.COMPARE:
            return compare(state, action.payload.indexA, action.payload.indexB);
        case SORT_ACTION.SWAP:
            return swap(state, action.payload.blocks ,action.payload.indexA, action.payload.indexB);
        case SORT_ACTION.INSERT:
            return swap(state, action.payload.blocks ,action.payload.indexFrom);
        case SORT_ACTION.COMPLETE:
            return complete(state, action.payload);
    }
}

export const useSortReducer = (initialAmount?:number):[ReducerState<Reducer<StateType, Action>>, Dispatch<Action>] => {
    return useReducer(reducer, init(initialAmount));
}