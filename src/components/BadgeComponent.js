import React from 'react';

export default class BadgeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _isMounted: false
        }
    }

    componentDidMount() {
        this.setState({_isMounted: true});
    }

    renderSwitch = (category) => {
        switch(category) {
            case 0:
                return <h6 className="badge-style-cat0">
                    {this.props.name}
                </h6>
            case 1:
                return <h6 className="badge-style-cat1">
                    {this.props.name}
                </h6>
            case 2:
                return <h6 className="badge-style-cat2">
                    {this.props.name}
                </h6>
            case 3:
                return <h6 className="badge-style-cat3">
                    {this.props.name}
                </h6>
            case 4:
                return <h6 className="badge-style-cat4">
                    {this.props.name}
                </h6>
            case 5:
                return <h6 className="badge-style-cat5">
                    {this.props.name}
                </h6>
            case 6:
                return <h6 className="badge-style-cat6">
                    {this.props.name}
                </h6>
            default:
                return <h6>
                    {this.props.name}
                </h6>
        }
    }

    render() {
        return(
            <span>
                {
                    this.renderSwitch(this.props.category)
                }
            </span>
        )
    }
}