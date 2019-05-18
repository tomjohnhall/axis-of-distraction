import React from 'react'

// media
import audioTrack from './media/axis-of-distraction.mp3'

import { PlayButton } from './PlayButton'

export class AudioPlayer extends React.Component {
  state = {
    playing: false,
    playTime: 0
  }

  componentDidMount() {
    this.playPause()
  }

  timeUpdate = () => {
    if (this.player.currentTime - this.state.playTime > 0.5) {
      this.props.onListen(this.player.currentTime)
      this.setState({ playTime: this.player.currentTime })
    }
  }

  playPause = () => {
    const { playing } = this.state
    console.log(this.rap)
    playing ? this.player.pause() : this.player.play()
    this.setState({ playing: !playing })
  }

  render() {
    return (
      <div>
        <audio src={audioTrack} volume={0} ref={ref => this.player = ref} onTimeUpdate={this.timeUpdate} />
        <PlayButton
          playing={this.state.playing}
          onClick={this.playPause}
        />
      </div >
    )
  }
}

