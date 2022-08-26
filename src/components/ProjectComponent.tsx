import { Dispatch, SetStateAction } from "react"
import { SelectorType } from "../pages/Portfolio"


type Props = {
    current: SelectorType,
    setCurrent: Dispatch<SetStateAction<SelectorType>>
}

type ProjectType = {
    imagePath:string,
    projectName:string
}

const url = ``

const projects:ProjectType[] = [

]


export const ProjectList:React.FC<Props> = ({current, setCurrent}) => {

    return (
        <div
            style={{
                display:"grid",
                width: "90%"
            }}
        >
        </div>
    )
}