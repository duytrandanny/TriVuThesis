import React from 'react'
import BadgeComponent from "./BadgeComponent";

export default class BadgeListComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            questionEarn: 100,
            badgeList: [],
            era: [],
            technology: [],
            ecology: [],
            civics: [],
            culture: []
        }
    }

    updateLists = () => {
        this.setState({
            era: this.state.badgeList.filter(a => a.category === 3),
            technology: this.state.badgeList.filter(a => a.category === 1),
            ecology: this.state.badgeList.filter(a => a.category === 2),
            civics: this.state.badgeList.filter(a => a.category === 0),
            culture: this.state.badgeList.filter(a => a.category === 4),
            questionEarn: 999999
        }, () => {
            this.forceUpdate()
            this.props.turnOffForceUpdate()
        })
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.curQuestion > this.state.questionEarn) {
            console.log("cur question" + this.props.curQuestion.toString())
            console.log("state question earn" + this.state.questionEarn.toString())
            this.updateLists()
        }
        if(JSON.stringify(prevProps.badge) !== JSON.stringify(this.props.badge)) {
            console.log("force update is " + this.props.forceUpdate.toString())
            this.setState({
                questionEarn: this.props.questionEarn,
                badgeList: this.props.badge
            }, () => {
                if(this.props.forceUpdate) {
                    this.updateLists();
                }
                console.log(this.state.badgeList)
            })
        }
    }

    render() {
        return(
            <div className="">
                <span className="row">
                    <span className="col-sm-1 col-1"/>
                    <hr className="col-sm-5 col-10"/>
                    <span className="col-sm-6 col-1"/>
                </span>
                <span className="row">
                    <span className="col-sm-1 col-1"/>
                    <span className="col-sm-1 col-5">
                        <h6>ERA</h6>
                        {
                            this.state.era.length > 0 &&
                            <div className="badge-text">
                                <BadgeComponent className="badge-text" list={this.state.era}/>
                            </div>
                        }
                    </span>
                    <span className="col-sm-1 col-5">
                        <h6>CIVICS</h6>
                        {
                            this.state.civics.length > 0 &&
                            <div className="badge-text">
                                <BadgeComponent className="badge-text" list={this.state.civics}/>
                            </div>
                        }
                    </span>
                    <span className="col-1 d-sm-none"/>
                    <span className="col-1 d-sm-none"/>
                    <span className="col-sm-1 col-5">
                        <h6>CULTURE</h6>
                        {
                            this.state.culture.length > 0 &&
                            <div className="badge-text">
                                <BadgeComponent list={this.state.culture}/>
                            </div>
                        }
                    </span>
                    <span className="col-sm-1 col-5">
                        <h6>TECHNOLOGY</h6>
                        {
                            this.state.technology.length > 0 &&
                            <div className="badge-text">
                                <BadgeComponent list={this.state.technology}/>
                            </div>
                        }
                    </span>
                    <span className="col-1 d-sm-none"/>
                    <span className="col-4 d-sm-none"/>
                    <span className="col-sm-1 col-8">
                        <h6>ECOLOGY</h6>
                        {
                            this.state.ecology.length > 0 &&
                            <div className="badge-text">
                                <BadgeComponent list={this.state.ecology}/>
                            </div>
                        }
                    </span>
                    <span className="col-sm-6"/>
                </span>
            </div>)
    }

}