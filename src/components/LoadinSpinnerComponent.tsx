import React from "react";
import styles from "./../css/loadingSpinner.module.css"

export const LoadingSpinner:React.FC = () => {

    return (
        <div  className="loadContainer">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}