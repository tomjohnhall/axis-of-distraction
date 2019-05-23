import React from 'react'
import { Button } from 'react-bootstrap'
const playImage = 'https://s3.eu-west-2.amazonaws.com/tomjohnhall/play.svg'
const pauseImage = 'https://s3.eu-west-2.amazonaws.com/tomjohnhall/pause.svg'

export const PlayButton = ({ playing, onClick }) => (
    <Button style={style.button}>
        <img
            src={playing ? pauseImage : playImage}
            onClick={onClick}
            style={playing ? style.pause : style.play}
            alt="play pause control"
        />
    </Button>
)

const style = {
    button: {
        backgroundColor: 'rgba(243,243,243,0.4)',
        height: '50px',
        borderRadius: '50px',
        border: '2px solid #38A1F3',
        padding: '10px',
    },
    play: {
        height: '100%',
        position: 'relative',
        left: '2px',
    },
    pause: {
        height: '100%'
    }
}