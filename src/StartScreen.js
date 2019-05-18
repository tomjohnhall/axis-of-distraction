import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import { MoonLoader } from 'react-spinners'

import { PlayButton } from './PlayButton'


export const StartScreen = ({ loaded, onClick }) => (
  <div style={styles.wrapper} >

    <Jumbotron style={styles.jumbo}>
      <p>
        <span style={styles.bluebg}>
          axis of distraction ___ (📱--👀 [[ 🧠 👨🏻‍💻 ]])
        </span>
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>

        {loaded ?
          <PlayButton playing={false} onClick={onClick} />
          :
          <MoonLoader css={styles.spinner}
            size={30} color={'#ffffff'} />
        }

      </div>
    </Jumbotron>

  </div >
)

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    zIndex: '0'
  },

  jumbo: {
    width: '100%',
    backgroundColor: 'rgba(243,243,243,0)',
    backgroundSize: 'cover',
    color: '#ffffff',
  },

  bluebg: {
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    fontSize: '25px',
    fontWeight: '800',
    backgroundColor: '#38A1F3',
    padding: '10px 30px 10px 5px',
    marginBottom: '50px'
  },

  title: {
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
    fontWeight: '800',
  },

  spinner: {
    margin: '0 auto',
  }
}
