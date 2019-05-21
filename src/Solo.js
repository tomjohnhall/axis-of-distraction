import React, { Component } from 'react';
import ReactTweet from 'react-tweet';

import posed from 'react-pose';


const SoloBox = posed.div({
    fadeIn: {
        opacity: 1,
        scale: 0.5,
        transition: {
            duration: 1000
        }
    },
    big: {
        scale: 2,
        transition: {
            duration: 10000,
            delay: 500
        }
    },
    spin: {
        rotate: '1800deg',
        transition: {
            duration: 10000
        }
    },
    fadeOut: {
        opacity: 0,
        scale: 0.1,
        transition: {
            duration: 1000
        }
    }
})

export class Solo extends Component {
    state = {
        pose: 'fadeIn'
    }

    componentDidMount() {
        setTimeout(() => this.setState({ pose: 'big' }), 500)
        setTimeout(() => this.setState({ pose: 'spin' }), 5000)

    }

    render() {
        return (
            < div style={styles.wrapper} >
                <SoloBox style={styles.soloBox} pose={this.props.fadeOut ? 'fadeOut' : this.state.pose}>
                    <ReactTweet data={this.props.tweet} linkProps={this.props.linkProps} />
                </SoloBox>
            </div >
        )
    }
}

const styles = {
    wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        zIndex: '5'
    },

    soloBox: {
        opacity: 0,
        zIndex: '999',
        boxShadow: '7px 6px 45px -19px rgba(15,15,15,1)'
    }

}