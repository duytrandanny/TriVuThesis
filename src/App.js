import {BrowserRouter as Router, Route} from "react-router-dom";
import './css/App.css';
import React from "react";
import StartComponent from "./components/StartComponent";
import HomeComponent from "./components/HomeComponent";
import EditComponent from "./components/EditComponent";

class App extends React.Component {
    render() {
        return (
            <div className="App container">
                <Router>
                    <Route path="/" exact component={HomeComponent}/>
                    <Route path="/start" exact component={StartComponent}/>
                    <Route path="/edit" exact component={EditComponent}/>
                </Router>
            </div>
        );
    }
}

export default App;
