import React, { useState } from "react"
import { authService, firebaseInstance } from "../myBase";

const Auth=()=>{
    const [error,setError]=useState("");
    const onClick=async(event)=>{
        try{
            const {
                target:{name},
            }=event;
            let provider;
            if(name==="facebook"){
                provider=new firebaseInstance.auth.FacebookAuthProvider();
            }else if(name==="twitter"){
                provider=new firebaseInstance.auth.GithubAuthProvider();
            }
            await authService.signInWithPopup(provider);
        }
        catch(error){
            setError(error.message);
        }
     
    }
    return(
        <div>
            {error}
            <button onClick={onClick}name="facebook">Continue with facebook</button>
            <button onClick={onClick}name="twitter">Continue with twitter</button>
        </div>
    )
}

export default Auth;