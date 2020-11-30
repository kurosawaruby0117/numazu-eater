import { render } from "@testing-library/react"
import React from "react"
import { act } from "react-dom/test-utils"

export const Loading=({action})=>{
    return(
        <>
        <span>
            Loading... 
        </span>
        </>
    )
}
export const Uploading=()=>{
    return(
        <>
        <span>
            Uploading... Do not refresh
        </span>
        </>
    )
}
