import React from 'react';

export default class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: this.props.question
        }
    }

    componentDidMount() {
        // if (this.state.question.nextQ !== null) {
        //     setTimeout(() => {
        //         this.props.fetchQuestion(this.state.question.nextQ);
        //     }, 3000)
        // }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id !== this.props.id) {
            console.log("current: " + this.props.id)
            this.setState({
                question: this.props.question
            })
        }
        // clearTimeout(this.fetchTimeout)
        //
        // if (this.state.question.nextQ !== null && this.state.question.nextQ !== 2001) {
        //     console.log("called fetch question")
        //     this.fetchTimeout = setTimeout(() => {
        //         this.props.fetchQuestion(this.state.question.nextQ);
        //     }, 3000)
        // }
    }

    render() {
        return (
            <div>
                <p>{this.state.question.q}</p>
            </div>
        )
    }
}



