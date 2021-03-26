import React from 'react';
import ReactPlayer from 'react-player';
import { Fade } from "@chakra-ui/react";

export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'https://vimeo.com/527694042',
            loop: false,
            isButtonOn: false,
            mute: true,
            isIntroFinished: true
        }
    }

    handleEnded = () => {
        this.setState({
            isButtonOn: true
        })
    }

    handleProgress = () => {
        if(this.player.playing === false) {
            this.player.playing = true
        }
    }

    handleAudioLoop = () => {
        this.player.seekTo(50.0);
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
                {/** audio */}
                <ReactPlayer
                    ref={this.ref}
                    url='audio/ENTROPY_INTRO_TRACK.mp3'
                    onProgress={this.handleProgress}
                    onEnded={this.handleAudioLoop}
                    onPause={() => this.player.playing=true}
                    playing={true}
                    width='0'
                    height='0'
                    config={{
                        file: {
                            forceAudio: true
                            
                        }
                    }}
                />
                { /** loop video */
                    this.state.isIntroFinished &&
                    <ReactPlayer
                        className='react-player fixed-bottom'
                        url='https://vimeo.com/527694350'
                        playing={true}
                        muted={true}
                        width='100%'
                        height='100%'
                        controls={false}
                        loop={true}
                    />
                }
                { /** intro video */
                    !this.state.isButtonOn &&
                    <ReactPlayer
                        className='react-player fixed-bottom'
                        url='https://vimeo.com/527694042'
                        playing={true}
                        muted={true}
                        width='100%'
                        height='100%'
                        controls={false}
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
