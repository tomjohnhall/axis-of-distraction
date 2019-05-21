import React from 'react'
import { FaSpotify, FaApple, FaInstagram, FaRegEnvelope, FaBandcamp } from 'react-icons/fa'

const ICON_SIZE = '1.6em'

const iconLinks = [
    { icon: <FaSpotify size={ICON_SIZE} />, url: 'https://open.spotify.com/artist/5S2nzwPKaPU3lt7zYi3jF2' },
    { icon: <FaInstagram size={ICON_SIZE} />, url: 'https://instagram.com/tomjohnhall' },
    { icon: <FaBandcamp size={ICON_SIZE} />, url: 'https://tomjohnhall.bandcamp.com', noMobile: true },
    { icon: <FaApple size={ICON_SIZE} />, url: 'https://itunes.apple.com/us/artist/tom-john-hall/1129531821', noMobile: true },
    { icon: <FaRegEnvelope size={ICON_SIZE} />, url: 'mailto:thomasjohnhall@gmail.com', xlOnly: true }
]

export const Social = () => (


    iconLinks.map((link, i) => {
        return (
            <span className={`mx-1 ${link.noMobile && "no-mobile"} ${link.xlOnly && "xl-only"} `} id={i}>
                <a href={link.url} style={{ color: 'white' }}>
                    <span>{link.icon}</span>
                </a>
            </span>
        )
    })


)