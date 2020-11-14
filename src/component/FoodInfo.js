import React from "react"
import { Link } from "react-router-dom";

const Food=({foodObj})=>{
    return(
        <>
        <Link to={`/food/${foodObj.id}`}>
        <div>
        
            <span>음식명:{foodObj.foodName} </span>
    
        </div>
        </Link>
        </>
    )
}

export default Food;