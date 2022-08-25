import { Arr } from "..";
import { SequenceType } from "../components/SortComponent";

export const insertion = (oldBlocks:Arr<number>):SequenceType[] => {
    const sequence:SequenceType[] = [];
    const blocks = oldBlocks.copy();
    for(let i = 0; i < blocks.length; i++){
        for(let j = i + 1; j < blocks.length; j++){
            const compareSequence:SequenceType = {
                type:"compare",
                indexA: j,
                indexB: i
            }
            sequence.push(compareSequence);
            if(blocks.isFirstLarger(i, j)){
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
            index: i
        }
        sequence.push(completeSequence);
    }
    return sequence;
}