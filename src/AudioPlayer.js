import React from 'react'

// media
import audioTrack from './media/axis-of-distraction.mp3'

import { PlayButton } from './PlayButton'
import { MoonLoader } from 'react-spinners'

export class AudioPlayer extends React.Component {
  state = {
    playing: false,
    playTime: 0,
    loaded: false
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
    playing ? this.player.pause() : this.player.play()
    this.setState({ playing: !playing })
  }

  onLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    return (
      <div>
        <audio src={audioTrack} volume={0} ref={ref => this.player = ref} onTimeUpdate={this.timeUpdate} onLoadedData={this.onLoaded} />
        {this.state.loaded ?
          <PlayButton
            playing={this.state.playing}
            onClick={this.playPause}
          />
          :
          <MoonLoader css={{ margin: '0 auto' }}
            size={30} color={'#ffffff'} />
        }
      </div >
    )
  }
}

