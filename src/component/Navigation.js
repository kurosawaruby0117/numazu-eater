import React from "react"
import {Link,link, useHistory} from "react-router-dom"
import { authService } from "../myBase";

const Navigator=({userObj})=>{
    const history=useHistory();
    const onLogOut=()=>{
        authService.signOut();
        history.push("/");
    }
    return(
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/writing">writing</Link>
        </li>
        <li>
            <button onClick={onLogOut}>Log out</button>
        </li>
    </ul>
    )
}

export default Navigator;