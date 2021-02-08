import React from 'react';
import QuestionComponent from "./QuestionComponent";
import BadgeListComponent from "./BadgeListComponent"
import TimeComponent from "./TimeComponent"


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
                }, () => {
                    this.updateBadge()
                });
            });

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
                })
            })
            .then(() => {
                this.setState({
                    curQuestion: this.state.questionData[0],
                    curID: 0
                })
            })
            .then(() => {
                this.updateBadge()
                this.setState({
                    _isLoading: false
                })
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.curQuestion.id !== this.state.curQuestion.id) {
        }
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
        console.log("Called updateBadge")
        const earnedBadge = this.state.badgeData.find(b => this.state.curQuestion.badgeEarn.includes(b.id));
        if (earnedBadge !== undefined) {
            if(earnedBadge.upgrade) {
                this.replaceBadge(earnedBadge, earnedBadge.category);
            } else {
                this.setBadge(earnedBadge)
            }
        }
        console.log("Finished updateBadge")
        console.log(this.state.badge)
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
        } else if (fetchedQ.requiredBadge.every(b => this.state.badge.find(x => b===x.id) !== undefined)) {
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
            <div className="E-body">
                <span className="row mt-5">
                    <span className="col-sm-1"/>
                    <span className="col-sm-1">
                        <h6>HOW TO PLAY</h6>
                    </span>
                    <span className="col-sm-3"/>
                    <span className="col-sm-2 text-center">
                        <h5>ENTROPY</h5>
                    </span>
                    <span className="col-sm-3"/>
                    <span className="col-sm-1 text-right">
                        <h6>ABOUT US</h6>
                    </span>
                    <span className="col-sm-1"/>
                </span>


                <span className="E-content row">
                    <span className="col-1"/>
                    <span className="col-1">
                        <h6>TIME</h6>
                        <TimeComponent time={this.state.curQuestion.time}/>
                    </span>

                    <span className="col-4">
                        <h6>EVENTS</h6>
                        <QuestionComponent
                            id={this.state.curQuestion.id}
                            restart={this.restart}
                            fetchQuestion={this.fetchQuestion}
                            question={this.state.curQuestion}
                            setTime={this.setTime}
                            setBadge={this.setBadge}/>
                    </span>
                    <span className="col-6"/>
                </span>

                <span className="row">
                    <span className="E-badge-component-style">
                        <span className="">
                            <BadgeListComponent
                                badge={this.state.badge}/>
                        </span>
                    </span>
                </span>

            </div>
        )
    }
}