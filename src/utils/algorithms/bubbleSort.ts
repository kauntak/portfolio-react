import { SequenceType } from "../../types";
import { Arr } from "../classes/Arr";

export const bubble = (oldBlocks:Arr<number>):SequenceType[] => {
    const sequence: SequenceType[] = [];
    const blocks = oldBlocks.copy();
    for(let i = 0; i < blocks.length - 1; i++){
        let j:number;
        for(j = 0; j < blocks.length - i - 1; j++){
            const compareSequence:SequenceType = {
                type:"compare",
                indexA: j,
                indexB: j + 1
            }
            sequence.push(compareSequence);
            if(blocks.isFirstLarger(j, j + 1)){
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
            index: j
        }
        sequence.push(completeSequence);
    }
    const completeSequence:SequenceType = {
        type:"complete",
        index: 0
    }
    sequence.push(completeSequence);
    return sequence;
}