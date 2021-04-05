import {BrowserRouter as Router, Route} from "react-router-dom";
import './css/App.css';
import './css/About.css';
import './css/Contact.css';
import React from "react";
import StartComponent from "./components/StartComponent";
import HomeComponent from "./components/HomeComponent";
import EditComponent from "./components/EditComponent";
import ContactComponent from "./components/ContactComponent";
import AboutComponent from "./components/AboutComponent";
import Header from './components/Header'

class App extends React.Component {
    render() {
        return (
            <div className="App ">
                <Router>
                    <Route path="/start" component={Header}/>
                    <Route path="/about" component={Header}/>
                    <Route path="/contact" component={Header}/>
                    <Route path="/" exact component={HomeComponent}/>
                    <Route path="/start" exact component={StartComponent}/>
                    <Route path="/edit" exact component={EditComponent}/>
                    <Route path="/about" exact component={AboutComponent}/>
                    <Route path="/contact" exact component={ContactComponent}/>
                </Router>
            </div>
        );
    }
}

export default App;
