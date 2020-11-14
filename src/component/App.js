import React, { useEffect, useState } from "react";
import { authService } from "../myBase";
import Home from "./Home";
import AppRouter from "./Router";

function App() {
  const [init,setInit]=useState(false);
  const [userObj,setUserObj]=useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj(user);
      }else{
        setUserObj(null);
      }
      setInit(true);
    })
  })
  return (
    <>
    <div>
    {init ? <AppRouter  userObj={userObj}isLoggedIn={Boolean(userObj)}/>:"initializing..."}
    </div>
    </>
  );
}

export default App;
