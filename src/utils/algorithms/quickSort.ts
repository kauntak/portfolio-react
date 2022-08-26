import { Arr } from "../classes/Arr";
import { SequenceType } from "../../components/SortComponent";

export const quick = (oldBlocks:Arr<number>):SequenceType[] => {
    const sequence:SequenceType[] = [];
    const blocks = oldBlocks.copy();

    const sort =  (leftIndex:number = 0, rightIndex:number = blocks.length - 1):void => {
        if(leftIndex >= rightIndex) {
            const completeSequence:SequenceType = {
                type: "complete",
                index: leftIndex
            }
            sequence.push(completeSequence);
            return;
        }
        const partitionIndex:number = partition(leftIndex, rightIndex);
        sort(leftIndex, partitionIndex - 1);
        sort(partitionIndex + 1, rightIndex);
    }

    const partition = (leftIndex:number, rightIndex:number):number => {
        const pivotIndex:number = rightIndex;
        let lessThanIndex = leftIndex - 1;
        for( let currentIndex = leftIndex; currentIndex <= rightIndex; currentIndex++) {
            const compareSequence:SequenceType = {
                type:"compare",
                indexA:rightIndex,
                indexB:currentIndex
            }
            sequence.push(compareSequence);
            if(blocks[pivotIndex] >= blocks[currentIndex]){
                lessThanIndex++;
                if(currentIndex === lessThanIndex) continue;
                const insertSequence:SequenceType = {
                    type: "insert",
                    indexFrom: currentIndex,
                    indexTo: lessThanIndex,
                    blocks: blocks.insert(currentIndex, lessThanIndex)
                }
                sequence.push(insertSequence);
            }
        }
        const completeSequence:SequenceType = {
            type:"complete",
            index: lessThanIndex
        }
        sequence.push(completeSequence);

        return lessThanIndex;
    }

    sort()
    return sequence;
}