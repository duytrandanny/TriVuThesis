import React from 'react';
import ReactPlayer from 'react-player';
import { Fade } from "@chakra-ui/react"

export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isButtonOn: false,
            mute: true,
            buttonClass: 'E-dark-theme'
        }
    }

    handleProgress = () => {
        if (this.player.getCurrentTime() > 47) {
            this.setState({
                isButtonOn: true
            })
        }
    }

    handleEnded = () => {
        this.setState({
            buttonClass: ''
        })
    }

    handleOnClick = (link) => this.props.history.push(`/${link}`);

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                mute: false
            })
        }, 500)
    }

    ref = player => {
        this.player = player
    }

    render() {
        return (
            <div className="">
                <ReactPlayer
                    ref={this.ref}
                    className='react-player fixed-bottom'
                    url='videos/titlesequence.MP4'
                    playing={true}
                    muted={true}
                    width='100%'
                    height='100%'
                    controls={true}
                    onProgress={this.handleProgress}
                    onEnded={this.handleEnded}
                />
                {
                    this.state.isButtonOn &&
                    <Fade in={this.state.isButtonOn}>
                        <div className="row E-intro-screen">
                            <span className="col-4"></span>
                            <span className="col-4 answer-box-wrap">
                                <span className={`answer-box ${this.state.buttonClass}`} onClick={() => this.handleOnClick('howtoplay')}>
                                    HOW TO PLAY
                                </span>
                                <span className={`answer-box ${this.state.buttonClass}`} onClick={() => this.handleOnClick('start')}>
                                    PLAY NOW
                                </span>
                            </span>
                            <span className="col-4"></span>
                        </div>
                    </Fade>
                }
            </div>
        )
    }
}
