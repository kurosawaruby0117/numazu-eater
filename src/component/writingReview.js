import React, { useState } from "react"
import fireBase, { dbService, storageService } from "../myBase"
import namer from "korean-name-generator"
import Select from 'react-select'

import {v4 as uuidv4} from "uuid";
import { amount_options, service_option, taste_options } from "./ranking"
import { render } from "@testing-library/react"
const ReviewWriting=({userObj})=>{
   
    const [foodName,setFoodName]=useState("");
    const [restName,setRestName]=useState("");
    const [think,setThink]=useState("");
    const [staring,setStar]=useState("먹을만함");
    const [tasteRank,setTasteRank]=useState(3);
    const [amountSet,setAmount]=useState("적당함")
    const [amountRank,setAmountRank]=useState(3)
    const [service,setService]=useState("보통");
    const [serviceRank,setServiceRank]=useState(3);
    const [selectedOption, setSelectedOption] = useState("3");
    const [photo,setAttachment]=useState("");
    
    const onSubmit=async(event)=>{
        event.preventDefault();
        let photoUrl=""
        if(photo!=""){
            const fileRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            console.log(fileRef);
            const responce=await fileRef.putString(photo,"data_url");
            photoUrl=await responce.ref.getDownloadURL();
        }
        var name=namer.generate(true);
        console.log(staring)
       
        const newFood={
            foodName:foodName,
            restName:restName,
            think:think,
            createdAt:Date.now(),
            creator:userObj.uid,
            createdName:name,
            star:staring,
            amount:amountSet,
            tasteRank:tasteRank,
            amountRank:amountRank,
            service:service,
            serviceRank:serviceRank,
            photoUrl:photoUrl
        }
        const sibal=await dbService.collection("numazufood").add(newFood);
        const byunsin=sibal['u_']['path']['segments'][1];
        console.log(byunsin);
        setAttachment("");
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
    const onStar_taste=(event)=>{
        
        setStar(event.label);
        setTasteRank(event.value);
    }
    const onStar_amount=(event)=>{
        setAmount(event.label);
        setAmountRank(event.value);
    }
    const onStar_Service=(event)=>{
        setService(event.label);
        setServiceRank(event.value);
    }
    const onFileChange=(event)=>{
        const{
            target:{files}
        }=event;
        console.log(event.target.files);
        if((files.length)!==0){
        const theFile=files[0];
        const reader=new FileReader();
        reader.onloadend=(finishedEvent)=>{
            const {currentTarget:{result}}=finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);}else{
            setAttachment("");
        }
    }
    return(
        <>
            <div>
                {
                    photo&&(
                        <div>
                            <img src={photo} width="100px" height="100px"></img>
                        </div>
                    )
                }
                <form onSubmit={onSubmit} >
                    <input type="text" placeholder="레스트랑 이름" required name="rest" onChange={onChange}/>   
                    <input type="text" placeholder="먹은 음식" required name="food" onChange={onChange}/>
                    <input type="file" accept="image/*" onChange={onFileChange} required/>
                    
                    <p>
                        <textarea placeholder="후기" required name="feel"onChange={onChange}/>
                    </p>
                    <Select name="star" placeholder="맛 평가"default={selectedOption} required options={taste_options} onChange={onStar_taste}></Select>
                    <Select name="amount" placeholder="양 평가"default={selectedOption} required options={amount_options} onChange={onStar_amount}></Select>
                    <Select name="service" placeholder="친절도 평가"default={selectedOption} required options={service_option} onChange={onStar_Service }></Select>
                    <input type="submit" value="upload"/>
                </form>
            </div>
        </>
    )
}
export default ReviewWriting;