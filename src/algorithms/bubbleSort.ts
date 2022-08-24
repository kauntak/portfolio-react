import { BlockArray } from "..";
import { SequenceType } from "../components/SortComponent";

export const bubble = (oldblocks:BlockArray):SequenceType[] => {
    console.log(BlockArray);
    const sequence: SequenceType[] = [];
    const blocks = [...oldblocks];
    for(let i = 0; i < blocks.length - 1; i++){
        let j:number;
        for(j = 0; j < blocks.length - i - 1; j++){
            const compareSequence:SequenceType = {
                type:"compare",
                indexA: j,
                indexB: j + 1
            }
            sequence.push(compareSequence);
            if(blocks.isFirstTaller(j, j + 1)){
                const swapSequence:SequenceType = {
                    type:"swap",
                    indexA:j,
                    indexB: j + 1,
                    blocks: blocks.swap(j, j + 1)
                }
                sequence.push(swapSequence);
            }
        }
        const completeSequence:SequenceType = {
            type:"complete",
            completedIndex: j
        }
        sequence.push(completeSequence);
    }
    return sequence;
}