import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../myBase";
import translate from 'translate-google-api';
import Select from 'react-select'
const FoodDetail=({userObj})=>{
    const id=useParams();
    const [value,setValue]=useState('');
    const [editing,setEditin]=useState(false);
    const [newFoodNweet,setNewFoodNweet]=useState("");
    const [newRestNweet,setNewRestNweet]=useState("");
    const [newThinkNweet,setNewThinkNweet]=useState("");
    const [loading,setLoading]=useState(false);
    const [staring,setStar]=useState("");
    const aboutFood=async()=> {
        const setV=await dbService.collection("numazufood").doc(id.id).get();
      
        setNewRestNweet(setV.data().restName)
        setNewFoodNweet(setV.data().foodName)
        setNewThinkNweet(setV.data().think)
        setStar(setV.data().star)
        setLoading(true);
        setValue(setV.data());
    };
    useEffect(()=>{
        aboutFood();
    },[]);
    const onSubmit=async(event)=>{
        event.preventDefault();
        await dbService.doc(`numazufood/${id.id}`).update({
            foodName:newFoodNweet,
            restName:newRestNweet,
            think:newThinkNweet,
            createdAt:value.createdAt,
            creator:userObj.uid,
            createdName:value.createdName,
            star:staring
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
    const onStar=(event)=>{
        setStar(event.label);
    }
    const toggleEditing=()=>setEditin(prev=>!prev);
    const DeleteButton=async()=>{
            const ok=window.confirm("Are you sure?");
            if(ok){
                await dbService.doc(`numazufood/${id.id}`).delete();
                window.location.replace("/");
            }else{
    
            }
    }
    const options = [
        { value: '0', label: '진짜 맛없음' },
        { value: '1', label: '맛없음' },
        { value: '2', label: '먹을만함' },
        { value: '3', label: '맛있음' },
        { value: '4', label: '존맛탱' }
      ]
    return(

        <div>
           {   loading?(
               editing?
               (<>{value.creator===userObj.uid&&(<>
               <form onSubmit={onSubmit}>
                <input name="rest" value={newRestNweet}  required onChange={onChange}/>
                <input name="food" value={newFoodNweet}  required onChange={onChange}/>
                <textarea name="think" value={newThinkNweet} required onChange={onChange}/>
                <Select name="star" placeholder={staring}options={options} onChange={onStar}></Select>
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