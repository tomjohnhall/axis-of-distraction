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

// styles
import './App.css';
import flashing from './flashing.css'

//pose
import posed from 'react-pose';


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

class App extends Component {
  state = {
    data: [],
    tweets: [],
    songTime: 0,
    lineIndex: 0,
    solo: null,
    fadeOutSolo: false
  }

  componentDidMount() {
    this.getData()
    console.log(this.state.data)
  }

  renderPlayer = () => {
    return <AudioPlayer onListen={this.renderTweet} />
  }

  renderTweet = (time) => {
    const { data, lineIndex } = this.state
    !this.state.solo && time > 112 && this.doSolo(data)
    time > 128 && this.setState({ fadeOutSolo: true })
    const currentLine = data.find(line => line.index === lineIndex)
    if (currentLine && time > currentLine.audioTime) {
      this.setState(prevState => ({
        tweets: [...prevState.tweets, currentLine.el],
        lineIndex: prevState.lineIndex + 1
      }))
    }
  }

  doSolo(data) {
    const line = data.find(line => line.index === 999)
    this.setState(prevState => ({ tweets: prevState.tweets.slice(0, 3), solo: line.tweet }))
  }

  getData = () => {
    axios.get(
      process.env.API_URL
    ).then(response => {
      var { data } = response.data
      data.forEach((line, i) => {
        line.el = line.index < 4 ?
          <IntroTweet tweet={line.tweet} line={line.line} linkProps={linkProps} />
          :
          <Tweet tweet={line.tweet} line={line.line} linkProps={linkProps} />
      })
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
                    <ul style={solo ? styles.hide : styles.ul}>
                      {tweets.slice(0, 3)}
                    </ul>
                    <div style={styles.tweetContainer} >
                      {tweets.slice(3)}
                    </div>
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
    backgroundImage: `url(${require('./media/beach4.jpg')})`,
    backgroundSize: 'cover',
  },
  ul: {
    paddingLeft: '0px',
    width: '500px'
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
  fullScreen: { position: 'fixed', width: '100%', left: 0 }
}


export default App