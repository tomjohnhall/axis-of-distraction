import React from 'react'

import { PlayButton } from './PlayButton'
import { Spinner } from 'react-bootstrap'

export class AudioPlayer extends React.Component {
  state = {
    playing: false,
    playTime: 0,
    loaded: false
  }

  timeUpdate = () => {
    !this.state.loaded && this.setState({ loaded: true, playing: true })
    if (this.player.currentTime - this.state.playTime > 0.5) {
      this.props.onListen(this.player.currentTime)
      this.setState({ playTime: this.player.currentTime })
    }
  }

  playPause = () => {
    const { playing } = this.state
    playing ? this.player.pause() : this.player.play()
    this.setState({ playing: !playing })
  }


  render() {
    return (
      <div>
        <audio preload={'true'} autoplay={'true'} src={'https://s3.eu-west-2.amazonaws.com/tomjohnhall/axis-of-distraction-lo.mp3'} volume={0} ref={ref => this.player = ref} onTimeUpdate={this.timeUpdate} />
        {this.state.loaded ?
          <PlayButton
            playing={this.state.playing}
            onClick={this.playPause}
          />
          :
          <Spinner animation="border" role="status" style={{ color: '#ffffff' }}>
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
      </div >
    )
  }
}

