import React from 'react';

export default class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: this.props.question.q
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id !== this.props.id) {
            console.log("current: " + this.props.id)
            const text = this.props.question.q.split('\n').map(str => <span><p>{str}</p><br/></span>);
            this.setState({
                question: text
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
                {/*{this.props.question.id}*/}
                <p>{this.state.question}</p>
            </div>
        )
    }
}



