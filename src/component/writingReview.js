import React, { useState } from "react"
import fireBase, { dbService } from "../myBase"
import namer from "korean-name-generator"
import Select from 'react-select'
const ReviewWriting=({userObj})=>{
    const options = [
        { value: '0', label: '진짜 맛없음' },
        { value: '1', label: '맛없음' },
        { value: '2', label: '먹을만함' },
        { value: '3', label: '맛있음' },
        { value: '4', label: '존맛탱' }
      ]
    const [foodName,setFoodName]=useState("");
    const [restName,setRestName]=useState("");
    const [think,setThink]=useState("");
    const [staring,setStar]=useState("먹을만함");
    const [selectedOption, setSelectedOption] = useState("3");
    const onSubmit=async(event)=>{
        var name=namer.generate(true);
        console.log(staring)
        event.preventDefault();
        const newFood={
            foodName:foodName,
            restName:restName,
            think:think,
            createdAt:Date.now(),
            creator:userObj.uid,
            createdName:name,
            star:staring
        }
        const sibal=await dbService.collection("numazufood").add(newFood);
        const byunsin=sibal['u_']['path']['segments'][1];
        window.location.replace(`/#/food/${byunsin}`);
    }
    const onChange=(event)=>{
        const{target}=event;
        if(target.name==="rest"){
            setRestName(target.value);
        }else if(target.name==="feel"){
            setThink(target.value);
        }
        else if(target.name==="food"){
            setFoodName(target.value);
        }
    }
    const onStar=(event)=>{
        setStar(event.label);
    }
    return(
        <>
            <div>
                <form onSubmit={onSubmit} >
                    <input type="text" placeholder="레스트랑 이름" required name="rest" onChange={onChange}/>   
                    <input type="text" placeholder="먹은 음식" required name="food" onChange={onChange}/>
                    <p>
                        <textarea placeholder="후기" required name="feel"onChange={onChange}/>
                    </p>
                    <Select name="star" default={selectedOption} required options={options} onChange={onStar}></Select>
                    <input type="submit" value="upload"/>
                </form>
            </div>
        </>
    )
}
export default ReviewWriting;