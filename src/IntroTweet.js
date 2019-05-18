import React from 'react'
import Tweet from 'react-tweet'

export const IntroTweet = ({ tweet, line, linkProps }) => (
    <Tweet
        data={tweet} bold={line} linkProps={linkProps} />
)