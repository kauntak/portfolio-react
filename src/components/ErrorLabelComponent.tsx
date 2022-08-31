import { CSSProperties } from "react"
import { ContactErrorType } from "../types"

type ErrorProps = {
    errorType:ContactErrorType
}

export const ErrorLabel:React.FC<ErrorProps> = ({errorType}) => {
    const errorStyle:CSSProperties = {color: "red", fontSize:15, margin: 0, marginLeft: 5}

    return (
        <p
            style={errorStyle}
        >
            {
                errorType === "invalid"
                    ?`invalid`
                    :`required`
            }
        </p>
    )
}