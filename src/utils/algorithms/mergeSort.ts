import { Arr } from "../classes/Arr";
import { SequenceType } from "../../components/SortComponent";

export const merge = (oldBlocks:Arr<number>):SequenceType[] => {
    const blocks = oldBlocks.copy();
    const sequence:SequenceType[] = [];
    
    const sort = (leftIndex:number, midIndex:number, rightIndex:number, isFirst: boolean = false):void => {
        console.log("sort left:", leftIndex, "mid:", midIndex, "right:", rightIndex);
        
        while((leftIndex < midIndex) && (midIndex <= rightIndex)){
            const compareSequence:SequenceType = {
                type:"compare",
                indexA:leftIndex,
                indexB:midIndex
            }
            sequence.push(compareSequence);
            if(blocks.isFirstLarger(leftIndex, midIndex)){
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

    const split = (leftIndex?:number, rightIndex?:number, depth?:number):void => {
        const isFirst:boolean = (rightIndex === undefined) && (leftIndex === undefined);
        if(depth === undefined) depth = 0;
        if(leftIndex === undefined) leftIndex = 0;
        if(rightIndex === undefined) rightIndex = blocks.length - 1;
        const difference:number  = rightIndex - leftIndex;
        console.log("split depth: ", depth);
        if(difference <= 1)
            return sort(leftIndex, leftIndex + 1, rightIndex);
        const midIndex = Math.round(difference / 2) + leftIndex; //Math.floor((leftIndex + rightIndex) / 2);
        console.log("left:", leftIndex, "midIndex:", midIndex, "depth: ", depth);
        split(leftIndex, midIndex, depth + 1);
        console.log("mid+1:", midIndex+1, "right: ", rightIndex, "depth: ", depth);
        split(midIndex + 1, rightIndex, depth + 1);

        return sort(leftIndex, midIndex, rightIndex, isFirst);
    }

    split();
    return sequence;
}

