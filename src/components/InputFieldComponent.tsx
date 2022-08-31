import { CSSProperties, Dispatch } from "react";
import { CONTACT_TYPE, placeHolderList } from "../pages/Contact";
import { ContactActionType, ContactStateType, FieldType } from "../types";
import { ErrorLabel } from "./ErrorLabelComponent";
import { LocationSearchInput } from "./GooglePlaceAutoCompleteComponent";

type InputFieldProps = {
    field:FieldType,
    state:ContactStateType[FieldType],
    dispatch: Dispatch<ContactActionType>,
    inputStyle: CSSProperties,
    rowStyle:CSSProperties,
    disabled:boolean
}

export const InputField:React.FC<InputFieldProps> = ({field, state, dispatch, rowStyle, inputStyle, disabled}) => {
    const onChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        const field = e.currentTarget.dataset.field as FieldType;
        const value = e.currentTarget.value;
        if(field === "preferred") {
            dispatch({type:"preferred", payload:value})
        } else {
            dispatch({type:"input", payload:{field, value}})
        }
    }

    const onBlur = (e:React.ChangeEvent<HTMLInputElement>) => {
        const field = e.currentTarget.dataset.field as FieldType;
        dispatch({type:"blur", payload:field});
    }

    const onPreferredChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        dispatch({type:"preferred", payload:value})
    }

    return (
        <div
            style={{
                transition: "max-height 0.5s ease-in-out",
                maxHeight: field==="message"?undefined:state.required?"calc(1.5vh + 19px + 20px)":"0",
                overflowY: field==="message"?undefined:"hidden"
            }}
        >
            <div style={rowStyle}>
                <label htmlFor={field}>{placeHolderList[field]}</label>
                {
                    state.error
                        ?<ErrorLabel errorType={state.error} />
                        :""
                }
            </div>
            {
                field==="address"
                    ?<LocationSearchInput
                        dispatch={dispatch}
                        input={state.value} 
                        name={field}
                        style={{
                            ...inputStyle,
                            border: state.error?"2px solid red":undefined
                        }}
                        disabled={disabled}
                    />
                    :field==="message"
                        ?<textarea
                            name={field}
                            value={state.value}
                            onChange={onChange}
                            data-field={field}
                            placeholder={placeHolderList[field]}
                            disabled={disabled}
                            style={{
                                ...inputStyle,
                                width: "40vw",
                                minWidth: inputStyle.width,
                                maxWidth: "80vw",
                                minHeight: "10vh",
                                maxHeight: "30vh",
                                border: state.error?"2px solid red":undefined
                            }}
                        />
                        :field==="preferred"
                            ?<select
                                id="selectElement"
                                name={"preferred"}
                                value={state.value}
                                onChange={onPreferredChange}
                                title={placeHolderList["preferred"]}
                                disabled={disabled}
                                style={{
                                    ...inputStyle,
                                    width: "15vw",
                                    minWidth: "max(10vw, 100px)",
                                }}
                            >
                                {
                                    CONTACT_TYPE.map((method, selectIndex) => {
                                        return (
                                            <option value={selectIndex} key={selectIndex}>
                                                {method}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            :<input
                                name={field}
                                type={field==="phone" || field==="fax"?"tel":"text"}
                                value={state.value}
                                onChange={onChange}
                                data-field={field}
                                placeholder={placeHolderList[field]}
                                onBlur={onBlur}
                                style={{
                                    ...inputStyle,
                                    border: state.error?"2px solid red":undefined
                                }}
                                disabled={disabled}
                            />
            }
        </div>
    );
}