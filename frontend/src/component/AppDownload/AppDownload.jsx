import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
function AppDownload() {
  return (
    <>
    <div className="app-download" id="app-download">
        <p>For Better Experienced Download App <br />
        From these platforms
        </p>
        <div className="app-download-platforms">
            <img src={assets.app_store} alt="appstore" />
            <img src={assets.play_store} alt="playstore" />
        </div>
    </div>
    </>
  )
}

export default AppDownload