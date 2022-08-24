import React, { useEffect, useState } from "react";
import { BlockArray } from "..";
import { bubble } from "../algorithms/bubbleSort";
import { insertion } from "../algorithms/insertionSort";
import { merge } from "../algorithms/mergeSort";
import { quick } from "../algorithms/quickSort";
import { selection } from "../algorithms/selectionSort";
import { BlockType } from "../types";

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 5
const WIDTH = 20;

const getRandomHeight = ():number =>{
    return Math.floor(Math.random() * MAX_HEIGHT) + MIN_HEIGHT;
}

const STATE_CLASS_NAME = ["unsorted", "comparing", "swapping","sorted"] as const;

type stateType = typeof STATE_CLASS_NAME[number]

const SORT_ALGORITHMS = ["bubble", "insertion", "selection", "quick", "merge"] as const;

type sortType = typeof SORT_ALGORITHMS[number];

type CompletedSequenceType = {
    type:"complete"
    completedIndex:number
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
    blocks: BlockType[]
}

type InsertSequenceType = {
    type:"insert"
    indexFrom: number,
    indexTo:number,
    blocks: BlockType[]
}


export type SequenceType = CompletedSequenceType | CompareSequenceType | SwapSequenceType | InsertSequenceType;

export const SortDiv:React.FC = () => {
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isSorted, setIsSorted] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(5);
    const [sortType, setSortType] = useState<sortType>("bubble");
    const [amount, setAmount] = useState<number>(5);
    const [blocks, setBlocks] = useState<BlockArray>([]);
    const [compare, setCompare] = useState<[number, number]|[]>([0,0]);
    const [swap, setSwap] = useState<[number, number]|[number]|[]>([]);
    const [sortedIndexes, setSortedIndexes] = useState<number[]>([]);
    
    const generateBlocks = () =>{
        setIsSorting(false);
        setIsSorted(false);
        setSortedIndexes([]);
        setBlocks(() => {
            const newBlocks:BlockType[] = new Array(amount);
            for(let i = 0; i < newBlocks.length; i++){
                newBlocks[i] = {
                    state: "unsorted",
                    height: getRandomHeight(),
                    position: i * (WIDTH + WIDTH/10*2)
                };
            }
            return newBlocks;
        });
    }

    useEffect(()=>{
        generateBlocks();    
    },[amount]);

    const alogrithems:{
        [key in sortType]: (blocks: BlockArray) => SequenceType[];
    } = {
        bubble,
        insertion,
        merge,
        selection,
        quick
    }

    const onClick = async () => {
        console.log("clicked");
        const sequence:SequenceType[] = alogrithems[sortType](blocks);
        const startSequence = (sequence:SequenceType[]) => {
            const loop = (i:number) => {
                setTimeout(()=> {
                    const s = sequence[i];
                    switch(s.type){
                        case "compare":
                            setCompare([s.indexA, s.indexB]);
                            break;
                        case "complete":
                            setCompare([]);
                            setSortedIndexes(prevIndexes => [...prevIndexes, s.completedIndex]);
                            break;
                        case "insert":
                            setBlocks(s.blocks);
                            setSwap([s.indexFrom]);
                            break;
                        case "swap":
                            setBlocks(s.blocks);
                            setSwap([s.indexA, s.indexB]);
                            break;
                        default:
                    }
                    if(++i < sequence.length){
                        loop(i);
                    } else {
                        setIsSorted(true);
                        setIsSorting(false);
                    }
                }, speed)
            }
            loop(0);
        };
        startSequence(sequence);
    }
    return (
        <>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <button onClick={onClick}>Click!</button>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <button>Quick</button>
                        <button>Quick</button>
                        <button>Quick</button>
                        <button>Quick</button>
                        <button>Quick</button>
                    </div>
                </div>
                <div>
                    {
                        blocks.map((block, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        height:`${block.height * 1.5}px`,
                                        transform:`translateX(${block.position}px)`,
                                        transition: block.transition?block.transition:undefined,
                                        width: WIDTH
                                    }}
                                    className={`block ${block.state}`}
                                ></div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}