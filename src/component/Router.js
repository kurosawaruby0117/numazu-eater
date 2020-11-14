import React, { useState } from "react";
import {HashRouter as Router,Redirect,Route,Switch} from "react-router-dom";
import Auth from "./Auth";
import FoodDetail from "./FoodDetail";
import Home from "./Home";
import Navigator from "./Navigation";
import ReviewWriting from "./writingReview";

const AppRouter=({userObj,isLoggedIn})=>{
    return(
        <Router>
            {isLoggedIn &&   <Navigator userObj={userObj}/>}
            <Switch>
                {
                    isLoggedIn?(<>
                     <Route exact path="/">
                    <Home userObj={userObj}/>
                </Route>
                <Route exact path="/writing">
                   <ReviewWriting userObj={userObj}/>
                </Route>
                <Route exact path="/food/:id">
                    <FoodDetail userObj={userObj}/>
                   
                </Route>
                </>):
                (
                <Route exact path="/"><Auth/></Route>)

                }
           
            </Switch>
            </Router>
           
    )
}

export default AppRouter;