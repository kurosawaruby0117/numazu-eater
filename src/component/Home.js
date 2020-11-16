import React, { useEffect, useState } from "react";
import Food from "./FoodInfo";
import { dbService } from "../myBase";
import { Map_show } from "../Map";
const Home=({userObj})=>{
    const [foods,setFoods]=useState([]);
    useEffect(()=>{
        dbService.collection("numazufood").onSnapshot((snapShot)=>{
            const FoodArray=snapShot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }));
            setFoods(FoodArray);
        })
    },[])
    return(
        <div>
            {foods.map((food)=>(
                <Food key={food.id} foodObj={food}/>
            ))}
        </div>
    )
}

export default Home;
