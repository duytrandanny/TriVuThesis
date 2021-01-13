import React, {useContext} from 'react';
import QuestionComponent from "./QuestionComponent";
import BadgeComponent from "./BadgeComponent";
import { CSSTransition } from "react-transition-group";


export default class StartComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _isLoading: true,
            time: 0,
            badge: [],
            questionData: [],
            badgeData: [],
            curID: -1,
            curQuestion: {
                "id": 0,
                "q": "Init",
                "time": 0,
                "a1": null,
                "a2": null,
                "a1Link": null,
                "a2Link": null,
                "nextQ": 1,
                "badgeEarn": [],
                "requiredBadge": []
            }
        }
    }

    tick() {
        this.setState(state => ({
            time: state.time + 1
        }))
    }

    componentDidMount() {
        fetch('questiondata.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error = new Error("Error fetching data");
                    throw(error);
                }
            })
            .then(r => {
                this.setState({
                    questionData: r
                });
            })
            .then(() => {
                this.setState({
                    curQuestion: this.state.questionData[0],
                    curID: 0,
                    _isLoading: false
                })
            });

        fetch('badgedata.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    const error = new Error("Error fetching data");
                    throw(error);
                }
            })
            .then(r => {
                console.log(r);
                this.setState({
                    badgeData: r
                });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.curQuestion.id !== this.state.curQuestion.id) {
        }
    }

    componentWillUnmount() {
        // clearInterval(this.interval)
    }

    setTime = (newTime) => {
        this.setState({
            time: newTime
        })
    }

    setBadge = newBadge => {
        console.log("adding badge : " + newBadge.name);
        if(this.state.badge.findIndex(x => x.id === newBadge.id) === -1) {
            this.setState(prevState => ({
                badge: [...prevState.badge, newBadge]
            }))
        }
    }

    replaceBadge = (newBadge, cat) => {
        if(this.state.badge.findIndex(x => x.id === newBadge.id) === -1) {
            const array = [...this.state.badge];
            const oldBadge = this.state.badge.find(y => y.category === cat);
            if(oldBadge !== undefined) {
                array.splice(this.state.badge.indexOf(oldBadge), 1);
                this.setState({
                    badge: array
                })
            }

            this.setState(prevState => ({
                badge: [...prevState.badge, newBadge]
            }))
        }
    }

    updateBadge() {
        console.log("looking for badge for question: " + this.state.curQuestion.id);
        console.log("this question includes badge id: " + this.state.curQuestion.badgeEarn[0]);
        const earnedBadge = this.state.badgeData.find(b => this.state.curQuestion.badgeEarn.includes(b.id));
        console.log("found badge:");
        console.log(earnedBadge);
        if (earnedBadge !== undefined) {
            // if(earnedBadge.category === 1 || earnedBadge.category === 5) {
                this.replaceBadge(earnedBadge, earnedBadge.category);
            // } else {
            //     this.setBadge(earnedBadge)
            // }
        }
        console.log("new badge list :");
        console.log(this.state.badge);
    }

    fetchQuestion = link => {
        console.log("fetching question: " + link)
        const fetchedQ = this.state.questionData.find(x => x.id === link)
        if(fetchedQ.requiredBadge.length === 0) {
            this.setState({
                curQuestion: this.state.questionData.find(x => x.id === link)
            }, () => {
                this.updateBadge()
            })
        } else if (this.state.badge.filter(b => fetchedQ.requiredBadge.includes(b.id))
            .every(x => fetchedQ.requiredBadge.includes(x.id))) {
            this.setState({
                curQuestion: this.state.questionData.find(x => x.id === link)
            }, () => {
                this.updateBadge()
            })
        } else {
            if(fetchedQ.nextQ) {
                this.fetchQuestion(fetchedQ.nextQ)
            } else {
                this.fetchQuestion(fetchedQ.a1Link)
            }
        }
    }

    restart = () => {
        this.setState({
            badge: []
        }, () => {
            this.fetchQuestion(0)
        })
    }

    render() {
        return(
            this.state._isLoading ?
            <h1>Loading...</h1> :
            <div>
                {
                    typeof(this.state.curQuestion.time) === "number" &&
                    this.state.curQuestion.time < 0 &&
                    <h4>
                        {0 - this.state.curQuestion.time} BCE
                    </h4>
                }
                {
                    typeof(this.state.curQuestion.time) === "number" &&
                    this.state.curQuestion.time >= 0 &&
                    <h4>
                        Year {0 - this.state.curQuestion.time}
                    </h4>
                }
                {
                    typeof(this.state.curQuestion.time) === "string" &&
                    <h4>
                        {this.state.curQuestion.time}
                    </h4>
                }
                <QuestionComponent
                    id={this.state.curQuestion.id}
                    restart={this.restart}
                    fetchQuestion={this.fetchQuestion}
                    question={this.state.curQuestion}
                    setTime={this.setTime}
                    setBadge={this.setBadge}/>
                <h4>
                    Badge Earned:
                </h4>
                <div>
                {
                    typeof(this.state.badge) !== 'undefined' &&
                    this.state.badge.map(badge =>
                        <BadgeComponent
                            category={badge.category}
                            name={badge.name}/>
                    )
                }
                </div>
            </div>
        )
    }
}