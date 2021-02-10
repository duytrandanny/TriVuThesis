import React from 'react'
import BadgeComponent from "./BadgeComponent";

export default class BadgeListComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            badgeList: this.props.badge,
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
            culture: this.state.badgeList.filter(a => a.category === 4)
        })
    }

    componentDidMount() {
        this.updateLists();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.badgeList.length !== this.props.badge.length) {
            this.setState({
                badgeList: this.props.badge
            }, () => this.updateLists());
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
                    <span className="E-scrollable">
                        <BadgeComponent list={this.state.era}/>
                    </span>
                }
                    </span>
                    <span className="col-sm-1 col-5">
                        <h6>CIVICS</h6>
                        {
                            this.state.civics.length > 0 &&
                            <BadgeComponent list={this.state.civics}/>
                        }
                    </span>
                    <span className="col-1 d-sm-none"/>
                    <span className="col-1 d-sm-none"/>
                    <span className="col-sm-1 col-5">
                        <h6>TECHNOLOGY</h6>
                {
                    this.state.technology.length > 0 &&
                        <BadgeComponent list={this.state.technology}/>
                }
                    </span>
                    <span className="col-sm-1 col-5">
                        <h6>CULTURE</h6>
                {
                    this.state.culture.length > 0 &&
                    <div className="E-scrollable">
                        <BadgeComponent list={this.state.culture}/>
                    </div>
                }
                    </span>
                    <span className="col-1 d-sm-none"/>
                    <span className="col-4 d-sm-none"/>
                    <span className="col-sm-1 col-8">
                        <h6>ECOLOGY</h6>
                        {
                            this.state.ecology.length > 0 &&
                            <BadgeComponent list={this.state.ecology}/>
                        }
                    </span>
                    <span className="col-sm-6"/>
                </span>
            </div>)
    }

}