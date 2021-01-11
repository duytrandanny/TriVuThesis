import React from 'react';
import {Link} from "react-router-dom";

export default class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: this.props.question
        }
    }

    componentDidMount() {
        if(this.state.question.nextQ !== null) {
            setTimeout(() => {
                this.props.fetchQuestion(this.state.question.nextQ);
            }, 3000)
        }
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.id !== this.props.id) {
            console.log("current: " + this.props.id)
            this.setState({
                question: this.props.question
            })
        }
        clearTimeout(this.fetchTimeout)

        if(this.state.question.nextQ !== null && this.state.question.nextQ !== 2000) {
            console.log("called fetch question")
            this.fetchTimeout = setTimeout(() => {
                this.props.fetchQuestion(this.state.question.nextQ);
            }, 3000)
        }
    }

    render() {
        return(
            <div>
                <h1>{this.state.question.q}</h1>
                {
                    this.state.question.nextQ === null &&
                    <div className="row">
                        <span className="col-6 answer-box"
                              onClick={() => this.props.fetchQuestion(this.state.question.a1Link)}>
                            {this.state.question.a1}
                        </span>
                        <span className="col-6 answer-box"
                              onClick={() => this.props.fetchQuestion(this.state.question.a2Link)}>
                            {this.state.question.a2}
                        </span>
                    </div>
                }
            </div>
        )
    }
}


