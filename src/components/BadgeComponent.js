import React from 'react'


export default class BadgeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: this.props.list
        }
    }


    render() {
        return(
            <span>
                {
                    this.state.list.map(a => <p>{a.name}</p>)
                }
            </span>
        )
    }
}