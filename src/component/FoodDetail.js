import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbService, storageService } from "../myBase";
import translate from 'translate-google-api';

import {v4 as uuidv4} from "uuid";
import Select from 'react-select'
import { amount_options, onStar_Service, service_option, taste_options } from "./ranking";
const FoodDetail=({userObj})=>{
    const id=useParams();
    const [value,setValue]=useState('');
    const [editing,setEditin]=useState(false);
    const [newFoodNweet,setNewFoodNweet]=useState("");
    const [newRestNweet,setNewRestNweet]=useState("");
    const [newThinkNweet,setNewThinkNweet]=useState("");
    const [loading,setLoading]=useState(false);
    const [staring,setStar]=useState("");
    const [starRank,setStarRank]=useState();
    const [amount_set,setAmount]=useState("");
    const [amountRank_t,setAmountRank]=useState();
    const [setViceSet,setService]=useState("");
    const [serviceRank,setServiceRank]=useState();
    const [photoUrl_, setPhotoUrl]=useState("");
    const [newPhoto,setNewPhoto]=useState(false);
    const [newPhoto_prev,setNewPhoto_prev]=useState("");
    const aboutFood=async()=> {
        const setV=await dbService.collection("numazufood").doc(id.id).get();
      
        setNewRestNweet(setV.data().restName)
        setNewFoodNweet(setV.data().foodName)
        setNewThinkNweet(setV.data().think)
        setStar(setV.data().star)
        setAmount(setV.data().amount);
        setAmountRank(setV.data().amountRank); 
        setStarRank(setV.data().tasteRank);
        setServiceRank(setV.data().serviceRank);
        setService(setV.data().service);
        setPhotoUrl(setV.data().photoUrl);
        setLoading(true);
        setValue(setV.data());
    };
    useEffect(()=>{
        aboutFood();
    },[]);
    const onSubmit=async(event)=>{
        
        event.preventDefault();
        let photooo;
        if(newPhoto){
            console.log(1);
            await storageService.refFromURL(value.photoUrl).delete();
            
            const fileRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            console.log(fileRef);
            const responce=await fileRef.putString(newPhoto_prev,"data_url");
            photooo=await responce.ref.getDownloadURL();
            setPhotoUrl(photooo);
        }
        console.log(photoUrl_===photooo);
        await dbService.doc(`numazufood/${id.id}`).update({
            foodName:newFoodNweet,
            restName:newRestNweet,
            think:newThinkNweet,
            createdAt:value.createdAt,
            creator:userObj.uid,
            createdName:value.createdName,
            star:staring,
            amount:amount_set,
            tasteRank:starRank,
            amountRank:amountRank_t,
            service:setViceSet,
            serviceRank:serviceRank,
            photoUrl:newPhoto?photooo:photoUrl_
        });
        setEditin(false);
        window.location.reload();
    }
    const onChange=(event)=>{
        const {target}=event;
        console.log(event);
        if(target.name==="rest"){
            setNewRestNweet(target.value);
        }else if(target.name==="food"){
            setNewFoodNweet(target.value);
        }else if(target.name==="think"){
            setNewThinkNweet(target.value);
        }
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
            setNewPhoto_prev(result);
        }
        reader.readAsDataURL(theFile);}
        else{
            setNewPhoto_prev("");
        }
    }
    const onStar_taste=(event)=>{
        setStar(event.label);
        setStarRank(event.value);
    }
    const onStart_amount=(event)=>{
        setAmount(event.label);
        setAmountRank(event.value);
    }
    const onStar_Service=(event)=>{
        setService(event.label);
        setServiceRank(event.value);
    }
    const onClickChange=()=>{
        setNewPhoto(true);
    }
    const toggleEditing=()=>setEditin(prev=>!prev);
    const DeleteButton=async()=>{
            const ok=window.confirm("Are you sure?");
            if(ok){
                await dbService.doc(`numazufood/${id.id}`).delete();
                await storageService.refFromURL(value.photoUrl).delete();
                window.location.replace("/");
            }else{
                
            }
    }
    return(

        <div>
           {   loading?(
               editing?
               (<>{value.creator===userObj.uid&&(<>
                <img src={value.photoUrl} width="100px" height="100px"></img>
               <form onSubmit={onSubmit}>
                <input name="rest" value={newRestNweet}  required onChange={onChange}/>
                <input name="food" value={newFoodNweet}  required onChange={onChange}/>
                <Select name="star" value={photoUrl_}placeholder={staring}options={taste_options} onChange={onStar_taste}></Select>
                <Select name="amount" placeholder={amount_set}options={amount_options} onChange={onStart_amount}></Select>
                <Select name="service" placeholder={setViceSet}options={service_option} onChange={onStar_Service}></Select>
                {
                    !newPhoto?(<><button onClick={onClickChange}>Change Photo</button></>):( <input type="file" accept="image/*" onChange={onFileChange} required/>)
                }
               <input type="submit" value="update neweets"></input>
               </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>)}
                </>):(
               <><div>{value.createdName}</div>
               <div>{value.restName}</div>
               <div>{value.foodName}</div>
               <div>{value.think}</div>
               <div>{value.star}</div>
               <div>{value.amount}</div>
               <div>{value.service}</div>
               {value.photoUrl && <img src={value.photoUrl} width="100px" height="100px"></img>}
               {
                  
                   (userObj.uid===value.creator)&&(
                       <>
                       <button onClick={DeleteButton}>
                            Delete   
                       </button>
                       <button onClick={toggleEditing}>Edit</button>
                       </>
                   )
               }
               </>
               )
           ):<div>wait..</div>
            }</div>);
}

export default FoodDetail;