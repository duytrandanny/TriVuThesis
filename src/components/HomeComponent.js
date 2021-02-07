import React from 'react';
import {Link} from "react-router-dom";
import '../css/HomeStyling.css'

const HomeComponent = () => {
        return(
            <div>
                <h1>ENTROPY</h1>
                <div>
                    <Link to="/start">
                        <p>Click here to start</p>
                    </Link>
                </div>
            </div>
        )
}

export default HomeComponent;