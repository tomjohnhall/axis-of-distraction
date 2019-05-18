import React, { Component } from 'react';
import ReactTweet from 'react-tweet';

import posed from 'react-pose';

const TweetBox = posed.div({

  pre: {
    left: '0px'
  },
  post: {
    left: ({ dimensions: { x } }) => x,
    top: ({ dimensions: { y } }) => y,
    transition: { duration: 300 }
  },
  draggable: true,
  dragEnd: { transition: 'decay' }
})

export class Tweet extends Component {
  state = {
    dimensions: null
  }

  constructor(props) {
    super(props)
    this.tweetEl = React.createRef()
  }

  componentDidMount() {
    const { innerWidth: width, innerHeight: height } = window
    const { height: elHeight, width: elWidth } = this.tweetEl.current.getBoundingClientRect()

    this.setState({
      dimensions: {
        x: Math.floor(Math.random() * (width - elWidth) + 1),
        y: Math.floor(Math.random() * ((height - elHeight) - 70 + 1) + 70)
      }
    })
  }

  render() {
    const { tweet, line, linkProps } = this.props
    return (
      <TweetBox
        style={containerStyle}
        ref={this.tweetEl}
        dimensions={this.state.dimensions}
        pose={this.state.dimensions ? 'post' : 'pre'} >
        <ReactTweet
          data={tweet} bold={line} linkProps={linkProps} />
      </TweetBox >
    )
  }
}

const containerStyle = {
  width: '500px',
  position: 'absolute',
  boxShadow: '7px 6px 45px -19px rgba(15,15,15,1)'
}