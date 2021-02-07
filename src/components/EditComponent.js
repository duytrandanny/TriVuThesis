import React from 'react'

export default class EditComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            _isLoading: true,
            questionData: [],
            badgeData: [],
            currentID: 0,
            currentQuestion: {},
            editID: false,
            editQuestion: false,
            editTime: false,
            editA1: false,
            editA2: false,
            editA1Link: false,
            editA2Link: false,
            editNextQ: false,
            editBadgeEarned: false,
            editRequiredBadge: false
        }
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
                    currentQuestion: this.state.questionData[0],
                    _isLoading: false
                })
            });
    }

    flip = (element) => {
        switch(element) {
            case "id":
                this.setState({
                    editID: !this.state.editID
                })
                console.log("toggled edit ID")
                console.log(this.state.editID)
                break;
            case "q":
                this.setState({
                    editQuestion: !this.state.editQuestion
                })
                break;
            case "time":
                this.setState({
                    editTime: !this.state.editTime
                })
                break;
            case "a1":
                this.setState({
                    editA1: !this.state.editA1
                })
                break;
            case "a2":
                this.setState({
                    editA2: !this.state.editA2
                })
                break;
            case "a1link":
                this.setState({
                    editA1Link: !this.state.editA1Link
                })
                break;
            case "a2link":
                this.setState({
                    editA2Link: !this.state.editA2Link
                })
                break;
            case "nextq":
                this.setState({
                    editNextQ: !this.state.editNextQ
                })
                break;
            case "badgeearned":
                this.setState({
                    editBadgeEarned: !this.state.editBadgeEarned
                })
                break;
            case "requiredbadge":
                this.setState({
                    editRequiredBadge: !this.state.editRequiredBadge
                })
                break;
            default:
                break;

        }
    }

    render() {
        return(
            this.state._isLoading ?
            <h1>Loading ...</h1> :
            <div>
                <b>ID</b>
                {
                    this.state.editID ?
                    <div className="">
                        <input className="form-control"
                               placeholder="ID"
                               type="text"
                               value={this.state.currentQuestion.id}
                               onChange={(event) => this.setState({currentQuestion: {...this.state.currentQuestion, id: event.target.value}})}/>
                           <button className="btn"
                                   onClick={() => this.flip("id")}>Save</button>
                    </div>
                        :
                    <div>
                        <p>
                            { this.state.currentQuestion.id }
                        </p>
                        <button className="btn"
                                onClick={() => this.flip("id")}>Edit</button>
                    </div>
                }
                <b>Event/Question</b>
                {
                    this.state.editQuestion ?
                        <div className="">
                            <input className="form-control"
                                   placeholder="ID"
                                   type="text"
                                   value={this.state.currentQuestion.q}
                                   onChange={(event) => this.setState({currentQuestion: {...this.state.currentQuestion, q: event.target.value}})}/>
                            <button className="btn"
                                    onClick={() => this.flip("q")}>Save</button>
                        </div>
                        :
                        <div>
                            <p>
                                { this.state.currentQuestion.q }
                            </p>
                            <button className="btn"
                                    onClick={() => this.flip("q")}>Edit</button>
                        </div>
                }
            </div>
        )
    }
}