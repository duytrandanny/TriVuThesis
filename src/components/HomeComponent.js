import React from 'react';
import ReactPlayer from 'react-player';
import { Fade } from "@chakra-ui/react";

export default class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: false,
            url: 'https://vimeo.com/527694042',
            loop: false,
            isButtonOn: false,
            mute: true,
            isIntroFinished: true,
            isBlackBackgroundOn: 'E-black-background'
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

    startPage = () => this.setState({
            start: true,
            isBlackBackgroundOn: ''
        })

    componentDidMount() {
    }

    componentDidUpdate() {
        if(!this.player.muted) {
            this.player.muted = true
        }
    }

    ref = player => {
        this.player = player
    }

    render() {
        return (
            <span>
                {
                    !this.state.start &&
                    <div className='E-intro-screen-2 d-flex align-content-center flex-column'>
                        <span className='E-intro-text-box d-flex justify-content-between mb-auto'>
                            <span className='E-intro-text E-intro-choice' onClick={() => this.handleOnClick('about')}>ABOUT</span>
                            <span className='E-intro-text E-intro-choice'onClick={this.startPage}>INTRO</span>
                        </span>
                        <div className='d-flex E-player-intro-wrapper'>
                            <ReactPlayer
                                className='E-player-intro react-player'
                                height="unset"
                                url='https://vimeo.com/537598246'
                                playing={true}
                                muted={true}
                                controls={false}
                                loop={true}
                            />
                        </div>
                        <span className='E-intro-text-box d-flex justify-content-between align-items-end mt-auto'>
                            <span className='E-intro-text '>ENTROPY</span>
                            <span className='E-intro-text E-intro-choice ' onClick={() => this.handleOnClick('start')}>PLAY</span>
                        </span>
                    </div>
                }
                
                {/* <Fade in={true}>
                    <span className='E-intro-screen-start'>
                        <span className="row justify-content-center">
                            <img className="App-logo-intro" alt="entropy logo" src={process.env.PUBLIC_URL + '/metallic.png'} />
                        </span>
                        <div className="row justify-content-center" style={{paddingTop: "50px"}}>
                            <span className="col-lg-4 col-3"></span>
                            <span className="col-lg-3 col-6 answer-box-wrap">
                                <span className='answer-box' onClick={() => this.handleOnClick('about')}>
                                    ABOUT
                                </span>
                                <span className='answer-box' onClick={() => this.handleOnClick('start')}>
                                    PLAY NOW
                                </span>
                                <span className='answer-box' onClick={this.startPage}>
                                    INTRO
                                </span>
                            </span>
                            <span className="col-lg-4 col-3"></span>
                        </div>
                    </span>
                </Fade> */}
                <div className={this.state.isBlackBackgroundOn}/>
                <div className="">
                    <ReactPlayer
                        ref={this.ref}
                        url='audio/ENTROPY_INTRO_TRACK.mp3'
                        onProgress={this.handleProgress}
                        onEnded={this.handleAudioLoop}
                        playing={this.state.start}
                        width='100'
                        height='100'
                        config={{
                            file: {
                                forceAudio: true
                            }
                        }}
                    />
                    { /** loop video */
                        this.state.isIntroFinished &&
                        <div className='player-wrapper'>
                            <ReactPlayer
                                className='E-react-player react-player'
                                style={{ minHeight: '56.25vw' }}
                                url='https://vimeo.com/527694350'
                                playing={this.state.start}
                                muted={true}
                                controls={false}
                                loop={true}
                            />
                        </div>
                    }
                    { /** intro video */
                        !this.state.isButtonOn &&
                        <div className='player-wrapper'>
                            <ReactPlayer
                                className='E-react-player react-player'
                                style={{ 'min-height': '56.25vw' }}
                                url='https://vimeo.com/527694042'
                                playing={this.state.start}
                                muted={true}
                                controls={false}
                                loop={false}
                                onEnded={this.handleEnded}
                            />
                        </div>
                    }
                    {
                        this.state.isButtonOn &&
                        <span>
                            <Fade in={this.state.isButtonOn}>
                                <div className="row E-intro-screen">
                                    <span className="col-4"></span>
                                    <span className="col-4 answer-box-wrap">
                                        <span className='answer-box E-dark-theme' onClick={() => this.handleOnClick('about')}>
                                            ABOUT
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
            </span>
        )
    }
}
