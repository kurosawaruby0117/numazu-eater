import React, { useState } from "react";
import {HashRouter as Router,Redirect,Route,Switch} from "react-router-dom";
import Auth from "./Auth";
import FoodDetail from "./FoodDetail";
import FoodList from "./foodList";
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
                
                <Route exact path="/sort/:id/">
                   <FoodList/>
                </Route>
                <Route exact path="/men/:id">
                    <FoodDetail userObj={userObj}/>   
                </Route>
                <Route exact path="/rice/:id">
                    <FoodDetail userObj={userObj}/>   
                </Route>
                <Route exact path="/sakana/:id">
                    <FoodDetail userObj={userObj}/>   
                </Route>
                <Route exact path="/niku/:id">
                    <FoodDetail userObj={userObj}/>   
                </Route>
                <Route exact path="/cookie/:id">
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