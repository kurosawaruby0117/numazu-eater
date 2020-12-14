import React from "react"
import { Link } from "react-router-dom";

const Food=({foodObj,foodRout})=>{
    return(
        <>
        <Link to={`/${foodRout}/${foodObj.id}`}>
        <div>
        
            <span>음식명:{foodObj.foodName} </span>
    
        </div>
        </Link>
        </>
    )
}

export default Food;