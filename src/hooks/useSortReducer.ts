import { Dispatch, Reducer, ReducerState, useReducer, } from "react";
import { Arr } from "..";

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
    COMPARE:"compare",
    SELECT:"select"
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
        blocks:Arr<number>,
        indexA: number,
        indexB?: number
    }
}

type InsertAction = {
    type: "insert",
    payload: {
        blocks:Arr<number>,
        indexFrom: number,
        indexTo: number,
    }
}

type CompleteAction = {
    type: "complete",
    payload: number
}

type SelectAction = {
    type: "select",
    payload: {
        index: number,
        indexA:number,
        indexB:number,
    }
}

type Action = ResetAction | CompareAction | SwapAction | InsertAction | CompleteAction | SelectAction;

type StateType = {
    blocks: Arr<number>,
    compare: [number, number]|[],
    swap: [number, number|undefined]|[number]|[],
    complete: number[]
}

const MAX_HEIGHT = 500;
const MIN_HEIGHT = 5;

const getRandomHeight = ():number =>{
    return Math.floor(Math.random() * MAX_HEIGHT) + MIN_HEIGHT;
}

function init(amount:number = 100):StateType{
    const blocks:Arr<number> = new Arr<number>(amount);
    for(let i = 0; i < blocks.length; i++){
        blocks[i] = getRandomHeight();
    }

    return {
        blocks,
        compare: [],
        swap: [],
        complete:[]
    };
}

function swap(state:StateType, blocks:Arr<number>, indexA:number, indexB?:number):StateType{
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

function select(state:StateType, index:number, indexA:number, indexB:number):StateType{
    return {
        ...state,
        compare: [indexA, indexB],
        swap: [index]
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
        case SORT_ACTION.SELECT:
            const {index, indexA, indexB} = action.payload;
            return select(state, index, indexA, indexB);
        case SORT_ACTION.COMPLETE:
            return complete(state, action.payload);
    }
}

export const useSortReducer = (initialAmount?:number):[ReducerState<Reducer<StateType, Action>>, Dispatch<Action>] => {
    return useReducer(reducer, init(initialAmount));
}