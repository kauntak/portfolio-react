import React, { useEffect, useReducer, useRef, useState } from "react";
import { BlockArray } from "..";
import { bubble } from "../algorithms/bubbleSort";
import { insertion } from "../algorithms/insertionSort";
import { merge } from "../algorithms/mergeSort";
import { quick } from "../algorithms/quickSort";
import { selection } from "../algorithms/selectionSort";
import { useSortReducer } from "../hooks/useSortReducer";
import { BlockType } from "../types";

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 5
const WIDTH = 40;

const getRandomHeight = ():number =>{
    return Math.floor(Math.random() * MAX_HEIGHT) + MIN_HEIGHT;
}

const STATE_CLASS_NAME = ["unsorted", "comparing", "swapping","sorted"] as const;

type stateType = typeof STATE_CLASS_NAME[number]

const SORT_ALGORITHMS = ["bubble", "insertion", "selection", "quick", "merge"] as const;

type sortType = typeof SORT_ALGORITHMS[number];

type CompletedSequenceType = {
    type:"complete"
    index:number
}

type CompareSequenceType = {
    type: "compare"
    indexA:number,
    indexB:number
}

type SwapSequenceType = {
    type:"swap",
    indexA:number,
    indexB:number,
    blocks: BlockArray
}

type InsertSequenceType = {
    type:"insert"
    indexFrom: number,
    indexTo:number,
    blocks: BlockArray
}


export type SequenceType = CompletedSequenceType | CompareSequenceType | SwapSequenceType | InsertSequenceType;

export const SortDiv:React.FC = () => {
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isSorted, setIsSorted] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(500);
    const speedRef = useRef<number>(500);
    const [sequence, setSequence] = useState<SequenceType[]>([]);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const isPausedRef = useRef<boolean>(false);
    const [sequenceIndex, setSequenceIndex] = useState<number>(0);
    const [sortType, setSortType] = useState<sortType>("merge");
    const [amount, setAmount] = useState<number>(20);
    const [state, dispatch] = useSortReducer()
    
    const generateBlocks = () =>{
        setSequence([]);
        setSequenceIndex(0);
        setIsSorting(false);
        setIsSorted(false);
        dispatch({type:"reset", payload: amount});
    }

    const playSequence = (index:number = 0) => { return;
        const sequenceTimer = setTimeout(()=> {
            clearTimeout(sequenceTimer)
            if(isPausedRef.current) {
                setSequenceIndex(index);
                return;
            }
            const s = sequence[index];
            switch(s.type){
                case "compare":{
                    const{type, indexA, indexB} = s;
                    dispatch({type, payload:{indexA, indexB}});
                    break;
                }case "complete":{
                    const{type, index: payload} = s;
                    dispatch({type, payload});
                    break;
                }case "insert":{
                    const{type, indexFrom, indexTo, blocks} = s;
                    dispatch({type, payload:{indexFrom, indexTo, blocks}})
                    break;
                }case "swap":{
                    const{type, indexA, indexB, blocks} = s;
                    dispatch({type, payload:{indexA, indexB, blocks}});
                    break;
                }
            }
            if(++index < sequence.length){
                playSequence(index);
            } else {
                setIsSorted(true);
                setIsSorting(false);
                setSequence([]);
            }
        }, speedRef.current);
    }

    useEffect(()=>{
        generateBlocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[amount]);

    useEffect(()=>{
        if(sequence.length > 0) playSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sequence]);

    useEffect(()=>{
        isPausedRef.current = isPaused;
        if(!isPaused && sequence.length > 0){
            playSequence(sequenceIndex);
        }
    }, [isPaused]);

    const algorithms:{
        [key in sortType]: (blocks: BlockArray) => SequenceType[];
    } = {
        bubble,
        insertion,
        merge,
        selection,
        quick
    }

    const onSortClick = () => {
        console.log("clicked");
        console.log(...state.blocks);
        if(isSorted) {
            generateBlocks();
        }
        setIsSorted(false);
        setIsSorting(true);
        setIsPaused(false);
        setSequence(() => algorithms[sortType](state.blocks));
    }

    const onAlgorithmChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const index = e.currentTarget.selectedIndex;
        setSortType(SORT_ALGORITHMS[index]);
    }

    const onPausePlayClick = () => {
        setIsPaused(wasPaused => !wasPaused);
    }

    const onSpeedChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value);
        speedRef.current = value;
        setSpeed(value);
    }
    return (
        <>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <button onClick={onSortClick}>Sort!</button>
                    {
                        isSorting
                        ?<button onClick={onPausePlayClick}>Pause/Play</button>
                        :""
                    }
                    <select value={sortType} onChange={onAlgorithmChange}>
                        {
                            SORT_ALGORITHMS.map((algorithm, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={algorithm}
                                    >
                                        {`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`}
                                    </option>
                                )
                            })
                        }
                    </select>
                    Slow
                    <input 
                        type="range"
                        min="100"
                        max="1000"
                        value={speed} 
                        step="100" 
                        style={{direction:"rtl"}}
                        onChange={onSpeedChange}
                    />Fast
                </div>
                <div>
                    {
                        state.blocks.map((block, index) => {
                            let colorState:stateType = "unsorted";
                            if(index === state.compare[0] || index === state.compare[1]){
                                colorState = "comparing";
                            } else if (index === state.swap[0] || index === state.swap[1]) {
                                colorState = "swapping";
                            }
                            if (state.complete.includes(index)){
                                colorState = "sorted";
                            }
                            return (
                                <div
                                    key={`${index}-${block.height}`}
                                    style={{
                                        height:`${block.height * 1.5}px`,
                                        transform:`translateX(${index * (WIDTH + WIDTH/5)}px)`,
                                        width: WIDTH,
                                        color:"black"
                                    }}
                                    className={`block ${colorState}`}
                                >{block.height}</div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}