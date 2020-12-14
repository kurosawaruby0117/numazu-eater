import React from "react"
import { Link } from "react-router-dom";

const Foodindex=({foodSort,foodDe})=>{
    return(
        <>
        <Link to={`/sort/${foodSort}/`}>
        <div>
            <div>{foodDe}</div>
        </div>
        </Link>
        </>
    )
}

export default Foodindex;