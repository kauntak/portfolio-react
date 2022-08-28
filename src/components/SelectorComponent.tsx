import { CSSProperties, Dispatch, SetStateAction } from "react"
import { AboutOptionTypes, SelectorType } from "../types";
import styles from "./../css/selector.module.css";

type Props = {
    list: SelectorType[]|AboutOptionTypes[],
    current: SelectorType|AboutOptionTypes,
    setCurrent: Dispatch<SetStateAction<SelectorType>>|Dispatch<SetStateAction<AboutOptionTypes>>|Dispatch<SetStateAction<any>>,
    style:CSSProperties
}

export const Selector:React.FC<Props> = ({list, current, setCurrent, style}) => {

    return (
        <section
            style={{
                ...style,
                maxWidth: 900,
                display:"flex",
                flexDirection:"row"
            }}
        >
            <div className={styles["startPiece"]}/>
            {list.map(item => {
                return (
                    <div 
                        key={item}
                        className={`${styles["label"]} ${current===item?styles["active"]:styles["inactive"]}`}
                        onClick={()=>{setCurrent(item)}}
                    >
                        {item}
                    </div>
                )
            })}
            <div className={styles["endPiece"]}/>
        </section>
    )
}