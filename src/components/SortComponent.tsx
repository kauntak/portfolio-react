import React, { useEffect, useReducer, useRef, useState } from "react";
import { MdPause, MdPlayArrow, MdLoop } from "react-icons/md";
import { Arr } from "..";
import { bubble } from "../algorithms/bubbleSort";
import { insertion } from "../algorithms/insertionSort";
import { merge } from "../algorithms/mergeSort";
import { quick } from "../algorithms/quickSort";
import { selection } from "../algorithms/selectionSort";
import { useSortReducer } from "../hooks/useSortReducer";
import { BlockType } from "../types";

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
    blocks: Arr<number>
}

type InsertSequenceType = {
    type:"insert"
    indexFrom: number,
    indexTo:number,
    blocks: Arr<number>
}

type SelectSequenceType = {
    type: "select",
    index: number,
    indexA:number,
    indexB:number
}

export type SequenceType = CompletedSequenceType | CompareSequenceType | SwapSequenceType | InsertSequenceType | SelectSequenceType;

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
    const [amount, setAmount] = useState<number>(5);
    const [width, setWidth] = useState<number>(116)
    const [state, dispatch] = useSortReducer()
    const sequenceTimerRef = useRef<ReturnType<typeof setTimeout>>(setTimeout(()=>{}));
    
    const generateBlocks = () =>{
        setIsPaused(true);
        clearTimeout(sequenceTimerRef.current);
        setSequence([]);
        setSequenceIndex(0);
        setIsSorting(false);
        setIsSorted(false);
        dispatch({type:"reset", payload: amount});
    }

    const playSequence = (index:number = 0) => { //return;
        // setSequenceTimer((timer) => setTimeout(()=> {
        sequenceTimerRef.current = setTimeout(()=> {
            clearTimeout(sequenceTimerRef.current)
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
        }, speedRef.current)//);
    }

    useEffect(()=> {
        return () => clearTimeout(sequenceTimerRef.current)
    }, [])

    useEffect(()=>{
        generateBlocks();
        setWidth(Math.floor(3500/(6 * amount)));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPaused]);

    useEffect(()=>{
        if(isSorted){
            generateBlocks();
        }
    }, [sortType])

    const algorithms:{
        [key in sortType]: (blocks: Arr<number>) => SequenceType[];
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
        setIsPaused(false);
        setIsSorted(false);
        setIsSorting(true);
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

    const onAmountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value);
        setAmount(value);
    }
    return (
        <>
            <div style={{display:"flex", flexDirection:"column", width: 700, alignItems:"center"}}>
                <div style={{display:"flex", flexDirection:"row", margin: "20px"}}>
                    {
                        isSorting
                        ?<button onClick={onPausePlayClick} style={{minWidth:100, margin: 5}}>
                                {isPaused?<MdPlayArrow />:<MdPause />}
                            </button>
                        :<button onClick={onSortClick} style={{minWidth:100, margin: 5}} disabled={isSorted}>
                            {isSorted?"Done!":"Sort!"}
                        </button>
                    }
                    <button onClick={generateBlocks} style={{maxWidth:50, margin: 5}}>
                        <MdLoop />
                    </button>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        Algorithm
                        <select value={sortType} onChange={onAlgorithmChange} style={{margin:5}} disabled={isSorting}>
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
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        Speed
                        <div style={{display:"flex", flexDirection:"row", alignContent:"middle", margin:5}}>
                            Slow
                            <input 
                                type="range"
                                min="5"
                                max="800"
                                value={speed} 
                                step="5" 
                                style={{direction:"rtl"}}
                                onChange={onSpeedChange}
                            />
                            Fast
                        </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", margin: 5}}>
                        # of rows
                        <input
                            type="number"
                            name="amount" 
                            value={amount} 
                            onChange={onAmountChange} 
                            readOnly={isSorting} 
                            disabled={isSorting}
                            min={5}
                            max={100}
                            step={5}
                            style={{maxWidth:50}}
                        />
                    </div>
                </div>
                <div style={{display:"flex", flexDirection:"row", margin: "10px", alignItems:"center", justifyContent:"space-between"}}>
                    {STATE_CLASS_NAME.map(stateName => {
                        return (
                            <div style={{display:"flex", flexDirection:"row", margin: 5, alignContent:"center"}}>
                                <div className={stateName} style={{width: 15, height: 15, marginRight: 5}}/>
                                {`${stateName.charAt(0).toUpperCase() + stateName.slice(1)}`}
                            </div>
                        )
                    })}
                </div>
                <div style={{display:"flex", flexDirection:"row", margin: "10px", alignContent:"center", width: "100%", justifyContent:"space-between", alignItems:"flex-start"}}>
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
                                    key={`${index}-${block}`}
                                    style={{
                                        height:`${block}px`,
                                        width: width
                                    }}
                                    className={`block ${colorState}`}
                                ></div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}