import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './css/App.css';
import React from "react";
import StartComponent from "./components/StartComponent";
import HomeComponent from "./components/HomeComponent";

class App extends React.Component {sa

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Route path="/" exact component={HomeComponent}/>
                    <Route path="/start" exact component={StartComponent}/>
                </Router>
            </div>
        );
    }
    r
}

export default App;
