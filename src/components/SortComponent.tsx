import React, { CSSProperties, useEffect, useRef, useState } from "react";

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 5
const WIDTH = 20;

const getRandomHeight = ():number =>{
    return Math.floor(Math.random() * MAX_HEIGHT) + MIN_HEIGHT;
}

const STATE_CLASS_NAME = ["unsorted", "target", "currentTarget","sorted"] as const;

type stateType = typeof STATE_CLASS_NAME[number]

type BlockType = {
    state: stateType,
    height: number,
    position: number,
    transition?: string
}

export const SortDiv:React.FC = () => {
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(10);
    const [blocks, setBlocks] = useState<BlockType[]>([]);
    
    useEffect(()=>{
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
    },[amount]);

    const swap = (indexA:number, indexB:number):Promise<void> =>{
        setBlocks(oldBlocks => {
            const newBlocks = [...oldBlocks];
            newBlocks[indexA] = oldBlocks[indexB];
            newBlocks[indexB] = oldBlocks[indexA];
            return newBlocks;
        });
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    const insert = (indexFrom:number, indexTo:number):Promise<void> => {
        return new Promise(async (resolve) => {
            setBlocks(old => {
                const newBlocks = [...old];
                for(let i = indexFrom; i > indexTo; i--){
                    const positionA = newBlocks[indexFrom].position;
                    const positionB = newBlocks[i - 1].position;
                    newBlocks[indexFrom].position = positionB;
                    newBlocks[i - 1].position = positionA;
                }
                return newBlocks;
            })
            setTimeout(resolve, 100);
        })
    };

    const bubble = async () =>{
        setIsSorting(true);
        for(let i = 0; i < blocks.length - 1; i++){
            for(let j = 0; j < blocks.length - i - 1; j++){
                if(blocks[j].height > blocks[j + 1].height){
                    await swap(j, j + 1);
                }
            }
        }
    }

    const quick = () =>{
        setIsSorting(true);
    }

    const merge = () =>{
        setIsSorting(true);

    }

    const insertion = () =>{
        setIsSorting(true);

    }

    const selection = () =>{
        setIsSorting(true);

    }

    const sortAlogrithems = {
        quick,
        merge,
        insertion,
        bubble,
        selection
    }

    const onClick = () => {
        console.log("clicked");
        bubble();
        // insert(20, 10);
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