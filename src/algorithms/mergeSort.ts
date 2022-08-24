import { BlockArray } from "..";
import { SequenceType } from "../components/SortComponent";

const sequence:SequenceType[] = [];
export const merge = (oldBlocks:BlockArray):SequenceType[] => {
    const blocks = [...oldBlocks];

    const sort = (leftIndex:number, midIndex:number, rightIndex:number, isFirst?: boolean):void => {
        while(leftIndex < midIndex && midIndex <= rightIndex){
            const compareSequence:SequenceType = {
                type:"compare",
                indexA:leftIndex,
                indexB:midIndex
            }
            sequence.push(compareSequence);
            if(blocks.isFirstTaller(leftIndex, midIndex)){
                const insertSequence:SequenceType = {
                    type:"insert",
                    indexFrom:midIndex,
                    indexTo:leftIndex,
                    blocks: blocks.insert(midIndex, leftIndex)
                }
                sequence.push(insertSequence);
            }
            if(isFirst){
                const completedSequence:SequenceType = {
                    type:"complete",
                    completedIndex: leftIndex
                }
                sequence.push(completedSequence);
            }
            leftIndex++;
        }
        if(isFirst) {
            while(leftIndex <= midIndex){
                const completedSequence:SequenceType = {
                    type:"complete",
                    completedIndex: leftIndex
                }
                sequence.push(completedSequence);
                leftIndex++;
            }
        }
    }

    const mergeSplitter = (leftIndex?:number, rightIndex?:number):void => {
        if(leftIndex === undefined) leftIndex = 0;
        if(rightIndex === undefined) rightIndex = blocks.length - 1;
        const difference:number  = rightIndex - leftIndex;
        if(difference <= 1)
            return sort(leftIndex, leftIndex + 1, rightIndex);
        const midIndex = Math.floor((leftIndex + rightIndex) / 2);

        mergeSplitter(leftIndex, midIndex);
        mergeSplitter(midIndex + 1, rightIndex);

        const isFirst:boolean = rightIndex === blocks.length && leftIndex === 0;
        sort(leftIndex, midIndex, rightIndex, isFirst);
    }
    return sequence;
}

