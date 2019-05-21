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
        <audio preload={'true'} autoplay={'true'} src={audioTrack} volume={0} ref={ref => this.player = ref} onTimeUpdate={this.timeUpdate} />
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

