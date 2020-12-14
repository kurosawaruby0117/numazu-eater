import React, { useEffect, useState } from "react";
import Food from "./FoodInfo";
import { dbService } from "../myBase";
import { Map_show } from "../Map";
import Foodindex from "./foodIndex";
const Home=({userObj})=>{
    const [rice,setRice]=useState([]);
    const [men,setMen]=useState([]);
    const [sakana,setSakana]=useState([]);
    const [niku,setNiku]=useState([]);
    const [kaori,setKaori]=useState([]);
    const [cookie,setCookies]=useState([]);
    useEffect(()=>{
       
    },[])
    return(
        <div>
            <Foodindex foodSort="rice" foodDe="밥"></Foodindex>
            <Foodindex foodSort="men" foodDe="면"></Foodindex>
            <Foodindex foodSort="sakana" foodDe="물고기"></Foodindex>
            <Foodindex foodSort="kaori" foodDe="술/안주"></Foodindex>
            <Foodindex foodSort="cookie" foodDe="간식"></Foodindex>
            <Foodindex foodSort="niku" foodDe="고기"></Foodindex>
        </div>
    )
}

export default Home;
