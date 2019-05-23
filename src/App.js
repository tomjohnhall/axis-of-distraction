import React, { Component } from 'react';
import axios from 'axios'

import { Container, Row, Col } from 'react-bootstrap'

// components
import { AudioPlayer } from './AudioPlayer'
import { StartScreen } from './StartScreen'
import { Tweet } from './Tweet'
import { IntroTweet } from './IntroTweet'
import { Header } from './Header'
import { Solo } from './Solo'

// device
import { isMobile } from 'react-device-detect'

// styles
import './App.css';
import flashing from './flashing.css'

//pose
import posed, { PoseGroup } from 'react-pose';


const linkProps = { target: '_blank', rel: 'noreferrer' }

const Axis = posed.div({
  ending: {
    scale: 0.05,
    rotate: '720deg',
    width: '100%',
    height: '100%',
    transition: {
      duration: 50000
    }
  }
})

const MobileTweetContainer = posed.div({
  exit: {
    opacity: 0
  },
  enter: {
    opacity: 1
  }
})

const mobile = isMobile

class App extends Component {
  state = {
    data: [],
    tweets: [],
    songTime: 0,
    lineIndex: 0,
    solo: null,
    fadeOutSolo: false,
    audioTimes: [],
    mobileTweet: null
  }

  componentDidMount() {
    this.getData()
  }

  renderPlayer = () => {
    return <AudioPlayer onListen={this.renderTweet} />
  }

  renderTweet = (time) => {
    const { data, lineIndex, audioTimes } = this.state
    !this.state.solo && time > 112 && this.doSolo(data)
    time > 128 && this.setState({ fadeOutSolo: true })
    const line = data.find(l => l.index === lineIndex)
    if (line) {
      if (!audioTimes.includes(line.audioTime) && time > line.audioTime) {
        if (mobile) this.renderMobileTweet(line)
        else {
          const tweet = line.index < 4 ?
            <IntroTweet tweet={line.tweet} line={line.line} linkProps={linkProps} />
            :
            <Tweet tweet={line.tweet} line={line.line} linkProps={linkProps} isMobile={mobile} />
          return this.setState(prevState => ({
            tweets: [...prevState.tweets, tweet],
            lineIndex: prevState.lineIndex + 1,
            audioTimes: [...prevState.audioTimes, line.audioTime]
          }))
        }
      }
    }
    else { this.setState(prevState => ({ lineIndex: prevState.lineIndex + 1 })) }
  }

  renderMobileTweet = (line) => {
    const mobTweet = () => (
      <MobileTweetContainer style={{ maxHeight: '90%' }} key={line.index} >
        <IntroTweet tweet={line.tweet} line={line.line} linkProps={linkProps} />
      </MobileTweetContainer>
    )
    this.setState(prevState => ({
      mobileTweet: mobTweet(),
      lineIndex: prevState.lineIndex + 1,
      audioTimes: [...prevState.audioTimes, line.audioTime]
    }))
  }

  doSolo(data) {
    const line = data.find(line => line.index === 999)
    this.setState(prevState => ({ tweets: prevState.tweets.slice(0, 3), solo: line.tweet }))
  }

  getData = () => {
    axios.get(
      process.env.REACT_APP_API_URL
    ).then(response => {
      var { data } = response.data
      this.setState({ data })
    }).catch(error => {
      console.log(error)
    })
  }

  startSong = () => {
    this.setState({ started: true })
  }

  renderSolo() {
    return <Solo tweet={this.state.solo} linkProps={linkProps} fadeOut={this.state.fadeOutSolo} />
  }

  render() {
    const { started, data, tweets, solo, fadeOutSolo, lineIndex } = this.state
    return (
      <div className="App" style={flashing}>
        {lineIndex > 90 &&
          <div className="end">
          </div>}


        <Container fluid>
          <Row>
            <Col xs={12} md={{ span: 8, offset: 2 }} justifyContent='center'>
              <Header >
                {started && this.renderPlayer()}
              </Header>
              <Axis style={styles.fullScreen} pose={lineIndex > 90 && 'ending'}>
                <div
                  className={solo && "flashing-background"}
                  style={!solo || fadeOutSolo ? styles.background : null}
                >
                </div>
                {started ?
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {!mobile &&
                      <div>
                        <ul style={solo ? styles.hide : styles.ul}>
                          {tweets.slice(0, 3)}
                        </ul>
                        <div style={styles.tweetContainer} >
                          {tweets.slice(3)}
                        </div>
                      </div>
                    }
                    <PoseGroup>
                      {this.state.mobileTweet}
                    </PoseGroup>
                    {solo && this.renderSolo()}
                  </div>
                  :
                  <StartScreen loaded={data.length} onClick={this.startSong} />
                }
              </Axis>
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}

const styles = {
  background: {
    zIndex: '-2',
    position: 'fixed',
    height: '100vh',
    width: '100%',
    top: 0,
    left: 0,
    backgroundImage: 'url("https://s3.eu-west-2.amazonaws.com/tomjohnhall/beach4.jpg")',
    backgroundSize: 'cover',
  },
  ul: {
    paddingLeft: '0px',
    width: '500px',
  },
  tweetContainer: {
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: '0'
  },
  hide: {
    opacity: 0
  },
  fullScreen: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}


export default App