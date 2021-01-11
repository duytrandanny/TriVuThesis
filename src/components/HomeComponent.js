import React from 'react';
import {Link} from "react-router-dom";
import '../css/HomeStyling.css'

const HomeComponent = () => {
        return(
            <div className="">
                <h1>Welcome!</h1>
                <div>
                    <Link to="/start">Click here to start</Link>
                </div>
            </div>
        )
}

export default HomeComponent;