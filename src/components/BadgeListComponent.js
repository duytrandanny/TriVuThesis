import React from 'react'
import BadgeComponent from "./BadgeComponent";

export default class BadgeListComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            badgeList: this.props.badge,
            era: this.props.badge.filter(a => a.category === 1),
            technology: this.props.badge.filter(a => a.category === 2),
            ecology: this.props.badge.filter(a => a.category === 3),
            civics: this.props.badge.filter(a => a.category === 4),
            culture: this.props.badge.filter(a => a.category === 5)
        }
    }

    render() {
        return(
            <footer className="container">
                <hr/>
                <span className="row justify-content-center E-scrollable">
                {
                    this.state.era.length > 0 &&
                    <span className="col-sm-2">
                        <h6>ERA</h6>
                        <BadgeComponent list={this.state.era}/>
                    </span>
                }
                {
                    this.state.technology.length > 0 &&
                    <span className="col-sm-3">
                        <h6>TECHNOLOGY</h6>
                        <BadgeComponent list={this.state.technology}/>
                    </span>
                }
                {
                    this.state.ecology.length > 0 &&
                    <span className="col-sm-2">
                        <h6>ECOLOGY</h6>
                        <BadgeComponent list={this.state.ecology}/>
                    </span>
                }
                {
                    this.state.civics.length > 0 &&
                    <span className="col-sm-3">
                        <h6>CIVICS</h6>
                        <BadgeComponent list={this.state.civics}/>
                    </span>
                }
                {
                    this.state.culture.length > 0 &&
                    <span className="col-sm-2">
                        <h6>CULTURE</h6>
                        <BadgeComponent list={this.state.culture}/>
                    </span>
                }
                </span>
            </footer>)
    }

}