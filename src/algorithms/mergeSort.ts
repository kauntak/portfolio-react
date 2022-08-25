import { BlockArray } from "..";
import { SequenceType } from "../components/SortComponent";

export const merge = (oldBlocks:BlockArray):SequenceType[] => {
    const blocks = oldBlocks.copy();
    const sequence:SequenceType[] = [];
    const sort = async (leftIndex:number, midIndex:number, rightIndex:number, isFirst: boolean = false):Promise<void> => {
        while((leftIndex < midIndex) && (midIndex <= rightIndex)){
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
                midIndex++;
            } else {}
            if(isFirst){
                const completedSequence:SequenceType = {
                    type:"complete",
                    index: leftIndex
                }
                sequence.push(completedSequence);
            }
            leftIndex++;
        }
        if(isFirst) {
            while(leftIndex <= rightIndex){
                const completedSequence:SequenceType = {
                    type:"complete",
                    index: leftIndex
                }
                sequence.push(completedSequence);
                leftIndex++;
            }
        }
    }

    const split = async (leftIndex?:number, rightIndex?:number):Promise<void> => {
        const isFirst:boolean = (rightIndex === undefined) && (leftIndex === undefined);
        if(leftIndex === undefined) leftIndex = 0;
        if(rightIndex === undefined) rightIndex = blocks.length - 1;
        const difference:number  = rightIndex - leftIndex;
        console.log("split run with left:", leftIndex, "right: ", rightIndex);
        if(difference <= 1)
            return await sort(leftIndex, leftIndex + 1, rightIndex);
        const midIndex = Math.round(difference / 2) + leftIndex; //Math.floor((leftIndex + rightIndex) / 2);

        await split(leftIndex, midIndex);
        await split(midIndex + 1, rightIndex);

        return await sort(leftIndex, midIndex, rightIndex, isFirst);
    }

    split();
    return sequence;
}

