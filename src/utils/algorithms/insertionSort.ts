import { SequenceType } from "../../types";
import { Arr } from "../classes/Arr";

export const insertion = (oldBlocks:Arr<number>):SequenceType[] => {
    const sequence:SequenceType[] = [];
    const blocks = oldBlocks.copy();
    for(let i = 0; i < blocks.length; i++){
        const completeSequence:SequenceType = {
            type:"complete",
            index: i
        }
        sequence.push(completeSequence);
        for(let j = 0; j < i; j++){
            const compareSequence:SequenceType = {
                type:"compare",
                indexA: j,
                indexB: i
            }
            sequence.push(compareSequence);
            if(blocks.isFirstLarger(j, i)){
                const insertSequence:SequenceType = {
                    type:"insert",
                    indexFrom: i,
                    indexTo: j,
                    blocks: blocks.insert(i, j)
                }
                sequence.push(insertSequence);
                const completeSequence:SequenceType = {
                    type:"complete",
                    index: i
                }
                sequence.push(completeSequence);
                break;
            }
        }
    }
    return sequence;
}