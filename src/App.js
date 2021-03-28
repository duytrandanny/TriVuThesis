import {BrowserRouter as Router, Route} from "react-router-dom";
import './css/App.css';
import React from "react";
import StartComponent from "./components/StartComponent";
import HomeComponent from "./components/HomeComponent";
import EditComponent from "./components/EditComponent";
import AboutUsComponent from "./components/AboutUsComponent";
import HowToPlayComponent from "./components/HowToPlayComponent";
import Header from './components/Header'

class App extends React.Component {
    render() {
        return (
            <div className="App ">
                <Router>
                    <Route path="/start" component={Header}/>
                    <Route path="/howtoplay" component={Header}/>
                    <Route path="/aboutus" component={Header}/>
                    <Route path="/" exact component={HomeComponent}/>
                    <Route path="/start" exact component={StartComponent}/>
                    <Route path="/edit" exact component={EditComponent}/>
                    <Route path="/howtoplay" exact component={HowToPlayComponent}/>
                    <Route path="/aboutus" exact component={AboutUsComponent}/>
                </Router>
            </div>
        );
    }
}

export default App;
