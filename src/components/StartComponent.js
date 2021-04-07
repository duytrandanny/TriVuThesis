import React from 'react';
import BadgeListComponent from "./BadgeListComponent"
import TimeComponent from "./TimeComponent"
import RunningTitleComponent from "./RunningTitleComponent"
import ReactPlayer from 'react-player';
import Header from './Header'

export default class StartComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _isLoading: true,
            time: 0,
            badge: [],
            questionData: [],
            badgeData: [],
            runningTitleData: '', // + Array(100).fill('\xa0').join(''),
            curID: -1,
            forceUpdate: false,
            speculateTime: '',
            speculateEvent: '',
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
                        curQuestion: this.addNewLineHTML(this.state.questionData[0]),
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

    addNewLineHTML = (questionData) => {
        const finalText = (questionData.q.split('\n')).map(str => <span><p>{str}</p><br/></span>);
        console.log(`${finalText}`);
        return {
            ...questionData, 
            q: finalText,
        }
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
        if(link === 3000) {
            this.setState({
                speculateEvent: '',
                speculateTime: ''
            })
            return;
        }
        // this question does NOT require any badge
        if (fetchedQ.requiredBadge.length === 0) {
            this.setState({
                curQuestion: this.addNewLineHTML(this.state.questionData.find(x => x.id === link))
            }, () => {
                this.updateBadge()
            })
            // this question requires some badges and player has it
        } else if (fetchedQ.requiredBadge.every(b => b >= 0 && this.state.badge.find(x => b === x.id) !== undefined)) {
            this.setState({
                curQuestion: this.addNewLineHTML(this.state.questionData.find(x => x.id === link))
            }, () => {
                this.updateBadge()
            })
            // this question requires the absence of some badges
        } else if (fetchedQ.requiredBadge.every(b => b < 0 && this.state.badge.find(x => (0 - b) === x.id) === undefined)) {
            this.setState({
                curQuestion: this.addNewLineHTML(this.state.questionData.find(x => x.id === link))
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

    handleReroute = (page) => this.props.history.push(`/${page}`);

    turnOffForceUpdate = () => { this.setState({ forceUpdate: false }) }

    restart = () => {
        this.setState({
            badge: [],
            forceUpdate: true
        }, () => {
            this.fetchQuestion(0)
        })
    }

    ref = player => {
        this.player = player
    }

    render() {
        return (
            this.state._isLoading ?
                <h1>Loading...</h1> :
                <span>
                    <div className="E-body">
                        <span className="row">
                            <span className="col-6"/>
                            <div className="col-6 d-flex justify-content-center">
                                <span className="E-viewport-wrapper">
                                    <ReactPlayer
                                        ref={this.player}
                                        className='react-player E-viewport'
                                        url='https://www.youtube.com/watch?v=m6PGIto3FuI'
                                        playing={true}
                                        muted={true}
                                        width= "326px"
                                        height= "760px"
                                        controls={false}
                                        loop={true}
                                    />
                                </span>
                            </div>
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
                                        {
                                            this.state.curQuestion.id === 3000? 
                                            <input className="form-control" placeholder="Year" value={this.state.speculateTime} onChange={event=> this.setState({speculateTime: event.target.value})}/> :
                                            <TimeComponent time={this.state.curQuestion.time} />
                                        }
                                    </span>
                                    <span className="col-9">
                                        <h6>EVENTS</h6>
                                        {
                                            this.state.curQuestion.id === 3000? 
                                            <input className="form-control" placeholder="Event" value={this.state.speculateEvent} onChange={event=> this.setState({speculateEvent: event.target.value})}/> :
                                            <div className="E-question">{this.state.curQuestion.q}</div>
                                        }
                                    </span>
                                </span>
                            </span>

                            <span className="col-6">
                            </span>
                        </span>

                        <span className="row">
                            <span className="col-1" />
                            <span className="col-5" style={{padding: 0}}>
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
                                    {
                                        this.state.curQuestion.id === 3000 &&
                                        <span className="answer-box"
                                            onClick={() => this.restart()}>
                                            RESTART
                                        </span>
                                    }
                                    </span>
                                </span>
                            </span>
                            <span className="col-6" />
                        </span>

                        <footer className="fixed-bottom E-antiscrolling">
                            <BadgeListComponent
                                forceUpdate={this.state.forceUpdate}
                                turnOffForceUpdate={this.turnOffForceUpdate}
                                curQuestion={this.state.curQuestion.id}
                                questionEarn={this.state.curQuestion.id}
                                badge={this.state.badge} />
                        </footer>
                    </div>
                </span>
                
        )
    }
}