import React from 'react';
import QuestionComponent from "./QuestionComponent";
import BadgeListComponent from "./BadgeListComponent"
import TimeComponent from "./TimeComponent"
import RunningTitleComponent from "./RunningTitleComponent"


export default class StartComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _isLoading: true,
            time: 0,
            badge: [],
            questionData: [],
            badgeData: [],
            runningTitleData: '' + Array(100).fill('\xa0').join(''),
            curID: -1,
            forceUpdate: false,
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
        Promise.all([
            fetch('badgedata.json'
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        const error = new Error("Error fetching data");
                        throw (error);
                    }
                })
                .then(r => {
                    console.log(r);
                    this.setState({
                        badgeData: r
                    }, () => {
                        this.updateBadge()
                    });
                }),

            fetch('questiondata.json'
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        const error = new Error("Error fetching data");
                        throw (error);
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
                .then(() => this.updateBadge()),
                
                fetch('runningtitle.txt')
                .then(t => t.text())
                .then(t => this.setState({ runningTitleData: this.state.runningTitleData + t }))

            // fetch('runningtitle.json'
            //     , {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Accept': 'application/json'
            //         }
            //     })
            //     .then(response => {
            //         if(response.ok) {
            //             return response.json();
            //         } else {
            //             throw(new Error("Error fetching running title json"));
            //         }
            //     })
            //     .then(r => this.setState({ runningTitleData: r }))
        ])
            .then(() =>
                this.setState({
                    _isLoading: false
                }))

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    setTime = (newTime) => {
        this.setState({
            time: newTime
        })
    }

    setBadge = newBadge => {
        console.log("adding badge : " + newBadge.name);
        if (this.state.badge.findIndex(x => x.id === newBadge.id) === -1) {
            this.setState(prevState => ({
                badge: [...prevState.badge, newBadge]
            }))
        }
    }

    replaceBadge = (newBadge) => {
        if (this.state.badge.findIndex(x => x.id === newBadge.id) === -1) {
            const array = [...this.state.badge];
            const oldBadge = this.state.badge.find(y => y.id === newBadge.upgrade);
            if (oldBadge !== undefined) {
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
            if (earnedBadge.upgrade !== null) {
                this.replaceBadge(earnedBadge);
            } else {
                this.setBadge(earnedBadge)
            }
        }
        console.log("Finished updateBadge")
    }

    fetchQuestion = link => {
        console.log("fetching question: " + link)
        const fetchedQ = this.state.questionData.find(x => x.id === link)
        // this question does NOT require any badge
        if (fetchedQ.requiredBadge.length === 0) {
            this.setState({
                curQuestion: this.state.questionData.find(x => x.id === link)
            }, () => {
                this.updateBadge()
            })
            // this question requires some badges and player has it
        } else if (fetchedQ.requiredBadge.every(b => b >= 0 && this.state.badge.find(x => b === x.id) !== undefined)) {
            this.setState({
                curQuestion: this.state.questionData.find(x => x.id === link)
            }, () => {
                this.updateBadge()
            })
            // this question requires the absence of some badges
        } else if (fetchedQ.requiredBadge.every(b => b < 0 && this.state.badge.find(x => (0 - b) === x.id) === undefined)) {
            this.setState({
                curQuestion: this.state.questionData.find(x => x.id === link)
            }, () => {
                this.updateBadge()
            })
            // player does NOT have the required badge or absence of badge
        } else {
            if (fetchedQ.nextQ) {
                this.fetchQuestion(fetchedQ.nextQ)
            } else {
                this.fetchQuestion(fetchedQ.a1Link)
            }
        }
    }

    answerHandler = (link) => {
        this.setState({
            forceUpdate: true
        }, () => this.fetchQuestion(link))
    }

    turnOffForceUpdate = () => { this.setState({ forceUpdate: false }) }

    restart = () => {
        this.setState({
            badge: [],
            forceUpdate: true
        }, () => {
            this.fetchQuestion(0)
        })
    }

    render() {
        return (
            this.state._isLoading ?
                <h1>Loading...</h1> :
                <div className="E-body">
                    <span className="row mt-5 ">
                        <span className="col-1" />
                        <span className="col-1">
                            <img className="App-logo" alt="entropy logo" src={process.env.PUBLIC_URL + '/entropy-logo.png'} />
                        </span>
                        <span className="col-7" />
                        <span className="col-1">
                            <h6>HOW TO PLAY</h6>
                        </span>
                        <span className="col-1">
                            <h6>ABOUT US</h6>
                        </span>
                        <span className="col-1" />
                    </span>

                    

                    <span className="row E-content">
                        <span className="col-1"/>
                        <span className="col-5 p-0">
                            <RunningTitleComponent curTime={this.state.curQuestion.time} data={this.state.runningTitleData} />
                        </span>
                        <span className="col-6"/>
                        <span className="w-100"/>
                        <span className="col-1"/>
                        <span className="col-5 E-main-content">
                            <span className="row">
                                <span className="col-3">
                                    <h6>TIME</h6>
                                    <TimeComponent time={this.state.curQuestion.time} />
                                </span>
                                <span className="col-9">
                                    <h6>EVENTS</h6>
                                    <QuestionComponent
                                        key={this.state.curQuestion.id}
                                        id={this.state.curQuestion.id}
                                        restart={this.restart}
                                        fetchQuestion={this.fetchQuestion}
                                        question={this.state.curQuestion}
                                        setTime={this.setTime}
                                        setBadge={this.setBadge} />
                                </span>
                            </span>
                        </span>

                        <span className="col-6" />
                    </span>

                    <span className="row">
                        <span className="col-1" />
                        <span className="col-5">
                            <span className="row">
                                <span className="col-3"/>
                                <span className="col-9 answer-box-wrap">
                                {
                                    this.state.curQuestion.nextQ === null &&
                                    this.state.curQuestion.id !== 2000 && 
                                    <span className="answer-box"
                                        onClick={() => this.answerHandler(this.state.curQuestion.a1Link)}>
                                        {this.state.curQuestion.a1}
                                    </span>
                                }
                                {
                                    this.state.curQuestion.nextQ === null &&
                                    this.state.curQuestion.id !== 2000 && 
                                    <span className="answer-box"
                                        onClick={() => this.answerHandler(this.state.curQuestion.a2Link)}>
                                        {this.state.curQuestion.a2}
                                    </span>
                                }
                                {
                                    this.state.curQuestion.nextQ === null &&
                                    this.state.curQuestion.id === 2000 &&
                                    <span className="answer-box"
                                        onClick={() => this.restart()}>
                                        {this.state.curQuestion.a1}
                                    </span>
                                }
                                {
                                    this.state.curQuestion.nextQ !== null &&
                                    <span className="answer-box"
                                        onClick={() => this.fetchQuestion(this.state.curQuestion.nextQ)}>
                                        NEXT
                                    </span>
                                }
                                </span>
                            </span>
                            
                        </span>
                        <span className="col-6" />
                    </span>

                    <footer className="fixed-bottom E-antiscrolling">
                        <BadgeListComponent
                            className="row"
                            forceUpdate={this.state.forceUpdate}
                            turnOffForceUpdate={this.turnOffForceUpdate}
                            curQuestion={this.state.curQuestion.id}
                            questionEarn={this.state.curQuestion.id}
                            badge={this.state.badge} />
                    </footer>

                </div>
        )
    }
}