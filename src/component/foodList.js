import React, { useEffect, useState } from "react";
import Food from "./FoodInfo";
import { dbService } from "../myBase";
import { Map_show } from "../Map";
const FoodList=()=>{
    console.log("1");
    const add=window.location.hash;
    const addList=add.split("/")[2];
    const [foods,setFoods]=useState([]);
    useEffect(()=>{
        dbService.collection(`${addList}`).onSnapshot((snapShot)=>{
            const FoodArray=snapShot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }));
            setFoods(FoodArray);
        })
    },[])
    return(
        <>
            {foods.map((food)=>(
                <Food key={food.id} foodObj={food} foodRout={addList}/>
            ))}
        </>
    );
}

export default FoodList;