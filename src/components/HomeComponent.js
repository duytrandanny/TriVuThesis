import React from 'react';
import ReactPlayer from 'react-player';
import { Fade } from "@chakra-ui/react"

export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'https://vimeo.com/527694042',
            loop: false,
            isButtonOn: false,
            mute: true,
            isIntroFinished: false
        }
    }

    handleProgress = () => {
        if (this.player.getCurrentTime() > 30) {
            this.setState({
                isIntroFinished: true
            })
        }
    }

    handleEnded = () => {
        console.log("video ended")
        this.setState({
            isButtonOn: true,
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
                {
                    this.state.isIntroFinished &&
                    <ReactPlayer
                        ref={this.ref}
                        className='react-player fixed-bottom'
                        url='https://vimeo.com/527694350'
                        playing={true}
                        muted={true}
                        width='100%'
                        height='100%'
                        controls={false}
                        loop={true}
                        vimeoConfig={{preload: true}}
                    />
                }
                {
                    !this.state.isButtonOn &&
                    <ReactPlayer
                        ref={this.ref}
                        className='react-player fixed-bottom'
                        url='https://vimeo.com/527694042'
                        playing={true}
                        muted={false}
                        width='100%'
                        height='100%'
                        controls={false}
                        onProgress={this.handleProgress}
                        onEnded={this.handleEnded}
                    />
                }
                {
                    this.state.isButtonOn &&
                    <span>
                        <Fade in={this.state.isButtonOn}>
                            <div className="row E-intro-screen">
                                <span className="col-4"></span>
                                <span className="col-4 answer-box-wrap">
                                    <span className='answer-box E-dark-theme' onClick={() => this.handleOnClick('howtoplay')}>
                                        HOW TO PLAY
                                    </span>
                                    <span className='answer-box E-dark-theme' onClick={() => this.handleOnClick('start')}>
                                        PLAY NOW
                                    </span>
                                </span>
                                <span className="col-4"></span>
                            </div>
                        </Fade>
                    </span>
                }
            </div>
        )
    }
}
