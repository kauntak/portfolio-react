import { BlockArray } from "..";
import { SequenceType } from "../components/SortComponent";

export const insertion = (oldBlocks:BlockArray):SequenceType[] => {
    const sequence:SequenceType[] = [];
    const blocks = [...oldBlocks];
    for(let i = 0; i < blocks.length; i++){
        for(let j = i + 1; j < blocks.length; j++){
            const compareSequence:SequenceType = {
                type:"compare",
                indexA: j,
                indexB: i
            }
            sequence.push(compareSequence);
            if(blocks.isFirstTaller(i, j)){
                const swapSequence:SequenceType = {
                    type:"swap",
                    indexA: i,
                    indexB: j,
                    blocks: blocks.swap(i, j)
                }
                sequence.push(swapSequence);
            }
        }
        const completeSequence:SequenceType = {
            type:"complete",
            completedIndex: i
        }
        sequence.push(completeSequence);
    }
    return sequence;
}