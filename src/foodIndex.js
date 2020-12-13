import React from "react"
import { Link } from "react-router-dom";

const Foodindex=({foodSort})=>{
    return(
        <>
        <Link to={`/${foodSort}`}>
        <div>
            <div>뱝</div>
        </div>
        </Link>
        </>
    )
}

export default Foodindex;