import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { SORT_ACTION, useSortReducer } from "../hooks/useSortReducer";
import { useStateAwait } from "../hooks/useStateAwait";

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 5
const WIDTH = 20;

const getRandomHeight = ():number =>{
    return Math.floor(Math.random() * MAX_HEIGHT) + MIN_HEIGHT;
}

const STATE_CLASS_NAME = ["unsorted", "comparing", "swapping","sorted"] as const;

type stateType = typeof STATE_CLASS_NAME[number]

export type BlockType = {
    state: stateType,
    height: number,
    position: number,
    transition?: string
}

type CompletedSequenceType = {
    completedIndex:number
}

type CompareSequenceType = {
    indexA:number,
    indexB:number
}

type SwapSequenceType = {
    indexA:number,
    indexB:number,
    blocks: BlockType[]
}

type InsertSequenceType = {
    indexFrom: number,
    blocks: BlockType[]
}


type SequenceType = CompletedSequenceType | CompareSequenceType | SwapSequenceType;

export const SortDiv:React.FC = () => {
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isSorted, setIsSorted] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(5);
    const [amount, setAmount] = useState<number>(5);
    const [blocks, setBlocks] = useState<BlockType[]>([]);
    const [compare, setCompare] = useState<[number, number]>([0,0]);
    const [swap, setSwap] = useState<[number, number]|[]>([]);
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

    const alogrithems = {
        bubble,
        insertion,
        merge,
        selection
        quick
    }

    return (
        <>
        </>
    )
}

// export const SortDiv:React.FC = () => {
//     const [isSorting, setIsSorting] = useState<boolean>(false);
//     const [amount, setAmount] = useState<number>(5);
//     const [blocks, dispatch] = useSortReducer(amount);
    // const [blocks, setBlocks] = useStateAwait<BlockType[]>([]);
    
    // useEffect(()=>{
    //     setBlocks(() => {
    //         const newBlocks:BlockType[] = new Array(amount);
    //         for(let i = 0; i < newBlocks.length; i++){
    //             newBlocks[i] = {
    //                 state: "unsorted",
    //                 height: getRandomHeight(),
    //                 position: i * (WIDTH + WIDTH/10*2)
    //             };
    //         }
    //         return newBlocks;
    //     });
    // },[amount]);
    
    // useEffect(()=>{
    //     console.log("render!");

    // }, [])

    // const swap = (indexA:number, indexB:number):Promise<void> =>{
    //     setBlocks(oldBlocks => {
    //         const newBlocks = [...oldBlocks];
    //         const heightA = oldBlocks[indexA].height;
    //         const heightB = oldBlocks[indexB].height;
    //         newBlocks[indexA] = {
    //             ...oldBlocks[indexA],
    //             height: heightB
    //         }
    //         newBlocks[indexB] = {
    //             ...oldBlocks[indexB],
    //             height:heightA
    //         }
    //         return newBlocks;
    //     });
    //     return new Promise(resolve => {
    //         setTimeout(resolve, 100);
    //     });
    // }

    // const insert = (indexFrom:number, indexTo:number):Promise<void> => {
    //     return new Promise(async (resolve) => {
    //         setBlocks(old => {
    //             const newBlocks = [...old];
    //             for(let i = indexFrom; i > indexTo; i--){
    //                 const positionA = newBlocks[indexFrom].position;
    //                 const positionB = newBlocks[i - 1].position;
    //                 newBlocks[indexFrom].position = positionB;
    //                 newBlocks[i - 1].position = positionA;
    //             }
    //             return newBlocks;
    //         })
    //         setTimeout(resolve, 100);
    //     })
    // };

    // const setBlockColor = async (toChange:{index:number, state:stateType}[]):Promise<void> => {
    //     await setBlocks(oldBlocks => {
    //         const newBlocks = [...oldBlocks];
    //         for(let i = 0; i < toChange.length; i++){
    //             newBlocks[toChange[i].index] = {
    //                 ...oldBlocks[toChange[i].index],
    //                 state: toChange[i].state
    //             }
    //         };
    //         return newBlocks;
    //     });
    // }

    // const bubble = async () =>{
    //     setIsSorting(true);
    //     for(let i = 0; i < blocks.length - 1; i++){
    //         await setBlockColor([{index: i, state:"target"}]);
    //         console.log(i, ...blocks);
    //         for(let j = 0; j < blocks.length - i - 1; j++){
    //             console.log(...blocks);
    //             console.log("compare", j, blocks[j].height, j + 1, blocks[j + 1].height, blocks[j].height > blocks[j + 1].height);
    //             await setBlockColor([
    //                 {
    //                     index:j + 1,
    //                     state:"target"
    //                 }
    //             ])
    //             if(blocks[j].height > blocks[j + 1].height){
    //                 console.log("swapped!");
    //                 await swap(j, j + 1);
    //             }
    //             await setBlockColor([
    //                 {index: j, state:"unsorted"}
    //             ])
    //             console.log(...blocks, "--------------------------------------");
    //             await new Promise(resolve => setTimeout(resolve, 8000));
    //         }
    //         await setBlockColor([
    //             {index: blocks.length - i - 1, state:"sorted"}
    //         ])
    //     }
    // }

    // const quick = () =>{
    //     setIsSorting(true);
    // }

    // const merge = () =>{
    //     setIsSorting(true);

    // }

    // const insertion = () =>{
    //     setIsSorting(true);

    // }

    // const selection = () =>{
    //     setIsSorting(true);

    // }

    // const sortAlogrithems = {
    //     quick,
    //     merge,
    //     insertion,
    //     bubble,
    //     selection
    // }

    // const onClick = async () => {
    //     console.log("clicked");
    //     console.log(...blocks)
    //     await new Promise(resolve => setTimeout(resolve, 1000))
    //     const a = await dispatch({type:SORT_ACTION.SWAP, payload:{indexA:0, indexB: 1}});
    //     await new Promise(resolve => setTimeout(resolve, 1000))
    //     console.log(...a);
        
    //     console.log(...blocks)

        // bubble();
        // insert(20, 10);
        // for(let i = 0; i < blocks.length - 1; i++){
        //     console.log(i, blocks[i].height, blocks[i + 1].height, blocks[i].height > blocks[i + 1].height, ...blocks);
            
        //     if(blocks[i].height > blocks[i + 1].height)
        //         // await swap(0,1);
        //         dispatch({type:SORT_ACTION.SWAP, payload:{indexA:i, indexB: i + 1}});
        //     console.log(i, blocks[i].height, blocks[i + 1].height, blocks[i].height > blocks[i + 1].height, ...blocks);
        //     console.log("----------------------------------------");
            
        //     await new Promise(resolve => setTimeout(resolve,1000));

        // }

//     }
//     return (
//         <>
//             <div style={{display:"flex", flexDirection:"column"}}>
//                 <div style={{display:"flex", flexDirection:"column"}}>
//                     <button onClick={onClick}>Click!</button>
//                     <div style={{display:"flex", flexDirection:"row"}}>
//                         <button>Quick</button>
//                         <button>Quick</button>
//                         <button>Quick</button>
//                         <button>Quick</button>
//                         <button>Quick</button>
//                     </div>
//                 </div>
//                 <div>
//                     {
//                         blocks.map((block, index) => {
//                             return (
//                                 <div
//                                     key={index + block.height}
//                                     style={{
//                                         height:`${block.height * 1.5}px`,
//                                         transform:`translateX(${block.position}px)`,
//                                         transition: block.transition?block.transition:undefined,
//                                         width: WIDTH
//                                     }}
//                                     className={`block ${block.state}`}
//                                 ></div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//         </>
//     );
// }